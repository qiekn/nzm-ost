export const zh = {
  // Header
  "header.title": "OST ARCHIVE",
  "header.season": "《鬼吹灯》联动赛季",
  "header.logoAlt": "逆战：未来",

  // TrackList
  "tag.explore": "探索",
  "tag.battle": "战斗",
  "tag.boss": "首领战",
  "tag.mechanic": "场景机制",
  "tag.cutscene": "过场",
  "tag.comics": "漫画",
  "tag.countdown": "倒计时",
  "tag.character": "角色曲",
  "tracklist.title": "Soundtrack List",
  "tracklist.tracks": "Tracks",
  "tracklist.segments": "segments",

  // PlayerBar
  "player.noTrack": "未选择曲目",
  "player.ostLabel": "昆仑神宫 OST",
  "playmode.sequential": "播完暂停",
  "playmode.play-once": "顺序播放",
  "playmode.repeat-all": "列表循环",
  "playmode.repeat-one": "单曲循环",
} as const

export type TranslationKey = keyof typeof zh
