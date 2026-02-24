import type { MapData } from "./types";

const BASE = "/soundtrack/kunlun";

export const kunlunData: MapData = {
  id: "kunlun",
  name: "昆仑神宫",
  nameEn: "Kunlun Palace",
  chapters: [
    // ========== A. 龙顶冰川 ==========
    {
      id: "dragon-peak",
      name: "龙顶冰川",
      nameEn: "Dragon Peak Glacier",
      label: "Chapter A",
      cover: "/images/kunlun/map_2k_kunlun.png",
      navImage: "/images/kunlun/map_2k_kunlun.png",
      titleImage: "/images/kunlun/title_klsg.png",
      tracks: [
        // 龙顶冰川开篇漫画
        {
          id: "b-glacier-open-comics",
          title: "Glacier Opening Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_KunLun_A_Glacier_Comics_VO.ogg`,
              layers: [`${BASE}/LM02_KunLun_A_Glacier_Comics_SFX.ogg`],
            },
          ],
        },
        {
          id: "a-glacier-explore",
          title: "Glacier Explore",
          tag: "explore",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/A_DragonPeak_Glacier_Explore_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/A_DragonPeak_Glacier_Explore_Loop.ogg`,
            },
          ],
        },
        {
          id: "a-glacier-battle-lv1",
          title: "Glacier Battle Level 1",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/A_DragonPeak_Glacier_Battle_level1_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/A_DragonPeak_Glacier_Battle_level1_Loop.ogg`,
            },
          ],
        },
        {
          id: "a-glacier-battle-lv2",
          title: "Glacier Battle Level 2",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/A_DragonPeak_Glacier_Battle_level2_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/A_DragonPeak_Glacier_Battle_level2_Loop.ogg`,
            },
          ],
        },
        {
          id: "a-altar",
          title: "Dragon Peak Altar",
          tag: "mechanic",
          sources: [
            { segment: "intro", url: `${BASE}/A_DragonPeak_Altar_Intro.ogg` },
            { segment: "loop", url: `${BASE}/A_DragonPeak_Altar_Loop.ogg` },
            { segment: "end", url: `${BASE}/A_DragonPeak_Altar_End.ogg` },
          ],
        },
        {
          id: "a-icecave-explore",
          title: "Ice Cave Explore",
          tag: "explore",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/A_DragonPeak_IceCave_Explore_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/A_DragonPeak_IceCave_Explore_Loop.ogg`,
            },
          ],
        },
        {
          id: "a-icecave-battle-lv1",
          title: "Ice Cave Battle Level 1",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/A_DragonPeak_IceCave_Battle_level1_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/A_DragonPeak_IceCave_Battle_level1_Loop.ogg`,
            },
          ],
        },
        {
          id: "a-icecave-battle-lv2",
          title: "Ice Cave Battle Level 2",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/A_DragonPeak_IceCave_Battle_level2_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/A_DragonPeak_IceCave_Battle_level2_Loop.ogg`,
            },
          ],
        },
        {
          id: "a-icecave-boss-stage1",
          title: "Ice Cave Boss Stage 01",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              stage: "Stage 01",
              url: `${BASE}/A_DragonPeak_Battle_IceCave_Stage01_Intro.ogg`,
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/A_DragonPeak_Battle_IceCave_Stage01_Loop.ogg`,
            },
          ],
        },
        {
          id: "a-icecave-boss-stage2",
          title: "Ice Cave Boss Stage 02",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              stage: "Stage 02",
              url: `${BASE}/A_DragonPeak_Battle_IceCave_Stage02_Intro.ogg`,
            },
            {
              segment: "loop",
              stage: "Stage 02",
              url: `${BASE}/A_DragonPeak_Battle_IceCave_Stage02_Loop.ogg`,
            },
          ],
        },
      ],
    },

    // ========== B1. 九层妖塔 ==========
    {
      id: "tower",
      name: "九层妖塔",
      nameEn: "Nine-Story Demon Tower",
      label: "Chapter B1",
      cover: "/images/kunlun/map_2k_jcyt.png",
      navImage: "/images/kunlun/map_2k_jcyt.png",
      titleImage: "/images/kunlun/title_jcyt.png",
      tracks: [
        // 九层妖塔开篇漫画
        {
          id: "b-tower-open-comics",
          title: "Tower Opening Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_KunLun_B1_Tower_Comics_VO.ogg`,
              layers: [`${BASE}/LM02_KunLun_B1_Tower_Comics_SFX.ogg`],
            },
          ],
        },
        {
          id: "b-tower-outside-explore",
          title: "Tower Outside Explore",
          tag: "explore",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B_Tower_Outside_Explore_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B_Tower_Outside_Explore_Loop.ogg`,
            },
          ],
        },
        {
          id: "b-tower-outside-battle-lv1",
          title: "Tower Outside Battle Level 1",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B_Tower_Outside_Battle_level1_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B_Tower_Outside_Battle_level1_Loop.ogg`,
            },
          ],
        },
        {
          id: "b-tower-outside-battle-lv2",
          title: "Tower Outside Battle Level 2",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B_Tower_Outside_Battle_level2_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B_Tower_Outside_Battle_level2_Loop.ogg`,
            },
          ],
        },
        {
          id: "b-tower-inside-explore",
          title: "Tower Inside Explore",
          tag: "explore",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B_Tower_Inside_Explore_Intro.ogg`,
            },
            { segment: "loop", url: `${BASE}/B_Tower_Inside_Explore_Loop.ogg` },
          ],
        },
        {
          id: "b-tower-inside-battle-lv1",
          title: "Tower Inside Battle Level 1",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B_Tower_Inside_Battle_level1_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B_Tower_Inside_Battle_level1_Loop.ogg`,
            },
          ],
        },
        {
          id: "b-tower-inside-battle-lv2",
          title: "Tower Inside Battle Level 2",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B_Tower_Inside_Battle_level2_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B_Tower_Inside_Battle_level2_Loop.ogg`,
            },
          ],
        },
        {
          id: "b-tower-prayer-wheel",
          title: "Prayer Wheel",
          tag: "mechanic",
          sources: [
            { segment: "intro", url: `${BASE}/B_Tower_PrayerWheel_Intro.ogg` },
            { segment: "loop", url: `${BASE}/B_Tower_PrayerWheel_Loop.ogg` },
            { segment: "end", url: `${BASE}/B_Tower_PrayerWheel_End.ogg` },
          ],
        },
        {
          id: "b-tower-countdown",
          title: "Tower Countdown",
          tag: "countdown",
          sources: [
            { segment: "standalone", url: `${BASE}/B_Tower_CountDown.ogg` },
          ],
        },
        {
          id: "b-tower-white-wolf",
          title: "White Wolf",
          tag: "boss",
          sources: [
            {
              segment: "spawn",
              url: `${BASE}/LM02_Cutscene_BGM_KunLun_B_Tower_SpawnWolfKing.ogg`,
              layers: [
                `${BASE}/LM02_KunLun_StoryMission_Cutscene_SFX_WhiteWolf_RC.ogg`,
              ],
            },
            { segment: "intro", url: `${BASE}/B_Tower_DestroyCyst_Intro.ogg` },
            { segment: "loop", url: `${BASE}/B_Tower_DestroyCyst_Loop.ogg` },
            { segment: "end", url: `${BASE}/B_Tower_DestroyCyst_End.ogg` },
            {
              segment: "end",
              stage: "Death",
              url: `${BASE}/LM02_Cutscene_BGM_KunLun_B_Tower_WolfKing_Dead.ogg`,
              layers: [
                `${BASE}/LM02_LA_KunLun_MissionB1_Cutscene_SFX_WhiteWolf_Death.ogg`,
              ],
            },
          ],
        },
      ],
    },

    // ========== B2. 恶罗海城 ==========
    {
      id: "elo-sea",
      name: "恶罗海城",
      nameEn: "Elo Sea City",
      label: "Chapter B2",
      cover: "/images/kunlun/map_2k_elhc.png",
      navImage: "/images/kunlun/map_2k_elhc.png",
      titleImage: "/images/kunlun/title_elhc.png",
      tracks: [
        // 记忆之城开篇漫画
        {
          id: "b-memory-open-comics",
          title: "Memory City Opening Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_KunLun_B2_MemoryCity_Comics_VO.ogg`,
              layers: [`${BASE}/LM02_KunLun_B2_MemoryCity_Comics_SFX.ogg`],
            },
          ],
        },
        // 废墟之城
        {
          id: "b2-ruined-explore",
          title: "Ruined City Explore",
          tag: "explore",
          sources: [
            { segment: "loop", url: `${BASE}/B2_RuinedCity_Explore_Loop.ogg` },
          ],
        },
        {
          id: "b2-ruined-battle-lv1",
          title: "Ruined City Battle Level 1",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B2_RuinedCity_Battle_level1_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B2_RuinedCity_Battle_level1_Loop.ogg`,
            },
          ],
        },
        {
          id: "b2-ruined-battle-lv2",
          title: "Ruined City Battle Level 2",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B2_RuinedCity_Battle_level2_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B2_RuinedCity_Battle_level2_Loop.ogg`,
            },
          ],
        },
        // 记忆之城
        {
          id: "b2-memory-explore",
          title: "Memory City Explore",
          tag: "explore",
          sources: [
            { segment: "loop", url: `${BASE}/B2_MemoryCity_Explore_Loop.ogg` },
          ],
        },
        {
          id: "b2-memory-battle-lv1",
          title: "Memory City Battle Level 1",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B2_MemoryCity_Battle_level1_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B2_MemoryCity_Battle_level1_Loop.ogg`,
            },
          ],
        },
        {
          id: "b2-memory-battle-lv2",
          title: "Memory City Battle Level 2",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B2_MemoryCity_Battle_level2_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B2_MemoryCity_Battle_level2_Loop.ogg`,
            },
          ],
        },
        {
          id: "b2-memory-spaceleap",
          title: "Space Leap",
          tag: "mechanic",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/B2_MemoryCity_SpaceLeap_1.ogg`,
            },
            { segment: "end", url: `${BASE}/B2_MemoryCity_SpaceLeap_End.ogg` },
          ],
        },
        {
          id: "b2-memory-spaceleap-collection",
          title: "Space Leap Collection",
          tag: "mechanic",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/B2_MemoryCity_SpaceLeapCollection_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/B2_MemoryCity_SpaceLeapCollection_Loop.ogg`,
            },
            {
              segment: "end",
              url: `${BASE}/B2_MemoryCity_SpaceLeapCollection_End.ogg`,
            },
          ],
        },
        {
          id: "b2-memory-countdown",
          title: "Memory City Countdown",
          tag: "countdown",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/B2_MemoryCity_CountDown.ogg`,
            },
          ],
        },
        {
          id: "b2-memory-fishking",
          title: "Fish King",
          tag: "boss",
          sources: [
            {
              segment: "cutscene",
              stage: "Jump Lake",
              url: `${BASE}/LM02_Cutscene_BGM_KunLun_B2_MemoryCity_JumpLake.ogg`,
              layers: [
                `${BASE}/LM02_LA_KunLun_MissionB2Damaged_Cutscene_SFX_JumpLake.ogg`,
              ],
            },
            {
              segment: "spawn",
              url: `${BASE}/LM02_Cutscene_BGM_KunLun_B2_MemoryCity_SpawnFishKing.ogg`,
              layers: [
                `${BASE}/LM02_LA_KunLun_MissionB2Boss_Cutscene_SFX_CatFish_RC.ogg`,
              ],
            },
            {
              segment: "intro",
              stage: "Stage 01",
              url: `${BASE}/B2_MemoryCity_FishKing_Stage01_Intro.ogg`,
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/B2_MemoryCity_FishKing_Stage01_Loop.ogg`,
            },
            {
              segment: "transition",
              url: `${BASE}/B2_MemoryCity_FishKing_Transition.ogg`,
            },
            {
              segment: "loop",
              stage: "Stage 02",
              url: `${BASE}/B2_MemoryCity_FishKing_Stage02_Loop.ogg`,
            },
            {
              segment: "end",
              url: `${BASE}/LM02_LA_KunLun_MissionB2Boss_Cutscene_SFX_CatFish_Death.ogg`,
            },
          ],
        },
      ],
    },

    // ========== C. 魔国祭坛 ==========
    {
      id: "altar",
      name: "魔国祭坛",
      nameEn: "Demon Altar",
      label: "Chapter C",
      cover: "/images/kunlun/alt_4k_mgjt.jpg",
      navImage: "/images/kunlun/alt_4k_mgjt.jpg",
      titleImage: "/images/kunlun/title_mgjt.png",
      tracks: [
        {
          id: "c-altar-open-comics",
          title: "Opening Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_KunLun_C_Mushroom_Comics_VO.ogg`,
              layers: [`${BASE}/LM02_KunLun_C_Mushroom_Comics_SFX.ogg`],
            },
          ],
        },
        {
          id: "c-altar-explore",
          title: "Altar Explore",
          tag: "explore",
          sources: [
            { segment: "intro", url: `${BASE}/C_Altar_Explore_Intro.ogg` },
            { segment: "loop", url: `${BASE}/C_Altar_Explore_Loop.ogg` },
          ],
        },
        {
          id: "c-altar-battle-lv1",
          title: "Altar Battle Level 1",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/C_Altar_Battle_level1_Intro.ogg`,
            },
            { segment: "loop", url: `${BASE}/C_Altar_Battle_level1_Loop.ogg` },
          ],
        },
        {
          id: "c-altar-battle-lv2",
          title: "Altar Battle Level 2",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/C_Altar_Battle_level2_Intro.ogg`,
            },
            { segment: "loop", url: `${BASE}/C_Altar_Battle_level2_Loop.ogg` },
          ],
        },
        {
          id: "c-altar-break-eye",
          title: "Break Eye",
          tag: "battle",
          sources: [
            { segment: "intro", url: `${BASE}/C_Altar_BreakEye_Intro.ogg` },
            { segment: "loop", url: `${BASE}/C_Altar_BreakEye_Loop.ogg` },
            { segment: "end", url: `${BASE}/C_Altar_BreakEye_End.ogg` },
          ],
        },
        // Cutscene: 进入虚空 (BGM + SFX 叠加)
        {
          id: "c-altar-into-void",
          title: "Into Void",
          tag: "cutscene",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_Cutscene_BGM_KunLun_C_Altar_IntoVoid.ogg`,
              layers: [
                `${BASE}/LM02_LA_KunLun_MissionC_Cutscene_SFX_Into_Void.ogg`,
              ],
            },
          ],
        },
        {
          id: "c-altar-countdown",
          title: "Altar Countdown",
          tag: "countdown",
          sources: [
            { segment: "standalone", url: `${BASE}/C_Altar_CountDown.ogg` },
          ],
        },
        {
          id: "c-altar-timesnake",
          title: "Time Snake",
          tag: "boss",
          sources: [
            {
              segment: "spawn",
              url: `${BASE}/LM02_Cutscene_BGM_KunLun_C_Altar_SpawnTimeSnake.ogg`,
              layers: [
                `${BASE}/LM02_LA_KunLun_MissionCSnakeBoss_Cutscene_SFX_SnakeGod_RC.ogg`,
              ],
            },
            {
              segment: "intro",
              stage: "Stage 01",
              url: `${BASE}/C_Altar_TimeSnake_Stage01_Intro.ogg`,
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/C_Altar_TimeSnake_Stage01_Loop.ogg`,
            },
            {
              segment: "transition",
              url: `${BASE}/C_Altar_TimeSnake_Transition.ogg`,
            },
            {
              segment: "loop",
              stage: "Stage 02",
              url: `${BASE}/C_Altar_TimeSnake_Stage02_Loop.ogg`,
            },
          ],
        },
        // Comics: 打死假蛇神
        {
          id: "c-altar-fake-ending-comics",
          title: "Fake Ending Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_KunLun_C_FakeEnding_Comics_VO.ogg`,
              layers: [`${BASE}/LM02_KunLun_C_FakeEnding_Comics_SFX.ogg`],
            },
          ],
        },
        // Comics: 胡八一使用雮尘珠
        {
          id: "d-reverse-time-ball-comics",
          title: "Ball Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_KunLun_C_Ball_Comics_VO.ogg`,
              layers: [`${BASE}/LM02_KunLun_C_Ball_Comics_SFX.ogg`],
            },
          ],
        },
      ],
    },

    // ========== D. 虚数空间 ==========
    {
      id: "reverse-time",
      name: "虚数空间",
      nameEn: "Reverse Time",
      label: "Chapter D",
      cover: "/images/kunlun/alt_4k_xskj.jpg",
      navImage: "/images/kunlun/alt_4k_xskj.jpg",
      titleImage: "/images/kunlun/title_sjdz.png",
      tracks: [
        {
          id: "d-reverse-explore",
          title: "Reverse Time Explore",
          tag: "explore",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/D_ReverseTime_Explore_Intro.ogg`,
            },
            { segment: "loop", url: `${BASE}/D_ReverseTime_Explore_Loop.ogg` },
          ],
        },
        {
          id: "d-reverse-battle-lv1",
          title: "Reverse Time Battle Level 1",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/D_ReverseTime_Battle_level1_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/D_ReverseTime_Battle_level1_Loop.ogg`,
            },
          ],
        },
        {
          id: "d-reverse-battle-lv2",
          title: "Reverse Time Battle Level 2",
          tag: "battle",
          sources: [
            {
              segment: "intro",
              url: `${BASE}/D_ReverseTime_Battle_level2_Intro.ogg`,
            },
            {
              segment: "loop",
              url: `${BASE}/D_ReverseTime_Battle_level2_Loop.ogg`,
            },
          ],
        },
        {
          id: "d-reverse-countdown",
          title: "Reverse Time Countdown",
          tag: "countdown",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/D_ReverseTime_CountDown.ogg`,
            },
          ],
        },
        {
          id: "d-reverse-original-snake",
          title: "Original Snake",
          tag: "boss",
          sources: [
            {
              segment: "spawn",
              url: `${BASE}/LM02_Cutscene_BGM_KunLun_D_ReverseTime_SpawnOriginalSnake.ogg`,
              layers: [
                `${BASE}/LM02_LA_KunLun_MissionDBoss_Cutscene_SFX_SnakeGod02_RC.ogg`,
              ],
            },
            {
              segment: "intro",
              stage: "Stage 01",
              url: `${BASE}/D_ReverseTime_OriginalSnake_Stage01_Intro.ogg`,
            },
            {
              segment: "loop",
              stage: "Stage 01",
              url: `${BASE}/D_ReverseTime_OriginalSnake_Stage01_Loop.ogg`,
            },
            {
              segment: "transition",
              stage: "Stage 02",
              url: `${BASE}/D_ReverseTime_OriginalSnake_Stage02_Transition.ogg`,
            },
            // 胡八一再次使用雮尘珠，一支穿云箭, _ _ _ _ _ _ _ 。
            {
              segment: "cutscene",
              stage: "Ball",
              url: `${BASE}/LM02_Comic_BGM_KunLun_D_ReverseTime_TrueEnding.ogg`,
            },
            {
              segment: "intro",
              stage: "Stage 02",
              url: `${BASE}/D_ReverseTime_OriginalSnake_Stage02_Intro.ogg`,
            },
            {
              segment: "loop",
              stage: "Stage 02",
              url: `${BASE}/D_ReverseTime_OriginalSnake_Stage02_Loop.ogg`,
            },
            {
              segment: "end",
              url: `${BASE}/LM02_LA_KunLun_MissionDBoss_Cutscene_SFX_SnakeGod02_End.ogg`,
            },
          ],
        },
        // Comics: 假结局
        {
          id: "d-reverse-fake-ending-comics",
          title: "Fake Ending Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_KunLun_C_FakeEnding_Comics_VO.ogg`,
              layers: [`${BASE}/LM02_KunLun_C_FakeEnding_Comics_SFX.ogg`],
            },
          ],
        },
        // Comics: 真结局
        {
          id: "d-reverse-true-ending-comics",
          title: "True Ending Comics",
          tag: "comics",
          sources: [
            {
              segment: "standalone",
              url: `${BASE}/LM02_KunLun_C_TrueEnding_Comics_VO.ogg`,
              layers: [`${BASE}/LM02_KunLun_C_TrueEnding_Comics_SFX.ogg`],
            },
          ],
        },
      ],
    },
  ],
};
