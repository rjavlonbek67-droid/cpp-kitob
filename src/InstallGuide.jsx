import { useEffect, useState } from "react";

export default function InstallGuide({ open, onClose }) {
  const [deferred, setDeferred] = useState(null);

  useEffect(() => {
    function onPrompt(event) {
      event.preventDefault();
      setDeferred(event);
    }
    function onInstalled() {
      setDeferred(null);
      onClose();
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [onClose]);

  async function install() {
    if (!deferred) return;
    deferred.prompt();
    try {
      const choice = await deferred.userChoice;
      if (choice?.outcome === "accepted") onClose();
    } catch {
      /* Brauzer oynani o'zi yopgan bo'lishi mumkin. */
    }
    setDeferred(null);
  }

  if (!open) return null;

  return (
    <section className="install-card" aria-label="Telefonga o'rnatish">
      <div className="install-head">
        <h2>Telefonga o'rnatish</h2>
        <button type="button" className="install-quiet" onClick={onClose}>
          Yopish
        </button>
      </div>
      <p>
        Yorliq yaratish kitobni bosh ekranga qo'yadi. Bir marta ochilgach, darslar internetsiz ham ochiladi.
      </p>
      {deferred ? (
        <div className="install-actions">
          <button type="button" className="install-primary" onClick={install}>
            O'rnatish
          </button>
        </div>
      ) : null}
      <h3>Android (Chrome, Redmi, Pixel)</h3>
      <ol>
        <li>Chrome menyusidagi uch nuqtani bosing.</li>
        <li>
          «Ilovani o'rnatish», «Add to Home screen» yoki «Bosh ekranga qo'shish» chiqsa, shuni tanlang.
        </li>
        <li>Agar shu sahifada yashil O'rnatish tugmasi chiqsa, menyuga kirmasdan shuni bosing.</li>
      </ol>
      <h3>iPhone (Safari)</h3>
      <ol>
        <li>Safari pastidagi Ulashish tugmasini bosing. Bu kvadrat va yuqoriga strelka.</li>
        <li>«Bosh ekranga qo'shish» yoki «Add to Home Screen» ni tanlang.</li>
        <li>Yuqori o'ngdagi Qo'shish ni tasdiqlang. Yorliq bosh ekranda «C++ Kitob» nomi bilan chiqadi.</li>
      </ol>
    </section>
  );
}
