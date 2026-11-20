import { useEffect, useRef, useState } from "react";
import JSCPP from "JSCPP";

const MESSAGES = {
  empty: "Muharrir bo'sh. Avval kod yozing yoki asl misolga qayting.",
  running: "Ishga tushirilmoqda...",
  idle: "Hali natija yo'q. Ishga tushirish tugmasini bosing.",
  timeout:
    "Dastur vaqtida tugamadi. Cheksiz sikl bo'lishi mumkin. Agar cin kutayotgan bo'lsa, Kirish maydoniga qiymat yozing.",
  syntax:
    "Kod yig'ilmadi. Nuqta-vergul, qavs va qatorni tekshiring. Klass, shablon, <vector> va boshqa C++17/20 yozuvlari bu mini muhitda ishlamasligi mumkin. Ularni g++ da sinang.",
  stopped:
    "Dastur mini muhitda to'xtadi. Oddiy cout dasturlari shu yerda ishlaydi. <vector>, <algorithm>, aqlli ko'rsatkich va boshqa C++17/20 kodini g++ da sinang.",
  quiet: "Dastur tugadi. Konsolga chiqish yo'q.",
  missing:
    "Mini muhitdagi C++ ishga tushirgichi ochilmadi. Oddiy misolni qayta urinib ko'ring yoki kodni g++ da sinang.",
};

const SUPPORTED_HEADERS = new Set([
  "iostream",
  "cctype",
  "cstring",
  "cmath",
  "cstdio",
  "cstdlib",
  "ctime",
  "iomanip",
  "ctype.h",
  "string.h",
  "math.h",
  "stdio.h",
  "stdlib.h",
  "time.h",
]);

const HEADER = /#\s*include\s*([<"])([^>"]+)[>"]/g;
const OUTPUT_LIMIT = 20000;

function runner() {
  if (typeof JSCPP?.run === "function") return JSCPP;
  if (typeof JSCPP?.default?.run === "function") return JSCPP.default;
  return null;
}

function adapt(code) {
  return code.replace(/\bstd::(cout|cin|endl|setw|setprecision|setfill|fixed)\b/g, "$1");
}

function includedHeaders(code) {
  const names = [];
  for (const match of code.matchAll(HEADER)) {
    const name = match[2].trim();
    if (name && !SUPPORTED_HEADERS.has(name) && !names.includes(name)) names.push(name);
  }
  return names;
}

function headerMessage(names) {
  const list = names.map((name) => `<${name}>`).join(", ");
  return `${list} mini muhitda yo'q. Bu yerda oddiy C++ ishlaydi: iostream, cmath, cstdio, cstdlib, cstring, cctype, ctime va iomanip. <vector>, <algorithm>, aqlli ko'rsatkich va boshqa C++17/20 kodini g++ da sinang.`;
}

function friendly(error) {
  const raw = String(error?.message || error || "");
  if (/Time limit exceeded/i.test(raw)) return MESSAGES.timeout;
  const missing = raw.match(/cannot find (?:library|file):\s*(\S+)/i);
  if (missing) return headerMessage([missing[1]]);
  if (/Parsing Failure/i.test(raw)) return MESSAGES.syntax;
  return MESSAGES.stopped;
}

function executeLocal(code, stdin) {
  const headers = includedHeaders(code);
  if (headers.length) return headerMessage(headers);

  const engine = runner();
  if (!engine) return MESSAGES.missing;

  let output = "";
  let truncated = false;
  let exitCode;
  try {
    exitCode = engine.run(adapt(code), stdin ?? "", {
      stdio: {
        write(chunk) {
          if (output.length >= OUTPUT_LIMIT) {
            truncated = true;
            return;
          }
          output += chunk == null ? "" : String(chunk);
          if (output.length > OUTPUT_LIMIT) {
            output = output.slice(0, OUTPUT_LIMIT);
            truncated = true;
          }
        },
      },
      maxTimeout: 1000,
      unsigned_overflow: "ignore",
    });
  } catch (error) {
    return friendly(error);
  }

  const parts = [];
  const text = output.replace(/\n+$/, "");
  if (text) parts.push(text);
  if (truncated) parts.push("Chiqish juda uzun, qolgani yashirildi.");
  if (typeof exitCode === "number" && exitCode !== 0) parts.push(`Chiqish kodi: ${exitCode}`);
  if (!parts.length) return MESSAGES.quiet;
  return parts.join("\n");
}

function Editor({ code, onChange, areaRef }) {
  const linesRef = useRef(null);
  const lines = code.split("\n");

  function onScroll(event) {
    if (linesRef.current) linesRef.current.scrollTop = event.target.scrollTop;
  }

  function onKeyDown(event) {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const el = event.target;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = `${code.slice(0, start)}  ${code.slice(end)}`;
    onChange(next);
    window.requestAnimationFrame(() => {
      el.selectionStart = start + 2;
      el.selectionEnd = start + 2;
    });
  }

  return (
    <div className="editor">
      <div className="editor-lines" ref={linesRef} aria-hidden="true">
        {lines.map((_, index) => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
      <textarea
        ref={areaRef}
        value={code}
        spellCheck={false}
        wrap="off"
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="C++ kodi"
        onChange={(event) => onChange(event.target.value)}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default function MiniMuhit({ name, original, collapsed, onToggle, onClose }) {
  const [code, setCode] = useState(original);
  const [stdin, setStdin] = useState("");
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [consoleText, setConsoleText] = useState("");
  const areaRef = useRef(null);
  const runId = useRef(0);

  useEffect(() => {
    if (!collapsed) areaRef.current?.focus();
  }, [collapsed]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  async function run() {
    if (!code.trim()) {
      setConsoleText(MESSAGES.empty);
      return;
    }
    const id = runId.current + 1;
    runId.current = id;
    setRunning(true);
    setConsoleText(MESSAGES.running);
    await new Promise((resolve) => window.setTimeout(resolve, 0));
    if (runId.current !== id) return;
    let text = MESSAGES.stopped;
    try {
      text = executeLocal(code, stdin);
    } catch {
      text = MESSAGES.stopped;
    }
    if (runId.current !== id) return;
    setConsoleText(text);
    setRunning(false);
  }

  return (
    <section className={collapsed ? "muhit collapsed" : "muhit"} aria-label="Mini C++ Muhiti">
      <header className="muhit-bar">
        <p>
          <strong>Mini C++ Muhiti</strong>
          <span>{name}</span>
        </p>
        <div className="muhit-actions">
          {collapsed ? null : (
            <>
              <button type="button" onClick={() => setCode(original)} disabled={code === original}>
                Asl misolga qaytish
              </button>
              <button type="button" onClick={copy}>
                {copied ? "Nusxa olindi" : "Nusxa olish"}
              </button>
            </>
          )}
          <button type="button" aria-expanded={!collapsed} onClick={onToggle}>
            {collapsed ? "Yoyish" : "Yig'ish"}
          </button>
          <button type="button" onClick={onClose}>
            Yopish
          </button>
        </div>
      </header>
      {collapsed ? null : (
        <>
          <Editor code={code} onChange={setCode} areaRef={areaRef} />
          <div className="muhit-run">
            <button type="button" className="run-btn" onClick={run} disabled={running}>
              {running ? "Ishga tushirilmoqda..." : "Ishga tushirish"}
            </button>
            <label>
              Kirish
              <textarea
                value={stdin}
                rows={2}
                spellCheck={false}
                placeholder="Agar cin ishlatsa, qiymatni shu yerga yozing"
                onChange={(event) => setStdin(event.target.value)}
              />
            </label>
          </div>
          <div className="muhit-console">
            <div className="muhit-console-head">
              <span>Konsol natijasi</span>
              <button type="button" onClick={() => setConsoleText("")} disabled={running || !consoleText}>
                Tozalash
              </button>
            </div>
            <pre>{consoleText || MESSAGES.idle}</pre>
          </div>
        </>
      )}
    </section>
  );
}
