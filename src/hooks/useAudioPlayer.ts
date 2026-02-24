import { useCallback, useEffect, useRef, useState } from "react";
import type { PlayMode, Track, TrackSource } from "../data/types";

const VOLUME_KEY = "nzm-ost-volume";
const PLAY_MODE_KEY = "nzm-ost-play-mode";
const FADE_DURATION = 800; // ms

function loadVolume(): number {
  try {
    const v = localStorage.getItem(VOLUME_KEY);
    if (v !== null) return Math.max(0, Math.min(1, Number(v)));
  } catch {
    /* ignore */
  }
  return 0.8;
}

function loadPlayMode(): PlayMode {
  try {
    const v = localStorage.getItem(PLAY_MODE_KEY);
    if (v === "sequential" || v === "play-once" || v === "repeat-one" || v === "repeat-all") return v;
  } catch {
    /* ignore */
  }
  return "sequential";
}

function formatSourceLabel(source: TrackSource): string {
  if (source.stage) return source.stage;
  return source.segment.charAt(0).toUpperCase() + source.segment.slice(1);
}

export interface AudioPlayerState {
  currentTrack: Track | null;
  currentSource: TrackSource | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  segmentLabel: string;
  playMode: PlayMode;
  currentTrackIndex: number;
  currentSourceIndex: number;
}

export interface AudioPlayerActions {
  playSource: (track: Track, source: TrackSource) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  setPlayMode: (mode: PlayMode) => void;
  setTracks: (tracks: Track[]) => void;
}

export function useAudioPlayer(): [AudioPlayerState, AudioPlayerActions] {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentSource, setCurrentSource] = useState<TrackSource | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(loadVolume);
  const [segmentLabel, setSegmentLabel] = useState("");
  const [playMode, setPlayModeState] = useState<PlayMode>(loadPlayMode);
  const [tracks, setTracksState] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(-1);

  const primaryRef = useRef<HTMLAudioElement | null>(null);
  const layerAudiosRef = useRef<HTMLAudioElement[]>([]);
  const rafRef = useRef(0);
  const fadingRef = useRef(false);
  const fadeTimerRef = useRef(0);

  // Refs to avoid stale closures in ended handler
  const tracksRef = useRef<Track[]>([]);
  const trackIndexRef = useRef(-1);
  const sourceIndexRef = useRef(-1);
  const playModeRef = useRef<PlayMode>(playMode);
  const currentTrackRef = useRef<Track | null>(null);
  const volumeRef = useRef(volume);

  // Keep refs in sync
  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);
  useEffect(() => {
    trackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);
  useEffect(() => {
    sourceIndexRef.current = currentSourceIndex;
  }, [currentSourceIndex]);
  useEffect(() => {
    playModeRef.current = playMode;
  }, [playMode]);
  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // --- Layer audio helpers ---
  const stopLayers = useCallback(() => {
    layerAudiosRef.current.forEach((a) => {
      a.pause();
      a.src = "";
    });
    layerAudiosRef.current = [];
  }, []);

  const setLayersVolume = useCallback((v: number) => {
    layerAudiosRef.current.forEach((a) => {
      a.volume = v;
    });
  }, []);

  const pauseLayers = useCallback(() => {
    layerAudiosRef.current.forEach((a) => a.pause());
  }, []);

  const resumeLayers = useCallback(() => {
    layerAudiosRef.current.forEach((a) => a.play().catch(() => {}));
  }, []);

  const startLayers = useCallback(
    (source: TrackSource, vol: number) => {
      stopLayers();
      if (!source.layers || source.layers.length === 0) return;
      const audios = source.layers.map((url) => {
        const a = new Audio();
        a.preload = "auto";
        a.src = url;
        a.volume = vol;
        return a;
      });
      layerAudiosRef.current = audios;
      audios.forEach((a) => a.play().catch(() => {}));
    },
    [stopLayers],
  );

  // Create audio element once
  useEffect(() => {
    primaryRef.current = new Audio();
    primaryRef.current.preload = "auto";
    return () => {
      primaryRef.current?.pause();
      primaryRef.current = null;
      stopLayers();
      cancelAnimationFrame(rafRef.current);
      clearInterval(fadeTimerRef.current);
    };
  }, [stopLayers]);

  // Sync volume to audio element and layer audios
  useEffect(() => {
    if (!fadingRef.current) {
      if (primaryRef.current) primaryRef.current.volume = volume;
      setLayersVolume(volume);
    }
  }, [volume, setLayersVolume]);

  // rAF progress polling
  const startProgressPolling = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    let lastUpdate = 0;
    const poll = (now: number) => {
      if (now - lastUpdate > 66) {
        const audio = primaryRef.current;
        if (audio) {
          setCurrentTime(audio.currentTime);
          setDuration(audio.duration || 0);
        }
        lastUpdate = now;
      }
      rafRef.current = requestAnimationFrame(poll);
    };
    rafRef.current = requestAnimationFrame(poll);
  }, []);

  const stopProgressPolling = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  // Cancel any ongoing fade
  const cancelFade = useCallback(() => {
    clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = 0;
    fadingRef.current = false;
    const audio = primaryRef.current;
    if (audio) audio.volume = volumeRef.current;
    setLayersVolume(volumeRef.current);
  }, [setLayersVolume]);

  // Apply state updates for a new track+source
  const applyTrackState = useCallback(
    (track: Track, source: TrackSource, trackIdx: number, sourceIdx: number) => {
      setCurrentTrack(track);
      setCurrentSource(source);
      setSegmentLabel(formatSourceLabel(source));
      setIsPlaying(true);
      setCurrentTrackIndex(trackIdx);
      setCurrentSourceIndex(sourceIdx);
      trackIndexRef.current = trackIdx;
      sourceIndexRef.current = sourceIdx;
      currentTrackRef.current = track;
      startProgressPolling();
    },
    [startProgressPolling],
  );

  // Core helper: play a specific track+source by index with fade-in
  const playByIndex = useCallback(
    (trackIdx: number, sourceIdx: number) => {
      cancelFade();
      stopLayers();
      const audio = primaryRef.current;
      const trks = tracksRef.current;
      if (!audio || trackIdx < 0 || trackIdx >= trks.length) return;

      const track = trks[trackIdx];
      if (sourceIdx < 0 || sourceIdx >= track.sources.length) return;

      const source = track.sources[sourceIdx];
      const targetVolume = volumeRef.current;
      const step = 16; // ~60fps interval

      fadingRef.current = true;
      audio.src = source.url;
      audio.volume = 0;
      audio.play().catch(() => {});
      startLayers(source, 0);
      applyTrackState(track, source, trackIdx, sourceIdx);

      // Fade in
      const startTime = performance.now();
      fadeTimerRef.current = window.setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / FADE_DURATION);
        const vol = targetVolume * progress;
        audio.volume = vol;
        setLayersVolume(vol);
        if (progress >= 1) {
          clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = 0;
          fadingRef.current = false;
          audio.volume = targetVolume;
          setLayersVolume(targetVolume);
        }
      }, step);
    },
    [cancelFade, stopLayers, startLayers, setLayersVolume, applyTrackState],
  );

  // Handle ended event — core auto-advance logic
  useEffect(() => {
    const audio = primaryRef.current;
    if (!audio) return;

    const onEnded = () => {
      if (fadingRef.current) return;

      const mode = playModeRef.current;
      const trks = tracksRef.current;
      const tIdx = trackIndexRef.current;
      const sIdx = sourceIndexRef.current;

      if (tIdx < 0 || tIdx >= trks.length) {
        setIsPlaying(false);
        stopProgressPolling();
        stopLayers();
        return;
      }

      if (mode === "repeat-one") {
        // Single source repeat: replay current source
        audio.currentTime = 0;
        audio.play().catch(() => {});
        // Restart layer audios for repeat
        const source = trks[tIdx].sources[sIdx];
        if (source) startLayers(source, volumeRef.current);
        return;
      }

      if (mode === "sequential") {
        // Sequential: stop after current source ends
        setIsPlaying(false);
        stopProgressPolling();
        stopLayers();
        return;
      }

      // play-once / repeat-all: auto-advance with fade
      const track = trks[tIdx];
      const nextSourceIdx = sIdx + 1;
      if (nextSourceIdx < track.sources.length) {
        // Next source within same track
        playByIndex(tIdx, nextSourceIdx);
      } else {
        // Track done → next track
        const nextTrackIdx = tIdx + 1;
        if (nextTrackIdx < trks.length) {
          playByIndex(nextTrackIdx, 0);
        } else if (mode === "repeat-all") {
          // Wrap around to first track
          playByIndex(0, 0);
        } else {
          // play-once: stop at end of list
          setIsPlaying(false);
          stopProgressPolling();
          stopLayers();
        }
      }
    };

    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [playByIndex, stopProgressPolling, stopLayers, startLayers]);

  const playSource = useCallback(
    (track: Track, source: TrackSource) => {
      const audio = primaryRef.current;
      if (!audio) return;

      // If clicking the same source that's currently playing, toggle play/pause
      if (
        currentTrackRef.current?.id === track.id &&
        sourceIndexRef.current >= 0
      ) {
        const trk = currentTrackRef.current;
        const curSrc = trk.sources[sourceIndexRef.current];
        if (curSrc && curSrc.url === source.url) {
          if (audio.paused) {
            audio.play().catch(() => {});
            resumeLayers();
            setIsPlaying(true);
            startProgressPolling();
          } else {
            audio.pause();
            pauseLayers();
            setIsPlaying(false);
            stopProgressPolling();
          }
          return;
        }
      }

      // Resolve indices from the tracks list
      const trks = tracksRef.current;
      const tIdx = trks.findIndex((t) => t.id === track.id);
      let sIdx = -1;
      if (tIdx >= 0) {
        sIdx = trks[tIdx].sources.findIndex((s) => s.url === source.url);
      }

      if (tIdx >= 0 && sIdx >= 0) {
        playByIndex(tIdx, sIdx);
      } else {
        // Track not in current tracks list — play directly with fade-in
        cancelFade();
        stopLayers();
        fadingRef.current = true;

        const targetVolume = volumeRef.current;
        const step = 16;

        audio.src = source.url;
        audio.volume = 0;
        audio.play().catch(() => {});
        startLayers(source, 0);

        setCurrentTrack(track);
        setCurrentSource(source);
        setSegmentLabel(formatSourceLabel(source));
        setIsPlaying(true);
        setCurrentTrackIndex(-1);
        setCurrentSourceIndex(-1);
        trackIndexRef.current = -1;
        sourceIndexRef.current = -1;
        currentTrackRef.current = track;
        startProgressPolling();

        const startTime = performance.now();
        fadeTimerRef.current = window.setInterval(() => {
          const elapsed = performance.now() - startTime;
          const progress = Math.min(1, elapsed / FADE_DURATION);
          const vol = targetVolume * progress;
          audio.volume = vol;
          setLayersVolume(vol);
          if (progress >= 1) {
            clearInterval(fadeTimerRef.current);
            fadeTimerRef.current = 0;
            fadingRef.current = false;
            audio.volume = targetVolume;
            setLayersVolume(targetVolume);
          }
        }, step);
      }
    },
    [playByIndex, cancelFade, stopLayers, startLayers, setLayersVolume, startProgressPolling, stopProgressPolling],
  );

  const next = useCallback(() => {
    const trks = tracksRef.current;
    const tIdx = trackIndexRef.current;
    if (trks.length === 0 || tIdx < 0) return;

    const nextIdx = tIdx + 1;
    if (nextIdx < trks.length) {
      playByIndex(nextIdx, 0);
    } else if (playModeRef.current === "repeat-all") {
      playByIndex(0, 0);
    }
  }, [playByIndex]);

  const prev = useCallback(() => {
    const trks = tracksRef.current;
    const tIdx = trackIndexRef.current;
    if (trks.length === 0 || tIdx < 0) return;

    const audio = primaryRef.current;
    // 3-second rule: if played >3s, restart current track
    if (audio && audio.currentTime > 3) {
      playByIndex(tIdx, 0);
      return;
    }

    const prevIdx = tIdx - 1;
    if (prevIdx >= 0) {
      playByIndex(prevIdx, 0);
    } else if (playModeRef.current === "repeat-all") {
      playByIndex(trks.length - 1, 0);
    } else {
      playByIndex(tIdx, 0);
    }
  }, [playByIndex]);

  const togglePlay = useCallback(() => {
    const audio = primaryRef.current;
    if (!audio || !currentTrackRef.current) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      resumeLayers();
      setIsPlaying(true);
      startProgressPolling();
    } else {
      audio.pause();
      pauseLayers();
      setIsPlaying(false);
      stopProgressPolling();
    }
  }, [startProgressPolling, stopProgressPolling, resumeLayers, pauseLayers]);

  const seek = useCallback((time: number) => {
    const audio = primaryRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
    setCurrentTime(audio.currentTime);
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (!fadingRef.current) {
      if (primaryRef.current) primaryRef.current.volume = clamped;
      setLayersVolume(clamped);
    }
    try {
      localStorage.setItem(VOLUME_KEY, String(clamped));
    } catch {
      /* ignore */
    }
  }, [setLayersVolume]);

  const setPlayMode = useCallback((mode: PlayMode) => {
    setPlayModeState(mode);
    playModeRef.current = mode;
    try {
      localStorage.setItem(PLAY_MODE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, []);

  const stop = useCallback(() => {
    cancelFade();
    stopLayers();
    const audio = primaryRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
    }
    setCurrentTrack(null);
    setCurrentSource(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setSegmentLabel("");
    setCurrentTrackIndex(-1);
    setCurrentSourceIndex(-1);
    trackIndexRef.current = -1;
    sourceIndexRef.current = -1;
    currentTrackRef.current = null;
    stopProgressPolling();
  }, [cancelFade, stopLayers, stopProgressPolling]);

  const setTracks = useCallback((newTracks: Track[]) => {
    setTracksState(newTracks);
    tracksRef.current = newTracks;
  }, []);

  const state: AudioPlayerState = {
    currentTrack,
    currentSource,
    isPlaying,
    currentTime,
    duration,
    volume,
    segmentLabel,
    playMode,
    currentTrackIndex,
    currentSourceIndex,
  };

  const actions: AudioPlayerActions = {
    playSource,
    togglePlay,
    seek,
    setVolume,
    stop,
    next,
    prev,
    setPlayMode,
    setTracks,
  };

  return [state, actions];
}
