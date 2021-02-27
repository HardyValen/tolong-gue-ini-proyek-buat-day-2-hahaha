import { CST } from "../CST";
import MenuScene from "./MenuScene";
import Phaser from "phaser";
import GameScene from "./GameScene";

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.LOAD
    })
  }
  
  init() {
    
  }

  preload() {
    // this.load.image(CST.ASSETS.MENU.BACKGROUND.key, CST.ASSETS.MENU.BACKGROUND.source)
    // this.load.multiatlas(CST.ASSETS.SPRITESHEET.key, CST.ASSETS.SPRITESHEET.source, CST.ASSETS.key)
    // this.load.multiatlas('source', 'assets/source.json', 'assets')
    // this.load.image('main-menu', 'assets/Background/MainMenu.jpg', 'assets')

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    })

    this.load.on("progress", (percent) => {
      loadingBar.fillRect(100, 375, (600 * percent), 50)
    })
  }

  create() {
    this.scene.add(CST.SCENES.MENU, MenuScene, false)    // Dynamic Menu
    // this.scene.start(CST.SCENES.MENU)
    this.scene.add(CST.SCENES.GAME, GameScene, false)
    this.scene.start(CST.SCENES.GAME)
    // this.add.image(0, 0, CST.ASSETS.MENU.BACKGROUND.key).setOrigin(0, 0)
  }
}