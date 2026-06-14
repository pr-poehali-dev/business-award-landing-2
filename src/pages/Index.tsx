import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/18bb0f6d-8a2e-4a00-8ba7-6412e5b7c649.png";
const HANDSHAKE_IMG = "https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/files/1b44f2bb-9032-4bfc-a083-de75e1183e72.jpg";
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
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
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
            <button
              onClick={() => scrollTo("#apply")}
              style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37", background: "transparent" }}
              className="btn-outline-gold"
            >
              Стать гостем
            </button>
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
        <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">О премии</span>
        <div className="section-divider mt-4 mb-10" />
        <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal mb-8 leading-tight">
          Признание лучших<br />
          <em className="text-gold">предпринимателей</em> региона
        </h2>
        <p className="font-body text-base text-charcoal/70 leading-relaxed max-w-3xl mx-auto mb-12">
          Первая ежегодная бизнес-премия города Находка «Я — БРЕНД ДВ» призвана отметить лучших представителей предпринимательского сообщества, поддержать развитие бизнеса в городе, показать сильные и вдохновляющие примеры, а также сформировать новое деловое сообщество лидеров, экспертов и партнеров.
        </p>
        <button className="btn-outline-gold">Положение премии</button>
      </section>

      {/* ── ЦЕЛИ И АТМОСФЕРА ── */}
      <section className="bg-gold-subtle py-24 px-6 relative overflow-hidden">
        {/* Декор: бокалы шампанского */}
        <img src={DECO_CHAMPAGNE} alt="" aria-hidden="true" className="absolute -bottom-8 -right-8 w-64 opacity-30 pointer-events-none select-none mix-blend-multiply rotate-12" />
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Цели и атмосфера</span>
              <div className="w-10 h-px bg-gold mt-4 mb-8" />
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
                  src="https://cdn.poehali.dev/projects/12e9a854-3fd5-400b-9c06-170c6e1dff34/bucket/7bb14021-0123-424b-8738-d1d3f90afeaf.png"
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
                <div className="bg-charcoal/90 backdrop-blur-sm px-6 py-3 flex items-center gap-3">
                  <div className="w-6 h-px bg-gold" />
                  <span className="font-body text-xs tracking-[0.25em] text-gold uppercase">Церемония 2025</span>
                  <div className="w-6 h-px bg-gold" />
                </div>
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
              <div className="mt-4 flex items-center gap-3">
                <div className="w-6 h-px bg-gold" />
                <span className="font-body text-xs tracking-[0.25em] text-gold/70 uppercase">Статуэтки премии · 2025</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Аудитория</span>
              <div className="w-10 h-px bg-gold mt-4 mb-8" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal mb-6 leading-tight">
                Номинанты&nbsp;<em className="text-gold">2025</em>
              </h2>
              <p className="font-body text-base text-charcoal/70 leading-relaxed mb-6">
                В рамках премии будут определены победители в номинациях 2025 года, среди которых: социально значимый бизнес, прорыв года, креативный бизнес, женское лидерство, мужской подход к делу, туристический проект, семейный бизнес, эксперт года и партнер года Находки. Также для всех участников доступны номинации народного голосования и Гран-при премии.
              </p>
              <p className="font-body text-base text-charcoal/70 leading-relaxed mb-10">
                Мероприятие соберет представителей власти, администрации города, предпринимателей, экспертов, владельцев компаний и представителей делового сообщества Находки, заинтересованных в развитии бизнеса, обмене опытом, новых знакомствах и укреплении профессионального статуса.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => scrollTo("#apply")} className="btn-gold">Стать номинантом</button>
                <button onClick={() => scrollTo("#partners")} className="btn-outline-gold">Стать партнером</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ДЛЯ КОГО ── */}
      <section className="bg-charcoal py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Для кого</span>
          <div className="section-divider mt-4 mb-12" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-12 leading-tight">
            Кто участвует в&nbsp;<em className="text-gold">премии</em>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {audience.map((tag) => (
              <span
                key={tag}
                className="font-body text-xs tracking-wider uppercase px-5 py-3 border border-gold/30 text-white/80 hover:border-gold hover:text-gold transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
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
      <section id="nominations" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">10 номинаций</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              В каких категориях<br />
              <em className="text-gold">побеждают лучшие</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {nominations.map((nom) => (
              <div key={nom.num} className="card-premium p-8 flex gap-6">
                <span className="font-display text-4xl font-light text-gold/30 shrink-0 leading-none mt-1">{nom.num}</span>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={nom.icon} size={18} className="text-gold shrink-0" />
                    <h3 className="font-display text-xl font-semibold text-charcoal leading-tight">{nom.title}</h3>
                  </div>
                  <p className="font-body text-sm text-charcoal/60 leading-relaxed">{nom.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => scrollTo("#apply")} className="btn-gold">Стать номинантом</button>
          </div>
        </div>
      </section>

      {/* ── ВЫБОР ПОБЕДИТЕЛЕЙ ── */}
      <section className="bg-gold-subtle py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Icon name="Award" size={40} className="text-gold mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal mb-6 leading-tight">
            Голосование<br />
            <em className="text-gold">жюри</em>
          </h2>
          <p className="font-body text-base text-charcoal/70 leading-relaxed">
            Выбор компетентного жюри, в состав которого входят авторитетные руководители и собственники компаний, опытные эксперты разных сфер.
          </p>
        </div>
      </section>

      {/* ── ЖЮРИ ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Жюри</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Они определяют<br />
              <em className="text-gold">победителей</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {juryPlaceholders.map((member, i) => (
              <div key={i} className="card-premium p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 mx-auto mb-4 flex items-center justify-center">
                  <Icon name="User" size={28} className="text-gold/50" />
                </div>
                <h3 className="font-display text-base font-semibold text-charcoal mb-2 leading-tight">{member.name}</h3>
                <p className="font-body text-xs text-charcoal/50 leading-relaxed">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КРИТЕРИИ ОЦЕНКИ ── */}
      <section className="bg-charcoal py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Критерии</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-white leading-tight">
              По каким критериям<br />
              <em className="text-gold">оценивают заявки</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {criteria.map((item) => (
              <div key={item.label} className="text-center group">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-4 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                  <Icon name={item.icon} size={24} className="text-gold" />
                </div>
                <p className="font-body text-xs tracking-wider text-white/70 uppercase">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => scrollTo("#apply")} className="btn-gold">Стать номинантом</button>
          </div>
        </div>
      </section>

      {/* ── ОБЩИЕ НОМИНАЦИИ ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
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
            <div className="relative overflow-hidden border border-gold p-10 text-center bg-gradient-to-br from-gold/5 to-transparent">
              <div className="absolute top-4 right-4">
                <Icon name="Crown" size={20} className="text-gold/30" />
              </div>
              <Icon name="Trophy" size={40} className="text-gold mx-auto mb-4" />
              <h3 className="font-display text-3xl font-semibold text-charcoal mb-3">Гран-при премии</h3>
              <p className="font-body text-sm text-charcoal/60 leading-relaxed">
                Главная награда премии.
              </p>
            </div>
            <div className="relative overflow-hidden border border-gold/40 p-10 text-center hover:border-gold transition-all duration-300">
              <div className="absolute top-4 right-4">
                <Icon name="Users" size={20} className="text-gold/30" />
              </div>
              <Icon name="Heart" size={40} className="text-gold mx-auto mb-4" />
              <h3 className="font-display text-3xl font-semibold text-charcoal mb-3">Номинация народного голосования</h3>
              <p className="font-body text-sm text-charcoal/60 leading-relaxed">
                Награда для участника, которого выберут сами люди.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ГАЛЕРЕЯ НОМИНАНТОВ ── */}
      <section className="bg-gold-subtle py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Галерея</span>
            <div className="section-divider mt-4 mb-8" />
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
            <button onClick={() => scrollTo("#apply")} className="btn-gold">Стать номинантом</button>
          </div>
        </div>
      </section>

      {/* ── ПРОГРАММА ── */}
      <section id="program" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">11 июля 2026</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Программа<br />
              <em className="text-gold">вечера</em>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-gold/20 hidden md:block" />
            <div className="flex flex-col">
              {programItems.map((item, i) => (
                <div key={i} className="flex gap-6 md:gap-10 items-start py-8 border-b border-charcoal/5 last:border-0 group">
                  <div className="shrink-0 w-16 text-right">
                    <span className="font-display text-2xl font-light text-gold">{item.time}</span>
                  </div>
                  <div className="relative md:pl-8">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-gold bg-white hidden md:block group-hover:bg-gold transition-all duration-300" />
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl select-none leading-none">{item.emoji}</span>
                      <h3 className="font-display text-2xl font-semibold text-charcoal">{item.title}</h3>
                    </div>
                    <p className="font-body text-sm text-charcoal/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
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
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Организаторы</span>
          <div className="section-divider mt-4 mb-12" />
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {[
              { name: "Савкина Центр", sub: "Продюсерский центр", featured: false },
              { name: "Я Бренд ДВ", sub: "Организатор премии", featured: true },
              { name: "Источник силы", sub: "Бизнес-клуб", featured: false },
            ].map((org) => (
              <div key={org.name} className={`flex flex-col items-center gap-3 ${org.featured ? "scale-110" : ""}`}>
                <div className={`w-28 h-28 border flex items-center justify-center ${org.featured ? "border-gold bg-gold/5" : "border-charcoal/15"}`}>
                  <span className="font-display text-sm font-semibold text-charcoal/40 tracking-wider text-center px-2">{org.name}</span>
                </div>
                <p className="font-body text-xs text-charcoal/50 tracking-widest uppercase">{org.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПАРТНЕРЫ ── */}
      <section id="partners" className="bg-gold-subtle py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Генеральные партнеры</span>
            <div className="section-divider mt-4 mb-10" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {["Генеральный партнер I", "Генеральный партнер II", "Генеральный партнер III"].map((name, i) => (
              <div key={i} className="bg-white border border-gold/20 p-10 text-center card-premium">
                <div className="w-24 h-16 bg-charcoal/5 mx-auto mb-6 flex items-center justify-center">
                  <span className="font-body text-xs text-charcoal/30 tracking-wider">Логотип</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-2">{name}</h3>
                <p className="font-body text-xs text-charcoal/50 leading-relaxed">
                  Описание партнёра и вклада в развитие премии и делового сообщества Находки
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Инфопартнеры</span>
            <div className="section-divider mt-4 mb-10" />
          </div>
          <div className="flex flex-wrap justify-center gap-10 mb-20">
            {["Инфопартнер I", "Инфопартнер II"].map((name, i) => (
              <div key={i} className="w-36 h-20 bg-white border border-gold/20 flex items-center justify-center">
                <span className="font-body text-xs text-charcoal/30 tracking-wider text-center px-2">{name}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Золотые партнеры</span>
            <div className="section-divider mt-4 mb-10" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {Array(8).fill(null).map((_, i) => (
              <div key={i} className="w-28 h-16 bg-white border border-gold/20 flex items-center justify-center">
                <span className="font-body text-xs text-charcoal/20 tracking-wider">Логотип</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="btn-gold">Стать партнером</button>
          </div>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">Подать заявку</span>
            <div className="section-divider mt-4 mb-8" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Стать<em className="text-gold"> номинантом</em>
            </h2>
            <p className="font-body text-sm text-charcoal/60 mt-4 max-w-xl mx-auto leading-relaxed">
              Заполните форму прямо здесь — наша команда свяжется с вами в течение 24 часов
            </p>
          </div>
          <div className="border border-gold/20 overflow-hidden">
            <iframe
              src="https://forms.yandex.ru/u/68a27f5890fa7b16db318143/"
              frameBorder={0}
              width="100%"
              height="700"
              className="block"
              title="Форма заявки на номинацию"
              allowFullScreen
            />
          </div>
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
                  <a href="tel:+7" className="font-body text-xs text-white/60 hover:text-gold transition-colors">
                    +7 (___) ___-__-__ · Савкина Центр
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={14} className="text-gold shrink-0" />
                  <a href="mailto:info@ybrand-dv.ru" className="font-body text-xs text-white/60 hover:text-gold transition-colors">
                    info@ybrand-dv.ru
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