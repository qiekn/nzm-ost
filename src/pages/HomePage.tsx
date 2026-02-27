import { Link } from "react-router-dom";
import { useLang } from "../i18n/context";
import { asset } from "../utils/asset";
import Header from "../components/Header";

interface MapCard {
  id: string;
  name: string;
  nameEn: string;
  path: string;
  cover: string;
}

const maps: MapCard[] = [
  {
    id: "kunlun",
    name: "昆仑神宫",
    nameEn: "Kunlun Palace",
    path: "/klsg",
    cover: "/images/map_2k_klsg.png",
  },
  {
    id: "jingjue",
    name: "精绝古城",
    nameEn: "Jingjue City",
    path: "/jjgc",
    cover: "/images/map_2k_jjgc.png",
  },
];

function HomePage() {
  const { lang } = useLang();

  return (
    <div className="bg-[#0a0a0a] text-gray-50 h-screen w-screen overflow-hidden flex flex-col relative">
      {/* 背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <img
          src={asset("/images/background_s0.jpg")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/30" />
      </div>

      {/* 顶部导航 */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* 地图选择 */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white/90 tracking-wide mb-2">
          {lang === "zh" ? "选择专辑" : "Select Album"}
        </h2>
        <p className="text-sm text-white/40 mb-10">
          {lang === "zh" ? "《鬼吹灯》联动赛季原声带" : "Ghost Blows Out the Light OST"}
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-4xl justify-center">
          {maps.map((map) => (
            <Link
              key={map.id}
              to={map.path}
              className="group relative flex-1 max-w-md mx-auto w-full rounded-2xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_80px_rgba(216,180,106,0.15)]"
            >
              {/* 封面图 */}
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={asset(map.cover)}
                  alt={lang === "en" ? map.nameEn : map.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* 悬停反光 */}
              <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </Link>
          ))}
        </div>
      </main>

      {/* 底部 */}
      <footer className="relative z-10 py-4 text-center text-white/20 text-xs">
        nzm-ost
      </footer>
    </div>
  );
}

export default HomePage;
