import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/18bb0f6d-8a2e-4a00-8ba7-6412e5b7c649.png";
const HANDSHAKE_IMG = "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/6fe6b583-0e54-4a9e-95f0-bfaa4ead9c1e.png";
const TROPHIES_IMG = "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/files/45ca7696-ba65-4a0e-89a8-e56b104b7e3d.jpg";

const DECO_CHAMPAGNE = "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/files/18b2e6d3-8c04-4d25-8812-ba91f5769351.jpg";
const DECO_BUBBLES = "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/files/5c3e6eee-d5bf-44bc-9c6f-b33cbef5b3a9.jpg";

const nominations = [
  { num: "01", icon: "Heart", title: "Бизнес с душой: социальное влияние", desc: "Для социальных предпринимателей, ИП, самозанятых — предпринимателей, которые занимаются социально значимым бизнесом, ведут дело с пользой для людей, города и общества." },
  { num: "02", icon: "Rocket", title: "Прорывной старт: открытие года 2025", desc: "Для новых бизнесов, которые быстро привлекли внимание и уже хорошо заявили о себе в 2025 году." },
  { num: "03", icon: "TrendingUp", title: "Квантовый скачок: прорыв года 2025", desc: "Для тех, чей бизнес уже работает, но в 2025 году сделал заметный рывок вперёд и показал сильный рост." },
  { num: "04", icon: "Lightbulb", title: "Креативный код: бизнес вне шаблонов", desc: "Для предпринимателей, экспертов, ИП, самозанятых, у которых бизнес не как у всех — а с идеей и креативом." },
  { num: "05", icon: "Sparkles", title: "Женщины, создающие будущее", desc: "Для женщин-предпринимательниц, которые строят успешный бизнес, развиваются сами и вдохновляют других." },
  { num: "06", icon: "Target", title: "Сила стратегии: мужской подход к делу", desc: "Для мужчин-предпринимателей, которые умеют грамотно управлять бизнесом и добиваться результатов." },
  { num: "07", icon: "MapPin", title: "Лидер туристического направления", desc: "Для тех, кто работает в туризме, сфере отдыха и гостеприимства: помогает людям путешествовать, хорошо отдыхать и привлекает гостей в регион." },
  { num: "08", icon: "Home", title: "Семейный бизнес", desc: "Для семейного бизнеса, которым управляют муж и жена или другие родственники, или который продолжают из поколения в поколение." },
  { num: "09", icon: "GraduationCap", title: "Эксперт года 2025", desc: "Для ИП, самозанятых, тренеров, коучей и других специалистов, которых ценят за опыт, знания и профессионализм." },
  { num: "10", icon: "Building2", title: "Вклад в будущее Находки: партнер года 2025", desc: "Для предпринимателей, которые помогают развитию Находки: участвуют в благотворительности, партнёрских проектах и поддерживают общественные инициативы города." },
];

const criteria = [
  { icon: "Star", label: "Сила бренда" },
  { icon: "Shield", label: "Репутация" },
  { icon: "MapPin", label: "Вклад в Находку" },
  { icon: "Heart", label: "Социальная активность" },
  { icon: "Eye", label: "Визуальный стиль" },
  { icon: "Megaphone", label: "Продвижение" },
  { icon: "Handshake", label: "Коллаборации" },
  { icon: "FileText", label: "Убедительность заявки" },
];

const audience = [
  "Малый и средний бизнес",
  "Самозанятые",
  "Эксперты",
  "Семейные бизнесы",
  "Социальные проекты",
  "Креативные индустрии",
  "Молодые предприниматели",
  "Женщины-предприниматели",
  "Производители",
  "Туристический бизнес",
];

const juryPlaceholders = [
  { name: "Иванова Анна Сергеевна", role: "Председатель ТПП г. Находка, эксперт регионального развития" },
  { name: "Петров Михаил Владимирович", role: "Серийный предприниматель, основатель 5 компаний" },
  { name: "Соколова Елена Игоревна", role: "Директор Агентства развития Приморского края" },
  { name: "Кузнецов Андрей Борисович", role: "Вице-президент ТПП Приморья" },
  { name: "Морозова Татьяна Алексеевна", role: "Руководитель центра поддержки предпринимательства" },
];

const nominantsPlaceholders = [
  { name: "Александра Белова", role: "Основатель «Белый свет»" },
  { name: "Дмитрий Захаров", role: "CEO «ПортЛогистик»" },
  { name: "Марина Сотникова", role: "Владелец сети «Вкус Востока»" },
  { name: "Игорь Трофимов", role: "Основатель IT-студии «Код Приморья»" },
  { name: "Юлия Орлова", role: "Организатор ивентов «Праздник ДВ»" },
  { name: "Виктор Лебедев", role: "Директор турагентства «Находка Тур»" },
  { name: "Светлана Фролова", role: "Создатель бренда «Сила»" },
  { name: "Роман Баринов", role: "Основатель «ЭкоФерма Приморье»" },
];

const programItems = [
  { time: "17:30", emoji: "🫧", title: "Зона приветствия", desc: "Регистрация гостей, фуршет, живая музыка" },
  { time: "18:00", emoji: "🎙️", title: "Торжественное открытие", desc: "Приветственное слово организаторов и партнеров" },
  { time: "19:00", emoji: "🏆", title: "Церемония награждения", desc: "Вручение наград во всех номинациях" },
  { time: "21:00", emoji: "🎭", title: "Шоу-программа", desc: "Выступления артистов, розыгрыши призов" },
  { time: "22:00", emoji: "🥂", title: "Нетворкинг-сессия", desc: "Деловые знакомства, банкет, фотозона" },
  { time: "24:00", emoji: "✨", title: "Завершение вечера", desc: "Финальные аккорды незабываемого праздника" },
];

const navLinks = [
  { label: "О премии", href: "#about" },
  { label: "Номинации", href: "#nominations" },
  { label: "Программа", href: "#program" },
  { label: "Жюри", href: "#jury" },
  { label: "Партнёры", href: "#partners" },
  { label: "Контакты", href: "#contacts" },
];

const tickerText = "✦ Первая ежегодная бизнес-премия Я Бренд ДВ · Находка · 11 июля 2026 · ГЕОКУПОЛ «ЛУ'НА» ";

const NOMINATIONS_LIST = [
  "Бизнес с душой: социальное влияние",
  "Прорывной старт: открытие года 2025",
  "Квантовый скачок: прорыв года 2025",
  "Креативный код: бизнес вне шаблонов",
  "Женщины, создающие будущее",
  "Сила стратегии: мужской подход к делу",
  "Лидер туристического направления",
  "Семейный бизнес",
  "Эксперт года 2025",
  "Вклад в будущее Находки: партнер года 2025",
];

function ApplicationForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", nomination: "", about: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("https://functions.poehali.dev/0c56ca0a-b4f4-4683-80ce-08dbce98f0b3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Ошибка отправки"); setStatus("error"); return; }
      setStatus("success");
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз."); setStatus("error");
    }
  };

  const inputCls = "w-full border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal placeholder-charcoal/35 focus:outline-none focus:border-gold transition-colors duration-200 bg-white";

  if (status === "success") return (
    <div className="border border-gold/30 p-12 text-center">
      <div className="w-14 h-14 border border-gold flex items-center justify-center mx-auto mb-6">
        <Icon name="Check" size={24} className="text-gold" />
      </div>
      <h3 className="font-display text-2xl font-light text-charcoal mb-3">Заявка отправлена!</h3>
      <p className="font-body text-sm text-charcoal/60">Мы свяжемся с вами в течение 24 часов</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="border border-gold/20 p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="font-body text-xs tracking-widest uppercase text-charcoal/50 mb-2 block">Имя и фамилия *</label>
          <input value={form.name} onChange={set("name")} placeholder="Иванова Анна" className={inputCls} required />
        </div>
        <div>
          <label className="font-body text-xs tracking-widest uppercase text-charcoal/50 mb-2 block">Телефон *</label>
          <input value={form.phone} onChange={set("phone")} placeholder="+7 900 000 00 00" className={inputCls} required />
        </div>
        <div>
          <label className="font-body text-xs tracking-widest uppercase text-charcoal/50 mb-2 block">Email *</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="email@example.com" className={inputCls} required />
        </div>
        <div>
          <label className="font-body text-xs tracking-widest uppercase text-charcoal/50 mb-2 block">Компания / Бренд</label>
          <input value={form.company} onChange={set("company")} placeholder="Название вашего бизнеса" className={inputCls} />
        </div>
      </div>
      <div className="mb-5">
        <label className="font-body text-xs tracking-widest uppercase text-charcoal/50 mb-2 block">Номинация</label>
        <select value={form.nomination} onChange={set("nomination")} className={inputCls}>
          <option value="">Выберите номинацию</option>
          {NOMINATIONS_LIST.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="mb-8">
        <label className="font-body text-xs tracking-widest uppercase text-charcoal/50 mb-2 block">О вашем бизнесе</label>
        <textarea value={form.about} onChange={set("about")} placeholder="Расскажите коротко о вашем бизнесе и достижениях в 2025 году..." rows={5} className={`${inputCls} resize-none`} />
      </div>
      {error && <p className="font-body text-xs text-red-500 mb-4">{error}</p>}
      <button type="submit" disabled={status === "loading"} className="btn-gold-lg w-full">
        {status === "loading" ? "Отправка..." : "Подать заявку"}
      </button>
      <p className="font-body text-xs text-charcoal/35 text-center mt-4">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
    </form>
  );
}

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-body text-charcoal overflow-x-hidden">

      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/96 backdrop-blur-sm shadow-sm" : "bg-black/30 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-stretch justify-between h-14">
          {/* Логотип */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-3 shrink-0 pr-8"
          >
            <div className="w-px h-5 bg-gold" />
            <span
              className="font-display text-lg font-semibold tracking-widest text-gold"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Я Бренд ДВ
            </span>
            <div className="w-px h-5 bg-gold/30" />
          </button>

          {/* Таб-бар — десктоп */}
          <nav className="hidden lg:flex items-stretch">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative flex items-center px-5 font-body text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-200 border-b-2 ${
                    isActive
                      ? "text-gold border-gold"
                      : `border-transparent hover:text-gold hover:border-gold/40 ${scrolled ? "text-charcoal/70" : "text-white/75"}`
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* CTA + бургер */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#apply")}
              className="hidden lg:block btn-gold text-[11px] px-5 py-2"
            >
              Стать номинантом
            </button>
            <button
              className={`lg:hidden p-2 transition-colors ${scrolled ? "text-charcoal" : "text-white"}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="bg-charcoal/97 backdrop-blur-md border-t border-gold/20 px-6 py-4 flex flex-col">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{ transitionDelay: menuOpen ? `${i * 35}ms` : "0ms" }}
                  className={`text-left py-3 font-body text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200 border-b border-white/5 flex items-center gap-3 ${
                    isActive ? "text-gold" : "text-white/70 hover:text-gold"
                  }`}
                >
                  <span className={`block h-px bg-gold transition-all duration-300 ${isActive ? "w-6" : "w-3 opacity-40"}`} />
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => scrollTo("#apply")}
              className="btn-gold mt-4 text-xs text-center"
            >
              Стать номинантом
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMG})`, backgroundPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/85" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          <div className="inline-flex items-center gap-3 border border-gold/50 px-6 py-2 mb-6">
            <div className="w-5 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Первая ежегодная</span>
            <div className="w-5 h-px bg-gold" />
          </div>

          <p className="font-display text-lg md:text-xl text-white/70 font-light italic mb-4">
            Бизнес-премия
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-wide mb-4 animate-fade-in">
            Я&nbsp;<span className="gold-gradient-text italic">Бренд</span>&nbsp;ДВ&nbsp;<span className="text-white/60 text-3xl md:text-4xl lg:text-5xl font-light">· Находка</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-3 text-white/90">
              <Icon name="Calendar" size={16} className="text-gold" />
              <span className="font-body text-sm tracking-widest uppercase">11 июля 2026 · 18:00–24:00</span>
            </div>
            <div className="w-px h-4 bg-gold/40 hidden md:block" />
            <div className="flex items-center gap-3 text-white/90">
              <Icon name="MapPin" size={16} className="text-gold" />
              <span className="font-body text-sm tracking-widest uppercase">г. Находка · ГЕОКУПОЛ «ЛУ'НА»</span>
            </div>
          </div>

          <p className="font-body text-xs text-white/50 tracking-widest uppercase mb-10">
            Организатор: «Савкина Центр» — продюсерский центр продвижения и центр креативных индустрий
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("#apply")} className="btn-gold">
              Стать номинантом
            </button>
            <button
              onClick={() => scrollTo("#partners")}
              style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#fff", background: "transparent" }}
              className="btn-outline-gold"
            >
              Стать партнером
            </button>
            <a
              href="https://pro.selfwork.ru/kassa/Bikersayt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37", background: "transparent", display: "inline-block", textAlign: "center" }}
              className="btn-outline-gold"
            >
              Стать гостем
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
          <div className="w-px h-10 bg-gold/40" />
          <Icon name="ChevronDown" size={16} className="text-gold/60" />
        </div>
      </section>

      {/* ── TICKER 1 ── */}
      <div className="bg-charcoal py-4 overflow-hidden border-y border-gold/20">
        <div className="ticker-wrap">
          <div className="ticker-content">
            {Array(8).fill(tickerText).map((t, i) => (
              <span key={i} className="font-body text-xs tracking-widest text-gold uppercase px-4">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── О ПРЕМИИ ── */}
      <section id="about" className="py-24 px-6 max-w-5xl mx-auto text-center relative overflow-hidden">
        {/* Декор: пузыри по углам */}
        <img src={DECO_BUBBLES} alt="" aria-hidden="true" className="absolute -top-6 -left-10 w-52 opacity-25 pointer-events-none select-none mix-blend-multiply" />
        <img src={DECO_BUBBLES} alt="" aria-hidden="true" className="absolute -bottom-6 -right-10 w-40 opacity-15 pointer-events-none select-none mix-blend-multiply rotate-180" />
        <h2 className="font-display text-5xl md:text-6xl font-bold leading-none tracking-widest uppercase mb-5 gold-gradient-text">
          О ПРЕМИИ
        </h2>
        <p className="font-display text-2xl md:text-3xl font-light text-charcoal mb-10 leading-snug">
          Признание лучших <em className="text-gold font-semibold not-italic">предпринимателей</em> региона
        </p>
        <div className="section-divider mb-10" />
        <p className="font-body text-base text-charcoal/70 leading-relaxed max-w-3xl mx-auto mb-12">
          Первая ежегодная бизнес-премия города Находка «Я — БРЕНД ДВ» призвана отметить лучших представителей предпринимательского сообщества, поддержать развитие бизнеса в городе, показать сильные и вдохновляющие примеры, а также сформировать новое деловое сообщество лидеров, экспертов и партнеров.
        </p>
        <a href="https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/0f0fceed-6047-481f-8060-c9839be76276.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline-gold inline-block">Положение премии</a>
      </section>

      {/* ── ЦЕЛИ И АТМОСФЕРА ── */}
      <section className="bg-gold-subtle py-24 px-6 relative overflow-hidden">
        {/* Декоративный узор — плавающие ромбы */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
          {[
            { size: 18, left: "8%",  delay: "0s",   dur: "7s"  },
            { size: 10, left: "18%", delay: "1.2s", dur: "9s"  },
            { size: 22, left: "30%", delay: "0.4s", dur: "6s"  },
            { size: 8,  left: "42%", delay: "2s",   dur: "8s"  },
            { size: 14, left: "55%", delay: "0.8s", dur: "10s" },
            { size: 20, left: "66%", delay: "1.6s", dur: "7s"  },
            { size: 9,  left: "77%", delay: "0.2s", dur: "9s"  },
            { size: 16, left: "88%", delay: "1s",   dur: "6s"  },
          ].map((d, i) => (
            <div
              key={i}
              className="absolute bottom-4"
              style={{ left: d.left, animationDelay: d.delay }}
            >
              <div
                className="border border-gold/30 rotate-45 float-slow opacity-60"
                style={{ width: d.size, height: d.size, animationDuration: d.dur, animationDelay: d.delay }}
              />
            </div>
          ))}
          {/* Горизонтальная золотая линия */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-10 h-px bg-gold mb-8" />
              <div className="mb-8">
                <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight inline">
                  Цель&nbsp;
                </h2>
                <h2 className="font-display text-4xl md:text-5xl font-light leading-tight inline">
                  <em className="text-gold">премии</em>
                </h2>
                <div className="flex items-center gap-3 mt-3">
                  <div className="h-px bg-gradient-to-r from-gold to-gold/10 flex-1 max-w-[120px]" />
                  <Icon name="Award" size={16} className="text-gold/60" />
                </div>
              </div>
              <p className="font-body text-base text-charcoal/70 leading-relaxed mb-6">
                Цель премии — публично отметить успехи предпринимателей, экспертов, владельцев компаний (семейных, социальных, креативных), усилить деловые связи и запустить в Находке ежегодную традицию делового признания.
              </p>
              <p className="font-body text-base text-charcoal/70 leading-relaxed mb-6">
                Фотокамеры, красная дорожка, изысканный банкет, живая музыка и лучшее окружение — это вечер, который запомнится навсегда! Вы много работали, ставили амбициозные цели и достигали их. А сейчас пришло время насладиться качественным отдыхом!
              </p>
              <p className="font-body text-base text-charcoal/70 leading-relaxed mb-10">
                Мы готовимся вас удивлять, вдохновлять и заряжать! Этот вечер — шанс не только провести время в красивом окружении, но и сделать важный шаг в развитии своего бизнеса.
              </p>
              <button onClick={() => scrollTo("#apply")} className="btn-gold">Стать номинантом</button>
            </div>
            <div className="relative h-[520px] lg:h-[600px]">
              {/* Фото 1 — левое, смещено вниз */}
              <div className="absolute left-0 top-8 w-[58%] aspect-[4/5] overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/d000bac3-938c-4827-9ce3-1765abead9e7.png"
                  alt="Церемония вручения премии"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Декоративная золотая рамка */}
              <div className="absolute left-3 top-11 w-[58%] aspect-[4/5] border border-gold/30 pointer-events-none" />
              {/* Фото 2 — правое, смещено вверх */}
              <div className="absolute right-0 top-0 w-[52%] aspect-[3/4] overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/d284704f-1fc8-4893-8fda-533ced53b10f.jpg"
                  alt="Победитель с наградой"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Декоративный золотой акцент */}
              <div className="absolute right-3 top-3 w-[52%] aspect-[3/4] border border-gold/20 pointer-events-none" />
              {/* Нижний акцент с текстом */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── НОМИНАНТЫ 2025 ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/f7def902-e4fc-4646-ba52-5ee1fa16069d.jpg"
                  alt="Статуэтки премии Я Бренд ДВ"
                  className="w-full object-cover object-center"
                  style={{ aspectRatio: '4/3' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              </div>
              {/* Декоративная рамка */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-gold/25 pointer-events-none" style={{ top: 'auto', left: 'auto', right: '-12px', bottom: '-12px', width: 'calc(100% - 12px)', height: 'calc(100% - 12px)' }} />
              {/* Подпись */}

            </div>
            <div className="order-1 lg:order-2">
              <div className="w-10 h-px bg-gold mb-8" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal mb-6 leading-tight">
                Номинанты&nbsp;<em className="text-gold">2025</em>
              </h2>
              <p className="font-body text-base text-charcoal/70 leading-relaxed mb-6">
                В рамках премии будут определены победители в номинациях 2025 года, среди которых: социально значимый бизнес, прорыв года, креативный бизнес, женское лидерство, мужской подход к делу, туристический проект, семейный бизнес, эксперт года и партнер года Находки. Также для всех участников доступны номинации народного голосования и Гран-при премии.
              </p>
              <p className="font-body text-base text-charcoal/70 leading-relaxed mb-10">
                Первая ежегодная бизнес-премия в городе Находке «Я — БРЕНД ДВ. Находка» призвана отметить лучших представителей предпринимательского сообщества, поддержать развитие бизнеса в городе, продемонстрировать сильные и вдохновляющие примеры, а также сформировать новое деловое сообщество лидеров, экспертов и партнеров.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => scrollTo("#apply")} className="btn-gold-lg">Стать номинантом</button>
                <a href="tel:+79243382021" className="btn-outline-gold-lg inline-block">Стать партнером</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ДЛЯ КОГО ── */}
      <section className="py-24 px-6 bg-gold-subtle">
        <div className="max-w-5xl mx-auto text-center">
          <div className="section-divider mb-10" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-charcoal mb-4 leading-tight">
            Кто участвует в&nbsp;<em className="text-gold">премии</em>
          </h2>
          <p className="font-body text-sm text-charcoal/55 mb-12 tracking-wide">
            Премия открыта для предпринимателей, самозанятых и экспертов города Находки
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {audience.map((tag) => (
              <span
                key={tag}
                className="font-body text-sm font-semibold tracking-[0.1em] uppercase px-8 py-4 border-2 border-charcoal/15 text-charcoal bg-white hover:border-gold hover:text-gold hover:bg-white transition-all duration-300 cursor-default shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── СТОИМОСТЬ ── */}
      <section className="py-24 px-6 bg-[#fafaf8] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Пузырьки фоновые */}
        {[
          { size: 80,  top: "10%",  left: "3%",   op: 0.12, dur: "8s",  del: "0s"   },
          { size: 44,  top: "25%",  left: "7%",   op: 0.18, dur: "11s", del: "1s"   },
          { size: 28,  top: "60%",  left: "1%",   op: 0.10, dur: "9s",  del: "2s"   },
          { size: 60,  top: "75%",  left: "5%",   op: 0.14, dur: "12s", del: "0.5s" },
          { size: 20,  top: "45%",  left: "11%",  op: 0.08, dur: "7s",  del: "1.5s" },
          { size: 90,  top: "8%",   right: "3%",  op: 0.12, dur: "10s", del: "0.3s" },
          { size: 36,  top: "30%",  right: "6%",  op: 0.16, dur: "8s",  del: "2s"   },
          { size: 55,  top: "65%",  right: "2%",  op: 0.13, dur: "13s", del: "1s"   },
          { size: 22,  top: "50%",  right: "9%",  op: 0.09, dur: "9s",  del: "0.7s" },
          { size: 14,  top: "85%",  right: "12%", op: 0.10, dur: "7s",  del: "1.8s" },
          { size: 18,  top: "20%",  left: "48%",  op: 0.08, dur: "10s", del: "0.4s" },
          { size: 32,  top: "80%",  left: "44%",  op: 0.10, dur: "11s", del: "1.2s" },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute pointer-events-none rounded-full float-slow"
            style={{
              width: b.size, height: b.size,
              top: b.top, left: 'left' in b ? b.left : undefined, right: 'right' in b ? b.right : undefined,
              opacity: b.op,
              background: `radial-gradient(circle at 35% 35%, rgba(232,212,139,0.9), rgba(201,168,76,0.3) 50%, transparent)`,
              border: '1px solid rgba(201,168,76,0.4)',
              animationDuration: b.dur,
              animationDelay: b.del,
            }}
          />
        ))}

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16 reveal">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Участие</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Стоимость <em className="text-gold">участия</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* ── БИЛЕТ ГОСТЯ ── */}
            <div className="reveal reveal-left flex flex-col">
              <h3 className="font-display text-xl font-semibold text-charcoal text-center mb-8">Билет для гостя бизнес-премии</h3>
              {/* Тикет — тёмная шапка */}
              <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white text-center px-10 py-12 shadow-2xl">
                {/* Зубцы сверху */}
                <div className="absolute -top-[10px] left-0 right-0 flex justify-between px-2 pointer-events-none">
                  {Array(20).fill(null).map((_, i) => <div key={i} className="w-5 h-5 rounded-full bg-[#fafaf8]" />)}
                </div>
                {/* Золотое свечение за ценой */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-24 rounded-full bg-gold/10 blur-2xl" />
                </div>
                <p className="gold-gradient-text font-display text-7xl font-bold mb-3 relative">7 900 ₽</p>
                <p className="font-body text-[11px] tracking-[0.25em] uppercase text-white/40">стоимость билета<br />для одного гостя</p>
                {/* Зубцы снизу */}
                <div className="absolute -bottom-[10px] left-0 right-0 flex justify-between px-2 pointer-events-none">
                  {Array(20).fill(null).map((_, i) => <div key={i} className="w-5 h-5 rounded-full bg-[#fafaf8]" />)}
                </div>
              </div>
              {/* Тикет — светлая часть */}
              <div className="bg-white border border-gold/25 border-t-0 px-8 py-8 flex-1 flex flex-col shadow-lg">
                <div className="border border-gold/30 p-6 mb-8 flex-1">
                  <ul className="space-y-4">
                    {["Место за столом", "Фуршет, полная банкетная часть", "Шоу-программа", "Нетворкинг", "Розыгрыш призов"].map(item => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                        <span className="font-body text-sm text-charcoal leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="https://pro.selfwork.ru/kassa/Bikersayt" target="_blank" rel="noopener noreferrer" className="btn-gold-lg w-full block text-center">Купить билет</a>
              </div>
            </div>

            {/* ── УЧАСТИЕ В НОМИНАЦИИ ── */}
            <div className="reveal reveal-right flex flex-col">
              <h3 className="font-display text-xl font-semibold text-charcoal text-center mb-8">Что входит в стоимость участия</h3>
              {/* Тикет — тёмная шапка */}
              <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white text-center px-10 py-12 shadow-2xl">
                <div className="absolute -top-[10px] left-0 right-0 flex justify-between px-2 pointer-events-none">
                  {Array(20).fill(null).map((_, i) => <div key={i} className="w-5 h-5 rounded-full bg-[#fafaf8]" />)}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-24 rounded-full bg-gold/10 blur-2xl" />
                </div>
                <p className="gold-gradient-text font-display text-7xl font-bold mb-3 relative">9 900 ₽</p>
                <p className="font-body text-[11px] tracking-[0.25em] uppercase text-white/40">стоимость участия<br />в одной номинации</p>
                <div className="absolute -bottom-[10px] left-0 right-0 flex justify-between px-2 pointer-events-none">
                  {Array(20).fill(null).map((_, i) => <div key={i} className="w-5 h-5 rounded-full bg-[#fafaf8]" />)}
                </div>
              </div>
              {/* Тикет — светлая часть */}
              <div className="bg-white border border-gold/25 border-t-0 px-8 py-8 flex-1 flex flex-col shadow-lg">
                <div className="border border-gold/30 p-6 mb-4 flex-1">
                  <ul className="space-y-3">
                    {[
                      "Участие в премии",
                      "Рассмотрение заявки жюри",
                      "Статус официального номинанта премии",
                      "Место за столом, фуршет, полная банкетная часть",
                      "Шоу-программа",
                      "Объявление номинанта и его бизнеса/статуса со сцены",
                      "Освещение на всех социальных площадках",
                      "Размещение на сайте премии",
                      "Розыгрыш призов",
                      "Фото- и видеоотчёт",
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                        <span className="font-body text-sm text-charcoal leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-body text-xs text-charcoal/40 text-center mb-5 italic">При участии в нескольких номинациях стоимость рассчитывается отдельно</p>
                <button onClick={() => scrollTo("#nominations")} className="btn-gold-lg w-full">Выбрать номинацию</button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TICKER 2 (партнёры-заглушки) ── */}
      <div className="bg-white py-5 overflow-hidden border-y border-gold/20">
        <div className="ticker-wrap">
          <div className="ticker-content" style={{ animationDuration: "50s" }}>
            {Array(6).fill(null).map((_, i) => (
              <div key={i} className="flex items-center gap-16 px-10">
                {["Порт Восточный", "Савкина Центр", "Источник Силы", "Партнер ДВ", "Медиа Восток", "Бизнес Клуб"].map((name) => (
                  <span key={name} className="font-display text-lg font-semibold text-charcoal/25 tracking-widest whitespace-nowrap">
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 10 НОМИНАЦИЙ ── */}
      <section id="nominations" className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Декоративные золотые пятна */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />
        {/* Искры */}
        <div className="absolute top-16 right-24 sparkle-1 pointer-events-none"><Icon name="Sparkles" size={18} className="text-gold/30" /></div>
        <div className="absolute top-40 left-16 sparkle-2 pointer-events-none"><Icon name="Star" size={12} className="text-gold/20" /></div>
        <div className="absolute bottom-24 right-1/3 sparkle-3 pointer-events-none"><Icon name="Star" size={10} className="text-gold/25" /></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16 reveal">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">10 номинаций</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              В каких категориях<br />
              <em className="text-gold">побеждают лучшие</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {nominations.map((nom, i) => (
              <div
                key={nom.num}
                onClick={() => scrollTo("#apply")}
                className={`card-premium p-7 flex gap-5 shimmer reveal reveal-delay-${Math.min(i % 3 + 1, 6)} cursor-pointer group`}
              >
                <span className="font-display text-5xl font-light text-gold/25 shrink-0 leading-none mt-1">{nom.num}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={nom.icon} size={16} className="text-gold shrink-0" />
                    <h3 className="font-display text-lg font-semibold text-charcoal leading-tight group-hover:text-gold transition-colors duration-200">{nom.title}</h3>
                  </div>
                  <p className="font-body text-sm text-charcoal/55 leading-relaxed">{nom.desc}</p>
                  <span className="inline-block mt-3 font-body text-xs text-gold/70 tracking-widest uppercase group-hover:text-gold transition-colors duration-200">Подать заявку →</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => scrollTo("#apply")} className="btn-gold-lg">Стать номинантом</button>
          </div>
        </div>
      </section>

      {/* ── ВЫБОР ПОБЕДИТЕЛЕЙ ── */}
      <section className="relative py-24 px-6 text-center overflow-hidden bg-gold-subtle">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/5715491f-505c-4ce7-9380-cadf5c4e38fc.png" alt="" className="w-full h-full object-cover opacity-60" />
        </div>
        {/* Концентрические кольца */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="award-ring w-[500px] h-[500px] rounded-full border border-gold/15" />
          <div className="absolute award-ring-2 w-[340px] h-[340px] rounded-full border border-gold/20" />
          <div className="absolute w-[180px] h-[180px] rounded-full border border-gold/25" />
        </div>
        {/* Искры */}
        <div className="absolute top-12 left-1/4 sparkle-1 pointer-events-none"><Icon name="Sparkles" size={14} className="text-gold/50" /></div>
        <div className="absolute top-20 right-1/4 sparkle-2 pointer-events-none"><Icon name="Star" size={10} className="text-gold/40" /></div>
        <div className="absolute bottom-16 left-1/3 sparkle-3 pointer-events-none"><Icon name="Star" size={12} className="text-gold/35" /></div>
        <div className="absolute bottom-20 right-1/3 sparkle-1 pointer-events-none"><Icon name="Sparkles" size={10} className="text-gold/30" /></div>
        <div className="max-w-3xl mx-auto relative">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-gold/50 mb-8 pulse-gold float-slow bg-white/60">
            <Icon name="Award" size={44} className="text-gold" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal mb-8 leading-tight reveal">
            Как определяются<br /><em className="text-gold">победители премии</em>
          </h2>
          <div className="w-16 h-px bg-gold/50 mx-auto mb-8" />
          <h3 className="font-display text-2xl font-semibold text-charcoal mb-4 reveal">
            Голосование жюри
          </h3>
          <p className="font-body text-base text-charcoal/65 leading-relaxed reveal">
            Выбор компетентного жюри, в состав которого входят авторитетные руководители и собственники компаний, опытные эксперты разных сфер.
          </p>
        </div>
      </section>

      {/* ── ЖЮРИ ── */}
      <section className="py-24 px-6 bg-[#fafaf8] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display text-5xl md:text-7xl font-light text-charcoal leading-tight">
              <em className="text-gold">Жюри</em>
            </h2>
            <div className="section-divider mt-4 mb-6" />
            <p className="font-body text-sm text-charcoal/50 tracking-widest uppercase">Они определяют победителей</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {juryPlaceholders.map((member, i) => (
              <div key={i} className={`card-premium text-center overflow-hidden reveal reveal-delay-${Math.min(i + 1, 6)}`}>
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-gold/15 to-charcoal/5 border-b border-gold/20 flex items-center justify-center relative shimmer">
                  <Icon name="User" size={56} className="text-gold/30 float-slow" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-t-2 border-gold/40" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-b-2 border-gold/40" />
                  <div className="absolute top-3 left-3 sparkle-1"><Icon name="Sparkles" size={10} className="text-gold/30" /></div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-2 leading-tight">{member.name}</h3>
                  <p className="font-body text-sm text-charcoal/55 leading-relaxed">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КРИТЕРИИ ОЦЕНКИ ── */}
      <section className="bg-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/8 spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/10" />
        </div>
        <div className="absolute top-10 right-20 sparkle-2 pointer-events-none"><Icon name="Star" size={14} className="text-gold/40" /></div>
        <div className="absolute bottom-16 left-20 sparkle-3 pointer-events-none"><Icon name="Sparkles" size={12} className="text-gold/30" /></div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-12 reveal">
            <div className="section-divider mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-charcoal leading-tight">
              Общие критерии для всех <em className="text-gold">номинаций</em>
            </h2>
            <p className="font-body text-base text-charcoal/50 mt-4">Жюри оценивает участников по следующим параметрам:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 mb-12">
            {[
              { title: "Сила бренда и позиционирование", desc: "Насколько понятно, чем отличается проект и какую ценность он несет." },
              { title: "Репутация и доверие", desc: "Как воспринимают компанию клиенты, партнеры и рынок." },
              { title: "Вклад в Находку", desc: "Есть ли польза для города, жителей, профессиональной среды." },
              { title: "Социальная активность", desc: "Участие в благотворительных, общественных или значимых инициативах." },
              { title: "Визуальный стиль бренда", desc: "Насколько цельно и профессионально выглядит бренд." },
              { title: "Продвижение", desc: "Как и где бренд заявляет о себе, насколько системно ведется работа." },
              { title: "Коллаборации и партнерства", desc: "Умение выстраивать связи и усиливать бренд через совместные проекты." },
              { title: "Убедительность заявки", desc: "Насколько полно, конкретно и ярко номинант отвечает на вопросы анкеты." },
            ].map((item, i) => (
              <div key={item.title} className={`flex gap-4 items-start p-6 border border-charcoal/8 hover:border-gold/50 hover:bg-gold-subtle transition-all duration-300 reveal reveal-delay-${Math.min(i % 4 + 1, 5)}`}>
                <div className="w-px shrink-0 self-stretch bg-gradient-to-b from-gold to-gold/10" />
                <div>
                  <p className="font-body text-base font-semibold text-charcoal mb-1">{item.title}</p>
                  <p className="font-body text-sm text-charcoal/55 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center reveal">
            <button onClick={() => scrollTo("#apply")} className="btn-gold-lg">Стать номинантом</button>
          </div>
        </div>
      </section>

      {/* ── ОБЩИЕ НОМИНАЦИИ ── */}
      <section className="py-20 px-6 bg-[#fafaf8] relative overflow-hidden">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 sparkle-1 pointer-events-none"><Icon name="Sparkles" size={16} className="text-gold/30" /></div>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Специальные</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Номинации для <em className="text-gold">всех участников</em>
            </h2>
            <p className="font-body text-base text-charcoal/60 leading-relaxed max-w-2xl mx-auto mt-6">
              Эти номинации доступны каждому участнику премии независимо от сферы бизнеса и масштаба проекта. Здесь у каждого есть возможность заявить о себе, получить признание и побороться за отдельную награду.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden border border-gold p-10 text-center bg-gradient-to-br from-gold/8 to-gold/2 shimmer reveal reveal-left number-card">
              <div className="absolute top-4 right-4 sparkle-1"><Icon name="Crown" size={20} className="text-gold/50" /></div>
              <div className="absolute bottom-4 left-4 sparkle-3"><Icon name="Star" size={12} className="text-gold/30" /></div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/40 mb-5 float-slow">
                <Icon name="Trophy" size={32} className="text-gold" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-charcoal mb-3">Гран-при премии</h3>
              <p className="font-body text-sm text-charcoal/60 leading-relaxed">Главная награда премии.</p>
            </div>
            <div className="relative overflow-hidden border border-gold/40 p-10 text-center hover:border-gold transition-all duration-300 bg-white reveal reveal-right number-card">
              <div className="absolute top-4 right-4 sparkle-2"><Icon name="Users" size={20} className="text-gold/30" /></div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/30 mb-5 float-slow-2">
                <Icon name="Heart" size={32} className="text-gold" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-charcoal mb-3">Номинация народного голосования</h3>
              <p className="font-body text-sm text-charcoal/60 leading-relaxed">Награда для участника, которого выберут сами люди.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ГАЛЕРЕЯ НОМИНАНТОВ ── */}
      <section className="bg-gold-subtle py-20 px-6 relative overflow-hidden">
        <div className="absolute top-6 right-10 sparkle-2 pointer-events-none"><Icon name="Sparkles" size={14} className="text-gold/40" /></div>
        <div className="absolute bottom-8 left-16 sparkle-1 pointer-events-none"><Icon name="Star" size={10} className="text-gold/30" /></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="section-divider mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Наши&nbsp;<em className="text-gold">номинанты</em>
            </h2>
          </div>
          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-6 w-max">
              {nominantsPlaceholders.map((n, i) => (
                <div key={i} className="w-48 shrink-0 bg-white card-premium p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 mx-auto mb-4 flex items-center justify-center">
                    <Icon name="User" size={28} className="text-gold/40" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-charcoal mb-1">{n.name}</h3>
                  <p className="font-body text-xs text-charcoal/50">{n.role}</p>
                </div>
              ))}
              <div className="w-48 shrink-0 border border-dashed border-gold/40 p-6 text-center flex flex-col items-center justify-center gap-3 bg-white/50">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center">
                  <Icon name="Plus" size={28} className="text-gold/40" />
                </div>
                <p className="font-body text-xs text-charcoal/40 leading-relaxed">Здесь<br />может быть<br />ваш бренд</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <button onClick={() => scrollTo("#apply")} className="btn-gold-lg">Стать номинантом</button>
          </div>
        </div>
      </section>

      {/* ── ПРОГРАММА ── */}
      <section id="program" className="py-24 px-6 bg-[#fafaf8] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute right-10 top-16 sparkle-1 pointer-events-none"><Icon name="Sparkles" size={18} className="text-gold/35" /></div>
        <div className="absolute left-10 bottom-20 sparkle-3 pointer-events-none"><Icon name="Star" size={12} className="text-gold/30" /></div>
        <div className="absolute right-1/4 bottom-1/3 sparkle-2 pointer-events-none"><Icon name="Star" size={10} className="text-gold/25" /></div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16 reveal">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">11 июля 2026</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Программа<br />
              <em className="text-gold">вечера</em>
            </h2>
            <p className="font-body text-xs text-charcoal/40 tracking-widest uppercase mt-6 italic">* Точное время уточняется</p>
          </div>
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/25 to-transparent" />
            <div className="flex flex-col">
              {programItems.map((item, i) => (
                <div key={i} className={`flex gap-8 items-start py-8 border-b border-charcoal/6 last:border-0 group pl-10 relative reveal reveal-delay-${Math.min(i + 1, 6)}`}>
                  <div className="absolute left-[5px] w-3 h-3 rounded-full border-2 border-gold bg-[#fafaf8] group-hover:bg-gold group-hover:shadow-[0_0_12px_rgba(201,168,76,0.4)] transition-all duration-300 top-10" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl select-none leading-none">{item.emoji}</span>
                      <h3 className="font-display text-xl font-semibold text-charcoal group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                    </div>
                    <p className="font-body text-sm text-charcoal/55">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10 reveal">
            <button className="btn-outline-gold">Подробнее о программе</button>
          </div>
        </div>
      </section>

      {/* ── TICKER 3 ── */}
      <div className="bg-charcoal py-4 overflow-hidden border-y border-gold/20">
        <div className="ticker-wrap">
          <div className="ticker-content">
            {Array(8).fill(tickerText).map((t, i) => (
              <span key={i} className="font-body text-xs tracking-widest text-gold uppercase px-4">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ОРГАНИЗАТОРЫ ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Организаторы</span>
          <div className="section-divider mt-4 mb-16" />
          <div className="flex flex-row items-stretch justify-center gap-6">
            {[
              { src: "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/dbfa7573-636d-4b22-a202-0cc95d840e88.jpg", alt: "Савкина Центр", label: "Продюсерский центр", featured: false },
              { src: "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/6fcfb3d3-f1e1-4789-b7c1-4f6b825b5cb2.jpg", alt: "Я Бренд ДВ", label: "Организатор премии", featured: true },
              { src: "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/64a3c196-80ab-4092-b2a0-d2f9dba55585.png", alt: "Источник силы", label: "Бизнес-клуб", featured: false },
            ].map(({ src, alt, label, featured }) => (
              <div key={alt} className="flex flex-col items-center gap-4 flex-1 max-w-[280px]">
                <div className={`w-full aspect-[4/3] bg-white flex items-center justify-center p-5 transition-colors duration-300 ${featured ? "border-2 border-gold/50 hover:border-gold" : "border border-gold/20 hover:border-gold/50"}`}>
                  <img src={src} alt={alt} className="w-full h-full object-contain" />
                </div>
                <p className="font-body text-xs text-charcoal/50 tracking-widest uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПАРТНЕРЫ ── */}
      <section id="partners" className="bg-gold-subtle py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Партнёры</span>
          <div className="section-divider mt-4 mb-16" />
          <div className="flex flex-row items-stretch justify-center gap-6 mb-16">
            {[
              { src: "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/dbfa7573-636d-4b22-a202-0cc95d840e88.jpg", alt: "Савкина Центр", label: "Продюсерский центр", featured: false },
              { src: "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/6fcfb3d3-f1e1-4789-b7c1-4f6b825b5cb2.jpg", alt: "Я Бренд ДВ", label: "Организатор премии", featured: true },
              { src: "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/64a3c196-80ab-4092-b2a0-d2f9dba55585.png", alt: "Источник силы", label: "Бизнес-клуб", featured: false },
            ].map(({ src, alt, label, featured }) => (
              <div key={alt} className="flex flex-col items-center gap-4 flex-1 max-w-[280px]">
                <div className={`w-full aspect-[4/3] bg-white flex items-center justify-center p-5 transition-colors duration-300 ${featured ? "border-2 border-gold/50 hover:border-gold" : "border border-gold/20 hover:border-gold/50"}`}>
                  <img src={src} alt={alt} className="w-full h-full object-contain" />
                </div>
                <p className="font-body text-xs text-charcoal/50 tracking-widest uppercase">{label}</p>
              </div>
            ))}
          </div>
          <a href="tel:+79243382021" className="btn-outline-gold-lg inline-block">Стать партнером</a>
        </div>
      </section>

      {/* ── TICKER 4 ── */}
      <div className="bg-charcoal py-4 overflow-hidden border-y border-gold/20">
        <div className="ticker-wrap">
          <div className="ticker-content">
            {Array(8).fill(tickerText).map((t, i) => (
              <span key={i} className="font-body text-xs tracking-widest text-gold uppercase px-4">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ФОРМА ЗАЯВКИ ── */}
      <section id="apply" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Подать заявку</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Стать<em className="text-gold"> номинантом</em>
            </h2>
            <p className="font-body text-sm text-charcoal/60 mt-4 max-w-xl mx-auto leading-relaxed">
              Заполните форму — наша команда свяжется с вами в течение 24 часов
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>

      {/* ── FOOTER / КОНТАКТЫ ── */}
      <footer id="contacts" className="bg-charcoal text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="font-display text-2xl font-semibold tracking-widest mb-4">
                Я&nbsp;<span className="text-gold">Бренд</span>&nbsp;ДВ
              </div>
              <p className="font-body text-xs text-white/40 leading-relaxed mb-6">
                Первая ежегодная бизнес-премия<br />
                г. Находка, Дальний Восток
              </p>
              <div className="flex gap-4">
                {["TG", "VK", "IG"].map((sn) => (
                  <button key={sn} className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold transition-all duration-300">
                    <span className="font-body text-xs text-white/50 hover:text-gold">{sn}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-body text-xs tracking-[0.2em] uppercase text-white/40 mb-6">Навигация</h4>
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label + link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-left font-body text-xs tracking-wider text-white/60 hover:text-gold transition-colors uppercase"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-body text-xs tracking-[0.2em] uppercase text-white/40 mb-6">Контакты</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={14} className="text-gold shrink-0" />
                  <span className="font-body text-xs text-white/60">г. Находка, ГЕОКУПОЛ «ЛУ'НА»</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Calendar" size={14} className="text-gold shrink-0" />
                  <span className="font-body text-xs text-white/60">11 июля 2026, 18:00–24:00</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={14} className="text-gold shrink-0" />
                  <a href="tel:+79140730533" className="font-body text-xs text-white/60 hover:text-gold transition-colors">
                    +7 914 073 05 33 · Анна
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={14} className="text-gold shrink-0" />
                  <a href="tel:+79147086111" className="font-body text-xs text-white/60 hover:text-gold transition-colors">
                    +7 914 708 61 11
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-white/30 tracking-wider">
              © 2026 Я Бренд ДВ · Первая ежегодная бизнес-премия · Находка
            </p>
            <p className="font-body text-xs text-white/20 tracking-wider">
              Организатор: продюсерский центр «Савкина Центр»
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}