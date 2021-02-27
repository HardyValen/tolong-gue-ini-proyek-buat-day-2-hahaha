export const CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    GAME: "GAME"
  },

  LANDING: {
    optionState: "OPTION_STATE"
  },

  GAME: {
    container_key: "GAME_CONTAINER",
    width: 800,
    height: 600,

    STAGE_CONTAINER: {
      key: "STAGE_CONTAINER",
      width: 440,
      height: 540,
    },
    SCORE_CONTAINER: {
      key: "SCORE_CONTAINER",
      width: 300,
      height: 540,
    }
  },

  DIMENSION: {
    width: 800,
    height: 600
  },

  ASSETS: {
    key: "assets",
    MENU: {
      BACKGROUND: {
        key: "background",
        source: "assets/Background/MainMenu.jpg"
      }
    },
    SPRITESHEET: {
      key: "spritesheet",
      source: "assets/source.json"
    }
  },

  MENU_STATE: {
    landing: "main_menu",
    select_character: "select_character",
    normal_select_difficulty: "normal_select_difficulty",
    extra_select_difficulty: "extra_select_difficulty",
    practice_select_stage: "practice_select_stage",
    spell_practice_select_spellcard: "spell_practice_select_spellcard",
    manual: "manual",
    options: "options",
  }
}