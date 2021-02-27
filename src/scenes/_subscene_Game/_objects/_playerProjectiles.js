import { Tilemaps } from "phaser";
import { CST } from "../../../CST"

export default class _PlayerProjectiles extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite, 
    {
      vx = 0,
      vy = -300,
      angle = 0
    } = {}
  ) {

    super(scene, x, y, CST.ASSETS.SPRITESHEET.key, sprite)
    
    // Apply Physics
    scene.physics.add.existing(this, 0)

    // Set World of Bounds
    // this.body.customBoundsRectangle = new Phaser.Geom.Rectangle(30, 30, 500, 540)
    // this.body.setCollideWorldBounds(true);

    // Add Player Projectile to Scene
    scene.add.existing(this)

    // Set Depth
    this.setDepth(-1)

    // Projectile Data
    this.setData("removeFlag", false)
    this.setData("vx", vx)
    this.setData("vy", vy)
    this.setData("angle", 0)
    this.setData("bounds", {top: -30, down: 630, left: -30, right: 590});
  }

  update() {
    let vy = this.getData("vy")
    let vx = this.getData("vx")
    let angle = this.getData("angle")
    this.body.setVelocity(0)

    if (!this.getData("removeFlag")) {
      this.body.setVelocityX(vx)
      this.body.setVelocityY(vy)

      if (
        this.body.x < -30 ||
        this.body.x > 590 ||
        this.body.y < -30 ||
        this.body.y > 630
      ) {
        console.log("Hit")
        this.toggleData("removeFlag")
      }
    } else {
      this.setActive(false)
      this.setVisible(false)
      this.destroy()
    }
  }
}