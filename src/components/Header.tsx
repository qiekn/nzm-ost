function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center z-20 bg-linear-to-b from-black/60 to-transparent">
      <div className="flex items-center gap-4">
        <img
          src="/images/logo/golden.png"
          alt="逆战：未来"
          className="h-8 drop-shadow-[0_0_10px_rgba(216,180,106,0.3)]"
        />
        <div className="h-4 w-px bg-white/20" />
        <span className="text-white/80 text-sm font-medium tracking-widest">
          OST ARCHIVE
        </span>
        <span className="text-gold/80 text-xs font-medium border border-gold/30 bg-gold/10 px-2 py-0.5 rounded-sm backdrop-blur-md">
          《鬼吹灯》联动赛季
        </span>
      </div>
    </header>
  );
}

export default Header;
