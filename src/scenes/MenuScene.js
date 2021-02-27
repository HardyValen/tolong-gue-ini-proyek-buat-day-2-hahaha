import WebFontFile from "../classes/WebFontFile";
import { CST } from "../CST";
import _Landing from "./_subscene_Menu/_Landing";
import _Manual from "./_subscene_Menu/_Manual";

let landingContainerRef, manualContainerRef;

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU
    })
  }

  init(data) {
    
  }

  preload() {
    this.load.image(CST.ASSETS.MENU.BACKGROUND.key, CST.ASSETS.MENU.BACKGROUND.source, CST.ASSETS.key)
    this.load.addFile(new WebFontFile(this.load, 'Lora'))
    this.load.addFile(new WebFontFile(this.load, 'Berkshire Swash'))
    this.load.addFile(new WebFontFile(this.load, 'Roboto Condensed'))
    this.load.addFile(new WebFontFile(this.load, 'Alegreya Sans'))
  }

  create() {
    this.add.image(0, 0, CST.ASSETS.MENU.BACKGROUND.key).setOrigin(0, 0)

    // INI CARA INJECTNYA JIR
    // let x = new Phaser.GameObjects.Container(this, 0, 0)
    // x.add(new Phaser.GameObjects.Text(this, 40, 40, "hello"))
    // this.add.existing(x)

    // CARA LAMA
    // this.add.text()
    // this.add.container

    this[CST.MENU_STATE.landing] = new _Landing(this, 40, CST.DIMENSION.height / 2)
    this.add.existing(this[CST.MENU_STATE.landing])
    landingContainerRef = this[CST.MENU_STATE.landing]
    
    this.infoText = new Phaser.GameObjects.Text(this, 790, 590, 
      "Move: ArrowKeys; Enter: Z; Back: X NORMAL", 
      {fontFamily: `Roboto Condensed`, fontSize: '12px', fontStyle: 900}
    ).setOrigin(1, 1)
    this.add.existing(this.infoText)
    
    this[CST.MENU_STATE.manual] = new _Manual(this, 40, 40)
    this.add.existing(this[CST.MENU_STATE.manual])
    manualContainerRef = this[CST.MENU_STATE.manual]

    // Menu Initialization
    this[CST.MENU_STATE.landing].addKeyboardInteractive()
    this[CST.MENU_STATE.manual].hideRender()
  }


  update() {
    // this[this.gameState].updateObjects(this.gameState)
  }
}

export { landingContainerRef, manualContainerRef }