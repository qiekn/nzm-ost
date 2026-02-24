import { useCallback, useRef } from "react";
import {
  PauseIcon,
  PlayIcon,
  SpeakerLowIcon,
  SpeakerNoneIcon,
  SpeakerHighIcon,
  MusicNoteIcon,
  SkipBackIcon,
  SkipForwardIcon,
  RepeatIcon,
  RepeatOnceIcon,
  ArrowsClockwiseIcon,
  QueueIcon,
} from "@phosphor-icons/react";
import type { PlayMode } from "../data/types";
import type {
  AudioPlayerState,
  AudioPlayerActions,
} from "../hooks/useAudioPlayer";
import { useLang } from "../i18n/context";
import type { TranslationKey } from "../i18n/zh";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const PLAY_MODE_CYCLE: PlayMode[] = ["sequential", "play-once", "repeat-all", "repeat-one"];

function PlayerBar({
  state,
  actions,
}: {
  state: AudioPlayerState;
  actions: AudioPlayerActions;
}) {
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const { t } = useLang();

  const progress =
    state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
  const hasTrack = state.currentTrack !== null;

  const seekFromEvent = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      const bar = progressRef.current;
      if (!bar || state.duration <= 0) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      actions.seek(ratio * state.duration);
    },
    [state.duration, actions],
  );

  const onProgressMouseDown = useCallback(
    (e: React.MouseEvent) => {
      draggingRef.current = true;
      seekFromEvent(e);

      const onMove = (ev: MouseEvent) => {
        if (draggingRef.current) seekFromEvent(ev);
      };
      const onUp = () => {
        draggingRef.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [seekFromEvent],
  );

  const VolumeIcon =
    state.volume === 0
      ? SpeakerNoneIcon
      : state.volume < 0.5
        ? SpeakerLowIcon
        : SpeakerHighIcon;

  const volumeFromEvent = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      const bar = volumeRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      actions.setVolume(ratio);
    },
    [actions],
  );

  const onVolumeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      volumeFromEvent(e);

      const onMove = (ev: MouseEvent) => volumeFromEvent(ev);
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [volumeFromEvent],
  );

  const cyclePlayMode = useCallback(() => {
    const idx = PLAY_MODE_CYCLE.indexOf(state.playMode);
    const next = PLAY_MODE_CYCLE[(idx + 1) % PLAY_MODE_CYCLE.length];
    actions.setPlayMode(next);
  }, [state.playMode, actions]);

  const PlayModeIcon =
    state.playMode === "repeat-one"
      ? RepeatOnceIcon
      : state.playMode === "repeat-all"
        ? RepeatIcon
        : state.playMode === "play-once"
          ? QueueIcon
          : ArrowsClockwiseIcon;

  const playModeActive = state.playMode !== "sequential";

  return (
    <footer className="w-full bg-black/60 backdrop-blur-2xl border-t border-white/10 z-30 pt-2 relative">
      {/* 进度条 */}
      <div
        ref={progressRef}
        onMouseDown={onProgressMouseDown}
        className="absolute top-0 left-0 w-full h-1 bg-white/10 group cursor-pointer hover:h-2 transition-all"
      >
        <div
          className="absolute left-0 top-0 h-full bg-accent shadow-[0_0_10px_rgba(242,206,134,0.8)] transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col p-4 md:flex-row items-center justify-between gap-4">
        {/* 左侧：歌曲信息 */}
        <div className="flex items-center gap-4 w-full md:w-1/3 pl-4 md:pl-0">
          <div className="w-12 h-12 bg-gray-900 rounded-md overflow-hidden shadow-md flex items-center justify-center relative border border-white/10">
            <MusicNoteIcon
              weight="fill"
              className="text-xl text-accent/80 drop-shadow-md"
            />
            <div className="absolute inset-0 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
          </div>
          <div className="truncate">
            <h4 className="text-white text-[15px] font-semibold tracking-tight truncate">
              {state.currentTrack?.title ?? t("player.noTrack")}
            </h4>
            <div className="flex items-center gap-2">
              <p className="text-[13px] text-gold/80 font-medium truncate">
                {state.segmentLabel
                  ? `${state.segmentLabel} — ${t("player.ostLabel")}`
                  : t("player.ostLabel")}
              </p>
              {hasTrack && (
                <span className="text-[11px] text-white/30 font-mono shrink-0">
                  {formatTime(state.currentTime)} / {formatTime(state.duration)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 中间：核心控制 */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="flex items-center gap-5">
            <button
              onClick={cyclePlayMode}
              title={t(`playmode.${state.playMode}` as TranslationKey)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all hover:bg-white/10 ${playModeActive ? "text-accent" : "text-white/40"}`}
            >
              <PlayModeIcon weight="bold" className="text-base" />
            </button>
            <button
              onClick={hasTrack ? actions.prev : undefined}
              className={`w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors ${!hasTrack ? "opacity-30 pointer-events-none" : ""}`}
            >
              <SkipBackIcon weight="fill" className="text-xl" />
            </button>
            <button
              onClick={hasTrack ? actions.togglePlay : undefined}
              className="w-12 h-12 flex items-center justify-center bg-gold text-black rounded-full hover:scale-105 hover:bg-gold-light active:scale-95 transition-all shadow-[0_0_15px_rgba(216,180,106,0.4)]"
            >
              {state.isPlaying ? (
                <PauseIcon weight="fill" className="text-2xl" />
              ) : (
                <PlayIcon weight="fill" className="text-2xl" />
              )}
            </button>
            <button
              onClick={hasTrack ? actions.next : undefined}
              className={`w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors ${!hasTrack ? "opacity-30 pointer-events-none" : ""}`}
            >
              <SkipForwardIcon weight="fill" className="text-xl" />
            </button>
            {/* 占位平衡 */}
            <div className="w-8 h-8" />
          </div>
        </div>

        {/* 右侧：音量 */}
        <div className="hidden md:flex items-center justify-end w-1/3 gap-5 text-white/60 pr-4 md:pr-0">
          <div className="flex items-center gap-2 group cursor-pointer w-28">
            <VolumeIcon
              weight="fill"
              className="text-lg text-white/40 shrink-0"
            />
            <div
              ref={volumeRef}
              onMouseDown={onVolumeMouseDown}
              className="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 h-full bg-white/80 rounded-full"
                style={{ width: `${state.volume * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PlayerBar;
