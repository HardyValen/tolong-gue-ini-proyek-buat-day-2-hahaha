import * as Phaser from 'phaser'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
  }
};

var game = new Phaser.Game(config)

function preload(){
  console.log(this)
  this.load.multiatlas('source', 'assets/source.json', 'assets')
  this.load.image('main-menu', 'assets/Background/MainMenu.jpg', 'assets')
}

function create() {
  this.add.image(0, 0, 'main-menu').setOrigin(0, 0)
  this.player = this.physics.add.sprite(400, 400, 'source', 'Reimu/Sprite/Front/idle_1.png');

  let playerFrames = this.anims.generateFrameNames('source', {
    start: 1,
    end: 8,
    prefix: "Reimu/Sprite/Front/idle_",
    suffix: ".png"
  })

  this.anims.create({
    key: 'playerIdle',
    frames: playerFrames,
    frameRate: 12,
    repeat: -1
  });

  this.player.anims.play('playerIdle')
}
