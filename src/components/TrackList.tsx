import { useState } from "react";
import { PauseIcon, PlayIcon, CaretDownIcon } from "@phosphor-icons/react";
import type { Chapter, TrackSource, TrackTag } from "../data/types";
import type {
  AudioPlayerState,
  AudioPlayerActions,
} from "../hooks/useAudioPlayer";
import { useLang } from "../i18n/context";
import type { TranslationKey } from "../i18n/zh";

// prettier-ignore
const TAG_STYLES: Record< TrackTag, { key: TranslationKey; bg: string; text: string } > = {
  explore:   { key: "tag.explore"  , bg: "bg-blue/10      ", text: "text-blue/60   " },
  battle:    { key: "tag.battle"   , bg: "bg-orange-500/20", text: "text-orange-400" },
  boss:      { key: "tag.boss"     , bg: "bg-red-500/30   ", text: "text-red-300   " },
  mechanic:  { key: "tag.mechanic" , bg: "bg-purple-500/20", text: "text-purple-400" },
  cutscene:  { key: "tag.cutscene" , bg: "bg-blue-500/20  ", text: "text-blue-400  " },
  comics:    { key: "tag.comics"   , bg: "bg-teal-500/20  ", text: "text-teal-400  " },
  countdown: { key: "tag.countdown", bg: "bg-yellow-500/20", text: "text-yellow-400" },
};

const SEGMENT_COLORS: Record<string, string> = {
  intro: "text-emerald-400",
  loop: "text-accent",
  end: "text-orange-400",
  transition: "text-purple-400",
  standalone: "text-white/70",
  spawn: "text-blue-400",
  cutscene: "text-sky-400",
};

function formatSegmentName(source: TrackSource): string {
  if (source.stage) return source.stage;
  return source.segment.charAt(0).toUpperCase() + source.segment.slice(1);
}

function TrackList({
  chapter,
  state,
  actions,
}: {
  chapter: Chapter;
  state: AudioPlayerState;
  actions: AudioPlayerActions;
}) {
  const [expandedTrackId, setExpandedTrackId] = useState<string | null>(null);
  const { t } = useLang();

  function toggleExpand(trackId: string) {
    setExpandedTrackId((prev) => (prev === trackId ? null : trackId));
  }

  return (
    <div className="w-full lg:w-[55%] h-full flex flex-col justify-center py-6">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white tracking-wide">
          {t("tracklist.title")}
        </h3>
        <span className="text-sm text-white/40">
          {chapter.tracks.length} {t("tracklist.tracks")}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pr-2 lg:pr-6 mask-image-y">
        <ul className="flex flex-col py-4">
          {chapter.tracks.map((track, i) => {
            const isExpanded = expandedTrackId === track.id;
            const isActiveTrack = state.currentTrack?.id === track.id;
            const tagStyle = TAG_STYLES[track.tag];

            return (
              <li key={track.id} className="mb-1">
                {/* Track header row */}
                <div
                  onClick={() => toggleExpand(track.id)}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors
                    ${isExpanded ? "bg-white/10 backdrop-blur-md border border-white/10" : "hover:bg-white/10 group"}
                  `}
                >
                  <span className="w-8 flex justify-center items-center">
                    {isActiveTrack && state.isPlaying ? (
                      <span className="flex items-end gap-0.5 h-4">
                        <div className="w-0.75 bg-accent rounded-t-sm h-full eq-bar shadow-[0_0_8px_rgba(242,206,134,0.6)]" />
                        <div className="w-0.75 bg-accent rounded-t-sm h-full eq-bar shadow-[0_0_8px_rgba(242,206,134,0.6)]" />
                        <div className="w-0.75 bg-accent rounded-t-sm h-full eq-bar shadow-[0_0_8px_rgba(242,206,134,0.6)]" />
                        <div className="w-0.75 bg-accent rounded-t-sm h-full eq-bar shadow-[0_0_8px_rgba(242,206,134,0.6)]" />
                      </span>
                    ) : (
                      <span
                        className={`text-sm font-medium ${isActiveTrack ? "text-accent" : "text-white/30 group-hover:text-white/60"}`}
                      >
                        {i + 1}
                      </span>
                    )}
                  </span>
                  <div
                    className={`flex-1 ml-3 ${!isExpanded ? "border-b border-white/5 group-hover:border-transparent" : ""} pb-2 pt-1 transition-colors`}
                  >
                    <h3
                      className={`text-[15px] font-semibold tracking-wide ${isActiveTrack ? "text-accent font-bold drop-shadow-md" : "text-white/90"}`}
                    >
                      {track.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 ${tagStyle.bg} ${tagStyle.text} ${isExpanded ? "border border-current/20" : ""} rounded-sm uppercase tracking-wider`}
                      >
                        {t(tagStyle.key)}
                      </span>
                      <span className="text-[11px] text-white/40 font-mono">
                        {track.sources.length} {t("tracklist.segments")}
                      </span>
                    </div>
                  </div>
                  <CaretDownIcon
                    weight="bold"
                    className={`text-white/30 text-sm transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>

                {/* Expanded segment list */}
                {isExpanded && (
                  <div className="ml-11 mr-2 mt-1 mb-2 flex flex-col gap-0.5">
                    {track.sources.map((source, si) => {
                      const isActiveSource =
                        isActiveTrack &&
                        state.currentSource?.url === source.url;
                      const segColor =
                        SEGMENT_COLORS[source.segment] ?? "text-white/70";

                      return (
                        <div
                          key={si}
                          onClick={() => actions.playSource(track, source)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
                            ${isActiveSource ? "bg-white/10" : "hover:bg-white/5"}
                          `}
                        >
                          <span className="w-5 flex justify-center">
                            {isActiveSource && state.isPlaying ? (
                              <PauseIcon
                                weight="fill"
                                className="text-accent text-xs"
                              />
                            ) : (
                              <PlayIcon
                                weight="fill"
                                className={`text-xs ${isActiveSource ? "text-accent" : "text-white/20"}`}
                              />
                            )}
                          </span>
                          <span
                            className={`text-[13px] font-medium ${isActiveSource ? "text-accent" : "text-white/80"}`}
                          >
                            {formatSegmentName(source)}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-wider ${segColor}`}
                          >
                            {source.segment}
                          </span>
                          {source.segment === "loop" && (
                            <span className="text-[9px] text-accent/50 font-mono">
                              ∞
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TrackList;
