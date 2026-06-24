import { useState, useEffect } from "react";

const COOKIE_KEY = "cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gold/30 shadow-lg px-6 py-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="font-body text-xs text-charcoal/70 leading-relaxed flex-1">
          Мы используем файлы cookie для корректной работы сайта, анализа посещаемости и улучшения вашего опыта.
          Продолжая использовать сайт, вы соглашаетесь с нашей{" "}
          <span className="text-gold underline cursor-pointer">политикой конфиденциальности</span>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="font-body text-xs text-charcoal/50 border border-charcoal/20 px-4 py-2 hover:border-charcoal/40 transition-colors"
          >
            Отклонить
          </button>
          <button
            onClick={accept}
            className="font-body text-xs bg-gold text-white px-6 py-2 hover:bg-gold-dark transition-colors tracking-wider uppercase"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
