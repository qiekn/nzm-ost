import type { Chapter } from "../data/types";
import { useLang } from "../i18n/context";
import { asset } from "../utils/asset";

function CoverArt({ chapter }: { chapter: Chapter }) {
  const { lang } = useLang();
  const displayName = lang === "en" ? chapter.nameEn : chapter.name;

  return (
    <div className="hidden lg:flex w-[45%] h-full items-center justify-end relative">
      <div className="relative w-80 h-80 xl:w-100 xl:h-100 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group border border-white/10">
        <img
          src={asset(chapter.cover)}
          alt={displayName}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="flex justify-between items-start">
            <img
              src={asset(chapter.titleImage)}
              alt={displayName}
              className="h-6 opacity-60"
            />
            <span className="text-[10px] font-bold tracking-widest text-cyan-100 uppercase border border-cyan-400/30 bg-cyan-900/60 px-2 py-1 rounded backdrop-blur-md shadow-lg">
              {chapter.label}
            </span>
          </div>
          <div>
            <h2 className="text-4xl xl:text-5xl font-bold tracking-tighter text-white mb-2 drop-shadow-lg">
              {displayName}
            </h2>
            <p className="text-lg text-cyan-200/80 font-medium drop-shadow-md">
              {lang === "en" ? chapter.name : chapter.nameEn}
            </p>
          </div>
        </div>

        {/* 悬停反光 */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-x-full group-hover:translate-x-full ease-in-out" />
      </div>
    </div>
  );
}

export default CoverArt;
