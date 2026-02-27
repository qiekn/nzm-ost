export type PlayMode = "sequential" | "play-once" | "repeat-one" | "repeat-all"

export type TrackSegment = "intro" | "loop" | "end" | "transition" | "standalone" | "spawn" | "cutscene"

export interface TrackSource {
  segment: TrackSegment
  /** 如 "Stage 01"、"Stage 02" 等，用于多阶段 boss 战 */
  stage?: string
  url: string
  /** 叠加音轨（如 SFX），与 url 同时播放 */
  layers?: string[]
}

export type TrackTag = "explore" | "battle" | "boss" | "mechanic" | "cutscene" | "comics" | "countdown" | "character"

export interface Track {
  id: string
  title: string
  tag: TrackTag
  sources: TrackSource[]
}

export interface Chapter {
  id: string
  name: string
  nameEn: string
  /** 章节序号标签，如 "Chapter A" */
  label: string
  /** 章节封面图 */
  cover: string
  /** 左侧导航缩略图 */
  navImage: string
  /** 章节标题图片 */
  titleImage: string
  tracks: Track[]
}

export interface MapData {
  id: string
  name: string
  nameEn: string
  /** 播放页静态背景图（可选，默认使用通用背景） */
  background?: string
  /** 播放页背景视频（可选，加载完成后替换背景图） */
  backgroundVideo?: string
  chapters: Chapter[]
}
