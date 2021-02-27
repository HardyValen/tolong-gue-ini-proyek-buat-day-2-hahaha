import * as Phaser from 'phaser'
import { CST } from './CST';
import LoadScene from './scenes/LoadScene';
// import MenuScene from './scenes/MenuScene.ts';

var config = {
  type: Phaser.AUTO,
  width: CST.DIMENSION.width,
  height: CST.DIMENSION.height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: true
    }
  },
  scene: [
    LoadScene
  ]
};

const GAME = new Phaser.Game(config)
// const SCENE_MANAGER = new Phaser.Scenes.SceneManager(GAME)

export { GAME }