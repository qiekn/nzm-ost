import type { MapData } from "./types";

const BASE = "/soundtrack/jingjue";

export const jingjueData: MapData = {
  id: "jingjue",
  name: "精绝古城",
  nameEn: "Jingjue City",
  background: "/images/jingjue/jjnw.png",
  chapters: [
    // ========== A. 西夜古城 ==========
    {
      id: "relic",
      name: "西夜古城",
      nameEn: "Ancient Relic",
      label: "Chapter A",
      cover: "/images/jingjue/xygc.png",
      navImage: "/images/jingjue/xygc.png",
      titleImage: "/images/jingjue/xygc.png",
      tracks: [
        {
          id: "a-start-comics",
          title: "Opening Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/L06_JingJueCity_Start_Comics_VO.ogg`,
              layers: [`${BASE}/L06_JingJueCity_Start_Comics_SFX.ogg`],
            },
          ],
        },
        {
          id: "a-relic-op",
          title: "Relic Opening",
          tag: "cutscene",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_A_Relic_OP.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionA_Cutscene_SFX_OP.ogg`],
            },
          ],
        },
        {
          id: "a-relic-explore",
          title: "Relic Explore",
          tag: "explore",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_A_Relic_Explore.ogg`,
            },
          ],
        },
        {
          id: "a-relic-battle",
          title: "Relic Battle",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_A_Relic_Battle_level1_86bpm_44_Dm.ogg`,
            },
          ],
        },
        {
          id: "a-relic-guard",
          title: "Relic Guard",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_A_Relic_Guard_114bpm_44_Dm.ogg`,
            },
          ],
        },
        {
          id: "a-relic-ant-queen",
          title: "Ant Queen",
          tag: "boss",
          sources: [
            {
              segment: "standalone",
              stage: "Countdown",
              url: `${BASE}/L06_BGM_JingjueCity_A_Relic_AntJC_CountDown_105bpm_44_Cm.ogg`,
            },
            {
              segment: "spawn",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_A_Relic_Ant_Show.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionA_Cutscene_SFX_AntShow.ogg`],
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/L06_BGM_JingjueCity_A_Relic_Battle_AntJC_Stage01_180bpm_46_Dminor.ogg`,
            },
            {
              segment: "end",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_A_Relic_Ant_Dead.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionA_Cutscene_SFX_AntDie.ogg`],
            },
          ],
        },
      ],
    },

    // ========== B. 拉格拉玛山谷 ==========
    {
      id: "valley",
      name: "拉格拉玛山谷",
      nameEn: "Lagrama Valley",
      label: "Chapter B",
      cover: "/images/jingjue/lglmsg.png",
      navImage: "/images/jingjue/lglmsg.png",
      titleImage: "/images/jingjue/lglmsg.png",
      tracks: [
        {
          id: "b1-desert-explore",
          title: "Desert Explore",
          tag: "explore",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_B1_Desert_Explore.ogg`,
            },
          ],
        },
        {
          id: "b1-desert-battle",
          title: "Desert Battle",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_B1_Desert_Battle_level1.ogg`,
            },
          ],
        },
        {
          id: "b2-valley-explore",
          title: "Valley Explore",
          tag: "explore",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_B2_Valley_Explore.ogg`,
            },
          ],
        },
        {
          id: "b2-valley-battle",
          title: "Valley Battle",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_B2_Valley_Battle_Level1_90bpm_44_Em.ogg`,
            },
          ],
        },
        {
          id: "b2-valley-snake-king",
          title: "Giant Eye Snake King",
          tag: "boss",
          sources: [
            {
              segment: "standalone",
              stage: "Countdown",
              url: `${BASE}/L06_BGM_JingjueCity_B2_Valley_SnakeJC_CountDown.ogg`,
            },
            {
              segment: "spawn",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_B2_Valley_Snake_Show.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionB2_Cutscene_SFX_SnakeShow.ogg`],
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/L06_BGM_JingjueCity_B2_Relic_Battle_SnakeJC_Stage01_195bpm_46_Dm.ogg`,
            },
            {
              segment: "end",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_B2_Valley_Snake_Dead.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionB2_Cutscene_SFX_SnakeDie.ogg`],
            },
          ],
        },
      ],
    },

    // ========== C1. 柱之神殿 ==========
    {
      id: "temple",
      name: "柱之神殿",
      nameEn: "Pillar Temple",
      label: "Chapter C1",
      cover: "/images/jingjue/zzsd.png",
      navImage: "/images/jingjue/zzsd.png",
      titleImage: "/images/jingjue/zzsd.png",
      tracks: [
        {
          id: "c1-temple-explore",
          title: "Temple Explore",
          tag: "explore",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_C1_Temple_Explore.ogg`,
            },
          ],
        },
        {
          id: "c1-temple-battle",
          title: "Temple Battle",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_C1_Temple_Battle_level1_80bpm_44_Em.ogg`,
            },
          ],
        },
        {
          id: "c1-temple-guard",
          title: "Temple Guard",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_C1_Temple_Guard_114bpm_44_Am.ogg`,
            },
          ],
        },
        {
          id: "c1-temple-protect-wang",
          title: "Protect Wang",
          tag: "cutscene",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_C1_Temple_ProtectWang.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionC1_Cutscene_SFX_ProtectWang.ogg`],
            },
          ],
        },
        {
          id: "c1-temple-bishop",
          title: "High Bishop",
          tag: "boss",
          sources: [
            {
              segment: "standalone",
              stage: "Countdown",
              url: `${BASE}/L06_BGM_JingjueCity_C1_Temple_Bishop_CountDown.ogg`,
            },
            {
              segment: "spawn",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_C1_Temple_Bishop_Show.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionC1_Cutscene_SFX_BiShopShow.ogg`],
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/L06_BGM_JingjueCity_C1_Temple_Bishop_Stage01_168bpm_46_Dminor.ogg`,
            },
            {
              segment: "end",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_C1_Temple_Bishop_Dead.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionC1_Cutscene_SFX_BiShopDie.ogg`],
            },
          ],
        },
      ],
    },

    // ========== C2. 天砖密道 ==========
    {
      id: "hidden-path",
      name: "天砖密道",
      nameEn: "Hidden Path",
      label: "Chapter C2",
      cover: "/images/jingjue/tzmd.png",
      navImage: "/images/jingjue/tzmd.png",
      titleImage: "/images/jingjue/tzmd.png",
      tracks: [
        {
          id: "c2-enter-cutscene",
          title: "Enter Hidden Path",
          tag: "cutscene",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_C2_HiddenPath_Enter.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionC2_Cutscene_SFX_SecretPath.ogg`],
            },
          ],
        },
        {
          id: "c2-hidden-explore",
          title: "Hidden Path Explore",
          tag: "explore",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_C2_HiddenPath_Explore.ogg`,
            },
          ],
        },
        {
          id: "c2-hidden-battle",
          title: "Hidden Path Battle",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_C2_HiddenPath_Battle_level1_110bpm_44_Cm.ogg`,
            },
          ],
        },
        {
          id: "c2-hidden-guard",
          title: "Hidden Path Guard",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_C2_HiddenPath_Guard_101bpm_58_Cm.ogg`,
            },
          ],
        },
        {
          id: "c2-slavelord",
          title: "Slave Lord",
          tag: "boss",
          sources: [
            {
              segment: "standalone",
              stage: "Countdown",
              url: `${BASE}/L06_BGM_JingjueCity_C2_HiddenPath_SlaveLord_CountDown.ogg`,
            },
            {
              segment: "spawn",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_C2_HiddenPath_Slavelord_Show.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionC2_Cutscene_SFX_SlaveLordShow.ogg`],
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/L06_BGM_JingjueCity_C2_HiddenPath_Slavelord_Stage01_188bpm_46_Dminor.ogg`,
            },
            {
              segment: "end",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_C2_HiddenPath_Slavelord_Dead.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionC2_Cutscene_SFX_SlaveLordDie.ogg`],
            },
          ],
        },
      ],
    },

    // ========== D. 精绝地宫 ==========
    {
      id: "underground",
      name: "精绝地宫",
      nameEn: "Jingjue Underground",
      label: "Chapter D",
      cover: "/images/jingjue/jjdg.png",
      navImage: "/images/jingjue/jjdg.png",
      titleImage: "/images/jingjue/jjdg.png",
      tracks: [
        {
          id: "d-valley-explore",
          title: "Underground Explore",
          tag: "explore",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_D_Valley_Explore_101bpm_44_Cm.ogg`,
            },
          ],
        },
        {
          id: "d-valley-battle",
          title: "Underground Battle",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_D_Valley_Battle_level1.ogg`,
            },
          ],
        },
        {
          id: "d-valley-guard",
          title: "Underground Guard",
          tag: "battle",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_D_Valley_Guard_105bpm_44_Cm.ogg`,
            },
          ],
        },
        {
          id: "d-statue-nearing",
          title: "Statue Nearing",
          tag: "mechanic",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/L06_BGM_JingjueCity_D_Valley_Statue_Nearing_105bpm_44_Am.ogg`,
            },
          ],
        },
        {
          id: "d-corpse-flower",
          title: "Corpse Flower",
          tag: "boss",
          sources: [
            {
              segment: "standalone",
              stage: "Countdown",
              url: `${BASE}/L06_BGM_JingjueCity_D_Valley_FlowerJC_CountDown.ogg`,
            },
            {
              segment: "spawn",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_D_Valley_FlowerJC_Show.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionD_Cutscene_SFX_FlowerShow.ogg`],
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/L06_BGM_JingjueCity_D_Valley_FlowerJC_Stage01_161bpm_46.ogg`,
            },
          ],
        },
        {
          id: "d-jingjue-queen",
          title: "Jingjue Queen",
          tag: "boss",
          sources: [
            {
              segment: "spawn",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_D_Valley_JJQueen_Show.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMission_Cutscene_SFX_JJQueen_Enter.ogg`],
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/L06_BGM_JingjueCity_D_Valley_JJQueen_Stage01_180bpm_46.ogg`,
            },
            {
              segment: "transition",
              url: `${BASE}/L06_Cutscene_BGM_JingjueCity_D_Valley_JJQueen_Trans.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMission_Cutscene_SFX_JJQueen_Combet.ogg`],
            },
            {
              segment: "loop",
              stage: "Stage 02",
              url: `${BASE}/L06_BGM_JingjueCity_D_Valley_JJQueen_Stage02_188bpm_46.ogg`,
            },
            {
              segment: "end",
              url: `${BASE}/L06_Cutscene_BGM_JingjueCity_D_Valley_JJQueen_Dead.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMission_Cutscene_SFX_JJQueen_Leave.ogg`],
            },
          ],
        },
        {
          id: "d-queen-show-loop",
          title: "Sands of Destiny",
          tag: "character",
          sources: [
            {
              segment: "loop",
              url: `${BASE}/BGM_Lobby_2000044_Queen_Show_Loop.ogg`,
            },
          ],
        },
        {
          id: "d-keep-moving",
          title: "Keep Moving",
          tag: "cutscene",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/L06_Cutscene_BGM_JingJueCity_D_Valley_KeepMoving.ogg`,
              layers: [`${BASE}/L06_JingJueCity_StoryMissionD_Cutscene_SFX_KeepMoving.ogg`],
            },
          ],
        },
        {
          id: "d-end-comics",
          title: "Ending Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/L06_JingJueCity_End_Comics_VO.ogg`,
              layers: [`${BASE}/L06_JingJueCity_End_Comics_SFX.ogg`],
            },
          ],
        },
      ],
    },
  ],
};
