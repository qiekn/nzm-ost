import type { Chapter } from "../data/types";
import { asset } from "../utils/asset";

function ChapterNav({
  chapters,
  activeIndex,
  onSelect,
}: {
  chapters: Chapter[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <aside className="h-full flex flex-col gap-1 py-4 pr-1 shrink-0 overflow-hidden">
      {chapters.map((chapter, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={chapter.id}
            onClick={() => onSelect(i)}
            className={`group/item relative flex items-center cursor-pointer flex-1 overflow-hidden rounded-sm transition-[filter] duration-300 ease-in-out`}
          >
            {/* 竖排章节名 */}
            <div className="relative w-10 shrink-0 z-1 h-full flex items-center justify-center">
              <div
                className={`absolute inset-0 bg-[#191a21] opacity-0 group-hover/nav:opacity-100 group-hover/item:opacity-0 transition-opacity duration-300 ${isActive ? "group-hover/nav:opacity-0!" : ""}`}
              />
              <div
                className={`absolute inset-0 opacity-0 bg-linear-to-b from-gold-dim via-gold/20 to-gold-dim transition-opacity duration-300 group-hover/item:opacity-100 ${isActive ? "group-hover/nav:opacity-100" : ""}`}
              />
              <span
                className={`relative text-vertical-nav leading-10 text-center text-base font-bold whitespace-nowrap transition-all duration-300
                  ${isActive ? "text-gradient-gold group-hover/nav:text-gradient-white" : "text-gradient-gray group-hover/item:text-gradient-white"}
                `}
              >
                {chapter.name}
              </span>
            </div>

            {/* 地图缩略图 */}
            <div className="w-0 group-hover/nav:w-70 h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out">
              <img
                src={asset(chapter.navImage)}
                alt={chapter.name}
                className="w-70 h-full object-cover object-center block"
              />
            </div>
          </div>
        );
      })}
    </aside>
  );
}

export default ChapterNav;
