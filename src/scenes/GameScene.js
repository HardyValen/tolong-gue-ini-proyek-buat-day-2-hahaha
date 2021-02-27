import { CST } from "../CST";
import _StageContainer from "./_subscene_Game/_StageContainer";
import _ScoreContainer from "./_subscene_Game/_ScoreContainer";
import WebFontFile from "../classes/WebFontFile";
import _Player from "./_subscene_Game/_objects/_player";
import removeEntities from "../functions/removeEntities";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.GAME
    })
  }

  init() {
    
  }

  preload() {
    this.load.multiatlas(CST.ASSETS.SPRITESHEET.key, CST.ASSETS.SPRITESHEET.source, CST.ASSETS.key)
    this.load.image('backdrop', 'assets/Background/GameBackdrop2.png', 'assets')
    this.load.addFile(new WebFontFile(this.load, 'Lora'))
    this.load.addFile(new WebFontFile(this.load, 'Berkshire Swash'))
    this.load.addFile(new WebFontFile(this.load, 'Roboto Condensed'))
    this.load.addFile(new WebFontFile(this.load, 'Alegreya Sans'))
  }

  create() {
    // Create Parent Container
    let backdrop = new Phaser.GameObjects.Image(this, 0, 0, 'backdrop').setOrigin(0, 0)

    // Scene Container
    let container = new Phaser.GameObjects.Container(this, 0, 0)
    this.data.set(CST.GAME.container_key, container)

    // Create Stage Container
    let stageContainer = new _StageContainer(this, 30, 30)
    this.data.set(CST.GAME.STAGE_CONTAINER.key, stageContainer)

    
    // Create Score Container
    let scoreContainer = new _ScoreContainer(this, 530, 30)
    this.data.set(CST.GAME.SCORE_CONTAINER.key, scoreContainer)
    
    // Add Game Container
    container.add([stageContainer, scoreContainer, backdrop])
    this.add.existing(container)
    
    // Add Player
    let player = new _Player(this, 50, 100, null, "Reimu")
    stageContainer.add(player)

    // Scene Data for Reference
    this.data.set("player", player)
    this.data.set("playerProjectiles", [])
    this.data.set("enemy", [])
    this.data.set("enemyProjectiles", [])
  }
  
  update() {
    // Get Data
    let player = this.data.get("player");
    let playerProjectiles = this.data.get("playerProjectiles");

    // Remove Entities
    this.data.set("playerProjectiles", removeEntities(playerProjectiles))

    // Player
    player.update();

    // Player Projectiles
    playerProjectiles.forEach(pp => {
      pp.update();
    })


    // this.data.set("counter", (this.data.get("counter") + 1) % 360)
    // let player = this.data.get("player")
    // player.x += Math.sin(this.data.get("counter") * Math.PI / 180) * 3
  }
}