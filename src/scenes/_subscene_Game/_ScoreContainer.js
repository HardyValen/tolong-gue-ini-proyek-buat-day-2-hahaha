export default class _ScoreContainer extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, children = null) {
    super(scene, x, y, children)
  }

  addRectangle() {
    let rectangle = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 240, 540)
    rectangle.setOrigin(0, 0)
    rectangle.setFillStyle(0xff0000, 0.2)

    this.add(rectangle)
    // this.data.get("test")
  }
}