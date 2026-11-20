import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { book, findLesson, lessonNeighbors } from "./data/book.js";
import MiniMuhit from "./MiniMuhit.jsx";
import InstallGuide from "./InstallGuide.jsx";

const KEYWORDS = new Set(
  `alignas alignof and and_eq asm auto bitand bitor bool break case catch char char8_t char16_t char32_t class compl concept const consteval constexpr constinit const_cast continue co_await co_return co_yield decltype default delete do double dynamic_cast else enum explicit export extern false float for friend goto if inline int long mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq`.split(
    /\s+/
  )
);

const LIB = new Set(["std", "cout", "cin", "endl", "string", "stoi", "main"]);

function highlight(code) {
  const nodes = [];
  let i = 0;
  let key = 0;
  let plain = "";

  const flush = () => {
    if (!plain) return;
    nodes.push(<span key={key++}>{plain}</span>);
    plain = "";
  };

  const push = (className, text) => {
    flush();
    nodes.push(
      <span key={key++} className={className}>
        {text}
      </span>
    );
  };

  while (i < code.length) {
    if (code.startsWith("/*", i)) {
      const end = code.indexOf("*/", i + 2);
      const stop = end === -1 ? code.length : end + 2;
      push("tok-cmt", code.slice(i, stop));
      i = stop;
      continue;
    }
    if (code.startsWith("//", i)) {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? code.length : end;
      push("tok-cmt", code.slice(i, stop));
      i = stop;
      continue;
    }
    const ch = code[i];
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== ch && code[j] !== "\n") {
        if (code[j] === "\\") j += 1;
        j += 1;
      }
      if (code[j] === ch) j += 1;
      push("tok-str", code.slice(i, j));
      i = j;
      continue;
    }
    if (ch === "#" && (i === 0 || code[i - 1] === "\n")) {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? code.length : end;
      push("tok-pre", code.slice(i, stop));
      i = stop;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[A-Za-z0-9_]/.test(code[j])) j += 1;
      const word = code.slice(i, j);
      const className = KEYWORDS.has(word) ? "tok-key" : LIB.has(word) ? "tok-lib" : "";
      if (className) push(className, word);
      else plain += word;
      i = j;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[0-9]/.test(code[j])) j += 1;
      push("tok-num", code.slice(i, j));
      i = j;
      continue;
    }
    plain += ch;
    i += 1;
  }
  flush();
  return nodes;
}

function RichText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    return <span key={index}>{part}</span>;
  });
}

function Paragraphs({ value }) {
  const list = Array.isArray(value) ? value : value ? [value] : [];
  return list.map((paragraph, index) => (
    <p key={index}>
      <RichText text={paragraph} />
    </p>
  ));
}

function DataTable({ table }) {
  if (!table) return null;
  return (
    <div className="table-wrap">
      {table.caption ? <p className="table-caption">{table.caption}</p> : null}
      <table>
        <thead>
          <tr>
            {table.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeBlock({ name, code, onTry }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="code-block">
      <figcaption>
        <span>{name || "C++"}</span>
        <span className="code-actions">
          <button type="button" onClick={() => onTry(code, name || "main.cpp")}>
            Muharrirda sinab ko'rish
          </button>
          <button type="button" onClick={copy}>
            {copied ? "Nusxa olindi" : "Nusxa olish"}
          </button>
        </span>
      </figcaption>
      <pre>
        <code>{highlight(code)}</code>
      </pre>
    </figure>
  );
}

function ConsoleBlock({ title, text }) {
  if (!text) return null;
  return (
    <figure className="console-block">
      <figcaption>{title || "Konsol"}</figcaption>
      <pre>{text}</pre>
    </figure>
  );
}

function Quiz({ questions }) {
  const [picked, setPicked] = useState({});
  const [revealed, setRevealed] = useState({});

  return (
    <ol className="quiz-list">
      {questions.map((question, index) => {
        const choice = picked[question.id];
        const show = choice !== undefined || revealed[question.id];
        return (
          <li key={question.id} className="quiz-card">
            <p className="quiz-q">
              <span>{index + 1}.</span> <RichText text={question.question} />
            </p>
            <div className="quiz-options">
              {question.options.map((option, optionIndex) => {
                let state = "";
                if (show && optionIndex === question.answer) state = "correct";
                else if (show && optionIndex === choice) state = "wrong";
                return (
                  <button
                    key={optionIndex}
                    type="button"
                    className={state}
                    disabled={show}
                    onClick={() =>
                      setPicked((current) => ({ ...current, [question.id]: optionIndex }))
                    }
                  >
                    <em>{String.fromCharCode(65 + optionIndex)}</em>
                    <RichText text={option} />
                  </button>
                );
              })}
            </div>
            {show ? (
              <div className="explain">
                <p>
                  <strong>Javob: {String.fromCharCode(65 + question.answer)}.</strong>{" "}
                  <RichText text={question.explanation} />
                </p>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => {
                    setPicked((current) => {
                      const next = { ...current };
                      delete next[question.id];
                      return next;
                    });
                    setRevealed((current) => {
                      const next = { ...current };
                      delete next[question.id];
                      return next;
                    });
                  }}
                >
                  Qayta urinish
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="text-btn"
                onClick={() => setRevealed((current) => ({ ...current, [question.id]: true }))}
              >
                Javobni ko'rish
              </button>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function LessonView({ chapter, lesson, onTry }) {
  const neighbors = lessonNeighbors(lesson.id);

  return (
    <article>
      <header className="lesson-head">
        <p className="kicker">
          {chapter.number}-bob · {lesson.id}
        </p>
        <h2>{lesson.title}</h2>
        <Paragraphs value={lesson.goal} />
      </header>

      <section className="card analogy">
        <h3>{lesson.analogy.title}</h3>
        <Paragraphs value={lesson.analogy.paragraphs} />
      </section>

      <section className="card rules">
        <h3>{lesson.rules.title}</h3>
        <Paragraphs value={lesson.rules.paragraphs} />
        {lesson.rules.items?.map((item) => (
          <div key={item.title} className="rule">
            <h4>{item.title}</h4>
            <Paragraphs value={item.paragraphs} />
            {item.code ? <CodeBlock name={item.codeLabel} code={item.code} onTry={onTry} /> : null}
            <DataTable table={item.table} />
          </div>
        ))}
      </section>

      <section className="examples">
        <h3>Kod misollari</h3>
        {lesson.examples.map((example, index) => (
          <article key={example.title} className="card example">
            <h4>
              {index + 1}. {example.title}
            </h4>
            <Paragraphs value={example.intro} />
            {example.files ? (
              example.files.map((file) => (
                <CodeBlock key={file.name} name={file.name} code={file.code} onTry={onTry} />
              ))
            ) : (
              <CodeBlock name={example.codeLabel || "main.cpp"} code={example.code} onTry={onTry} />
            )}
            {example.commands ? <ConsoleBlock title="Buyruq" text={example.commands} /> : null}
            <ConsoleBlock title={example.consoleTitle} text={example.console} />
            <div className="analysis">
              <h5>Qatorma-qator tahlil</h5>
              <ol>
                {example.analysis.map((row, rowIndex) => (
                  <li key={rowIndex}>
                    <span className="ln">
                      {row.lines ? `Qator ${row.lines}` : "Natija"}
                      {row.label ? ` · ${row.label}` : ""}
                    </span>
                    <RichText text={row.text} />
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </section>

      <section className="card memory">
        <h3>{lesson.memory.title}</h3>
        <Paragraphs value={lesson.memory.paragraphs} />
        {lesson.memory.diagram ? <pre className="diagram">{lesson.memory.diagram}</pre> : null}
      </section>

      <section className="card mistakes">
        <h3>{lesson.mistakes.title}</h3>
        <Paragraphs value={lesson.mistakes.intro} />
        {lesson.mistakes.items.map((item) => (
          <div key={item.title} className="mistake">
            <h4>{item.title}</h4>
            <Paragraphs value={item.why} />
            {item.wrong ? <CodeBlock name={item.wrongLabel || "Xato"} code={item.wrong} onTry={onTry} /> : null}
            {item.right ? <CodeBlock name={item.rightLabel || "To'g'ri"} code={item.right} onTry={onTry} /> : null}
          </div>
        ))}
      </section>

      <section className="card quiz">
        <h3>Mini-test</h3>
        <p className="quiz-lead">Variantni bosing yoki javobni oching. Har bir savolning tushuntirishi javob bilan birga chiqadi.</p>
        <Quiz key={lesson.id} questions={lesson.quiz} />
      </section>

      <nav className="pager" aria-label="Darslar o'rtasida o'tish">
        {neighbors.prev ? (
          <a href={`#${neighbors.prev.lesson.id}`}>
            <small>Oldingi</small>
            {neighbors.prev.lesson.id} {neighbors.prev.lesson.navTitle}
          </a>
        ) : (
          <span />
        )}
        {neighbors.next ? (
          <a className="next" href={`#${neighbors.next.lesson.id}`}>
            <small>Keyingi</small>
            {neighbors.next.lesson.id} {neighbors.next.lesson.navTitle}
          </a>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

export default function App() {
  const firstId = book.chapters[0].lessons[0].id;
  const [lessonId, setLessonId] = useState(firstId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [muhit, setMuhit] = useState(null);
  const [standalone] = useState(
    () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true
  );
  const [installOpen, setInstallOpen] = useState(() => {
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      return false;
    }
    return window.localStorage.getItem("cpp-kitob-install-hidden") !== "1";
  });
  const scroller = useRef(null);
  const loadToken = useRef(0);

  const hideInstall = useCallback(() => {
    window.localStorage.setItem("cpp-kitob-install-hidden", "1");
    setInstallOpen(false);
  }, []);

  function openMuhit(code, name) {
    loadToken.current += 1;
    setMuhit({
      name,
      original: code,
      loadToken: loadToken.current,
      collapsed: false,
    });
  }

  useEffect(() => {
    function sync() {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      const found = findLesson(id);
      if (found) {
        setLessonId(found.lesson.id);
        return;
      }
      setLessonId(firstId);
      window.history.replaceState(null, "", `#${firstId}`);
    }
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [firstId]);

  useEffect(() => {
    scroller.current?.scrollTo(0, 0);
  }, [lessonId]);

  const current = useMemo(() => findLesson(lessonId), [lessonId]);

  useEffect(() => {
    if (!current) return;
    document.title = `${current.lesson.id} ${current.lesson.navTitle} — C++ kitob`;
  }, [current]);

  if (!current) return null;
  const index = current.chapter.lessons.findIndex((item) => item.id === lessonId);

  return (
    <div className="app">
      <aside className={menuOpen ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <p className="brand-kicker">Boshlang'ich kurs</p>
          <p className="brand-title">{book.title}</p>
        </div>
        {book.chapters.map((chapter) => (
          <nav key={chapter.id} aria-label={`${chapter.number}-bob darslari`}>
            <p className="chapter-label">{chapter.number}-bob</p>
            <p className="chapter-title">{chapter.title}</p>
            <ol>
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <a
                    href={`#${lesson.id}`}
                    aria-current={lesson.id === lessonId ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{lesson.id}</span>
                    {lesson.navTitle}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ))}
      </aside>
      {menuOpen ? (
        <button className="backdrop" type="button" aria-label="Menyuni yopish" onClick={() => setMenuOpen(false)} />
      ) : null}
      <div className="workspace">
        <div className="main" ref={scroller}>
          <div className="topbar">
            <button type="button" className="menu-btn" onClick={() => setMenuOpen((value) => !value)}>
              Darslar
            </button>
            <p>
              {current.chapter.title} · {index + 1} / {current.chapter.lessons.length}
            </p>
            {!standalone && !installOpen ? (
              <button type="button" className="yorliq-btn" onClick={() => setInstallOpen(true)}>
                Yorliq yaratish
              </button>
            ) : null}
          </div>
          <InstallGuide open={installOpen && !standalone} onClose={hideInstall} />
          <LessonView chapter={current.chapter} lesson={current.lesson} onTry={openMuhit} />
        </div>
        {muhit ? (
          <MiniMuhit
            key={muhit.loadToken}
            name={muhit.name}
            original={muhit.original}
            collapsed={muhit.collapsed}
            onToggle={() => setMuhit((current) => ({ ...current, collapsed: !current.collapsed }))}
            onClose={() => setMuhit(null)}
          />
        ) : null}
      </div>
    </div>
  );
}
