import { useCallback, useEffect, useRef, useState } from "react";
import { kunlunData } from "./data/kunlun";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { LangProvider } from "./i18n/context";
import Header from "./components/Header";
import ChapterNav from "./components/ChapterNav";
import CoverArt from "./components/CoverArt";
import TrackList from "./components/TrackList";
import PlayerBar from "./components/PlayerBar";

function App() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mapData = kunlunData;
  const activeChapter = mapData.chapters[activeChapterIndex];

  const [state, actions] = useAudioPlayer();

  useEffect(() => {
    actions.setTracks(activeChapter.tracks);
  }, [activeChapter.tracks, actions.setTracks]);

  const handleVideoCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  function handleChapterClick(index: number) {
    if (index !== activeChapterIndex) {
      actions.stop();
      setActiveChapterIndex(index);
    }
  }

  return (
    <LangProvider>
    <div className="bg-[#0a0a0a] text-gray-50 h-screen w-screen overflow-hidden flex flex-col relative">
      {/* 背景：静态图 + 视频 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <img
          src="/images/background_s0.jpg"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-700 ${videoReady ? "opacity-0" : ""}`}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={handleVideoCanPlay}
          className={`absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ${videoReady ? "opacity-80" : ""}`}
        >
          <source src="/videos/Background_S1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/30 backdrop-blur-[2px]" />
      </div>

      {/* 顶部导航 */}
      <Header />

      {/* 核心区域 */}
      <main className="flex-1 flex w-full relative z-10 overflow-hidden">
        {/* 左侧 hover 感应区 + 章节导航 */}
        <div className="group/nav h-full flex shrink-0">
          <div className="w-4 md:w-10 lg:w-20 shrink-0" />
          <ChapterNav
            chapters={mapData.chapters}
            activeIndex={activeChapterIndex}
            onSelect={handleChapterClick}
          />
        </div>

        {/* 右侧播放器面板 */}
        <section className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 lg:px-12 relative">
          {/* 专辑封面 */}
          <CoverArt chapter={activeChapter} />

          {/* 曲目列表 */}
          <TrackList chapter={activeChapter} state={state} actions={actions} />
        </section>
      </main>

      {/* 底部播放控制栏 */}
      <PlayerBar state={state} actions={actions} />
    </div>
    </LangProvider>
  );
}

export default App;
