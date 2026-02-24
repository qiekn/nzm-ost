import { useLang } from "../i18n/context";

function Header() {
  const { lang, setLang, t } = useLang();

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center z-20 bg-linear-to-b from-black/60 to-transparent">
      <div className="flex items-center gap-4 min-w-0">
        <img
          src="/images/logo/golden.png"
          alt={t("header.logoAlt")}
          className="h-8 shrink-0 drop-shadow-[0_0_10px_rgba(216,180,106,0.3)]"
        />
        <div className="h-4 w-px bg-white/20 shrink-0" />
        <span className="text-white/80 text-sm font-medium tracking-widest shrink-0">
          {t("header.title")}
        </span>
        <span className="hidden md:inline text-gold/80 text-xs font-medium border border-gold/30 bg-gold/10 px-2 py-0.5 rounded-sm backdrop-blur-md">
          {t("header.season")}
        </span>
      </div>
      <button
        onClick={() => setLang(lang === "zh" ? "en" : "zh")}
        className="shrink-0 text-xs font-medium text-white/60 hover:text-white/90 border border-white/20 hover:border-white/40 px-2.5 py-1 rounded-sm backdrop-blur-md transition-colors tracking-wide"
      >
        {lang === "zh" ? "EN" : "中"}
      </button>
    </header>
  );
}

export default Header;
