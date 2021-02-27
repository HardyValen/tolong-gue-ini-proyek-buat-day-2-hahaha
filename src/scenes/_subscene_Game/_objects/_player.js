import { CST } from "../../../CST";
import { stepFunction1 } from "../../../functions/mathUtils";
import _PlayerProjectiles from "./_playerProjectiles";

const LCst = {
  Reimu: {
    speed: {
      focused: 150,
      unfocused: 300,
    },
    sprite: {
      leftTransition: {
        key: "ReimuLeftTransition",
        start: 1,
        end: 4,
        prefix: "Reimu/Sprite/Left/transition_",
        suffix: ".png"
      },
      leftMoving: {
        key: "ReimuLeftMoving",
        start: 1,
        end: 4,
        prefix: "Reimu/Sprite/Left/moving_",
        suffix: ".png"
      },
      rightTransition: {
        key: "ReimuRightTransition",
        start: 1,
        end: 4,
        prefix: "Reimu/Sprite/Right/transition_",
        suffix: ".png"
      },
      rightMoving: {
        key: "ReimuRightMoving",
        start: 1,
        end: 4,
        prefix: "Reimu/Sprite/Right/moving_",
        suffix: ".png"
      },
      front: {
        key: "ReimuFront",
        start: 1,
        end: 8,
        prefix: "Reimu/Sprite/Front/idle_",
        suffix: ".png",
      },
    },
    shot: {
      focused: {
        key: "ReimuFocused",
        prefix: "Reimu/Shots/needle/needle",
        suffix: ".png"
      },
      unfocused: {
        key: "ReimuUnfocused",
        prefix: "Reimu/Shots/homing/homing-1",
        suffix: ".png"
      },
    },
  }
}

export default class _Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children = null, playerSelection = "Reimu") {
    super(scene, x, y, children)
    // let as = new Phaser.GameObjects.Container(scene, 0, 0)

    // Failsafe if playerSelection is not in LCst
    let keys = Object.keys(LCst)
    if (keys.filter(item => {return item === playerSelection}).length <= 0) {playerSelection = "Reimu"}
    
    // Hitbox Sprites
    let hitboxSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, CST.ASSETS.SPRITESHEET.key, "Hitbox/tile000.png");
    let hitboxSprite2 = new Phaser.GameObjects.Sprite(scene, 0, 0, CST.ASSETS.SPRITESHEET.key, "Hitbox/tile001.png");
    
    scene.tweens.add({
      targets: hitboxSprite,
      angle: 360,
      duration: 6000,
      repeat: -1
    })
    
    scene.tweens.add({
      targets: hitboxSprite2,
      angle: -360,
      duration: 6000,
      repeat: -1
    })
    
    // Player Specific Data
    let spriteData = LCst[playerSelection].sprite
    let playerSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, CST.ASSETS.SPRITESHEET.key)

    // Animation Loading for Player Sprite
    Object.entries(spriteData).forEach(frameObj => {
      let { start, end, prefix, suffix, key } = frameObj[1];
      let frames = playerSprite.anims.generateFrameNames(
        CST.ASSETS.SPRITESHEET.key, { start, end, prefix, suffix }
      );
      playerSprite.anims.create({key, frames, frameRate: 10, repeat: -1})
      this.setData(key, key)
    })
    
    playerSprite.anims.play(this.getData(spriteData.front.key))

    // Container Physics
    scene.physics.add.existing(this, 0)

    this.body.customBoundsRectangle = new Phaser.Geom.Rectangle(30, 30, 500, 540)
    this.body.setSize(5, 5)
    this.body.setOffset(-3, -3)
    this.body.setCollideWorldBounds(true);

    // Add Objects to Container
    this.add([hitboxSprite2, playerSprite, hitboxSprite])

    // Player Keys
    let playerKeys = {
      "Z": scene.input.keyboard.addKey('Z', true),
      "X": scene.input.keyboard.addKey('X', true),
      "UP": scene.input.keyboard.addKey('UP', true),
      "DOWN": scene.input.keyboard.addKey('DOWN', true),
      "LEFT": scene.input.keyboard.addKey('LEFT', true),
      "RIGHT": scene.input.keyboard.addKey('RIGHT', true),
      "ESC": scene.input.keyboard.addKey('ESC', true),
      "SHIFT": scene.input.keyboard.addKey('SHIFT', true),
    }

    // Add player reference to data
    this.setData("playerHitbox", [hitboxSprite, hitboxSprite2])
    this.setData("playerSprite", playerSprite)
    this.setData("playerData", LCst[playerSelection])
    this.setData("playerKeys", playerKeys)
    this.setData("scene", scene)
    this.setData("allowShot", true)
  }
  
  update() {
    let scene = this.getData("scene");
    let playerKeys = this.getData("playerKeys");
    let playerSprite = this.getData("playerSprite");
    let playerData = this.getData("playerData");
    let playerHitbox = this.getData("playerHitbox");
    let playerProjectiles = scene.data.get("playerProjectiles");
    let sceneKeyboard = scene.input.keyboard;
    let speed = playerData.speed;

    this.body.setVelocity(0);

    // Keys
    let {Z, X, UP, DOWN, LEFT, RIGHT, ESC, SHIFT} = playerKeys

    // Focused
    if (SHIFT.isDown) {
      playerHitbox.forEach(item => { item.setAlpha(1) })

      // Check Keyshots
      if (Z.isDown && this.getData("allowShot")) {
        this.setData("allowShot", false)

        // Normal Shot
        let normalPosition = stepFunction1(10, 2, 3);
        normalPosition.forEach(pos => {
          let shot = new _PlayerProjectiles(scene, this.body.x + pos, this.body.y, "Reimu/Shots/shot/shot.png", { vy: -1600 })
          playerProjectiles.push(shot)
        })

        // Focused Shot
        let focusedShot = stepFunction1(5, 2, 3);
        focusedShot.forEach(pos => {
          let shot = new _PlayerProjectiles(scene, this.body.x + pos, this.body.y, "Reimu/Shots/needle/needle.png", { vy: -1600 })
          playerProjectiles.push(shot)
        })
        
        scene.data.set("playerProjectiles", playerProjectiles)

        scene.time.delayedCall(50, () => {this.setData("allowShot", true)})
      }

      // Check Bomb Key
      if (sceneKeyboard.checkDown(X, 4000)) {
        console.log("Focused Bomb Fired")
      }

      // Movements
      if (DOWN.isDown) {
        this.body.setVelocityY(speed.focused)
      } else if (UP.isDown) {
        this.body.setVelocityY(-speed.focused)
      }
  
      if (LEFT.isDown) {
        playerSprite.anims.play(playerData.sprite.leftMoving.key, true)
        this.body.setVelocityX(-speed.focused)
      } else if (RIGHT.isDown) {
        playerSprite.anims.play(playerData.sprite.rightMoving.key, true)
        this.body.setVelocityX(speed.focused)
      } else {
        playerSprite.anims.play(playerData.sprite.front.key, true)
      }

    } 

    // Unfocused
    else {
      playerHitbox.forEach(item => { item.setAlpha(0) })

      // Check Keyshot
      if (Z.isDown && this.getData("allowShot")) {
        this.setData("allowShot", false)
        
        // Normal Shot
        let normalPosition = stepFunction1(10, 2, 3);
        normalPosition.forEach(pos => {
          let shot = new _PlayerProjectiles(scene, this.body.x + pos, this.body.y, "Reimu/Shots/shot/shot.png", { vy: -1600 })
          playerProjectiles.push(shot)
        })

        scene.data.set("playerProjectiles", playerProjectiles)

        scene.time.delayedCall(50, () => {this.setData("allowShot", true)})
      }
      
      // Check Bomb Key
      if (sceneKeyboard.checkDown(X, 4000)) {
        console.log("Unfocused Bomb Fired")
      }

      // Movements
      if (DOWN.isDown) {
        this.body.setVelocityY(speed.unfocused)
      } else if (UP.isDown) {
        this.body.setVelocityY(-speed.unfocused)
      }
  
      if (LEFT.isDown) {
        playerSprite.anims.play(playerData.sprite.leftMoving.key, true)
        this.body.setVelocityX(-speed.unfocused)
      } else if (RIGHT.isDown) {
        playerSprite.anims.play(playerData.sprite.rightMoving.key, true)
        this.body.setVelocityX(speed.unfocused)
      } else {
        playerSprite.anims.play(playerData.sprite.front.key, true)
      }
    }
  }
}