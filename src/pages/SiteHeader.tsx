import Icon from "@/components/ui/icon";
import { navLinks } from "./data";

interface SiteHeaderProps {
  scrolled: boolean;
  menuOpen: boolean;
  activeSection: string;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (href: string) => void;
}

export default function SiteHeader({ scrolled, menuOpen, activeSection, setMenuOpen, scrollTo }: SiteHeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/96 backdrop-blur-sm shadow-sm" : "bg-black/30 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-stretch justify-between h-14">
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
  );
}
