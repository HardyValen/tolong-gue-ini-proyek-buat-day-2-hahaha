export default class _StageContainer extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, children = null) {
    super(scene, x, y, children)
    // let customBoundsRectangle = new Phaser.Geom.Rectangle(x, y, 500, 540);

    // let group = scene.physics.add.group({
    //   collideWorldBounds: true,
    //   customBoundsRectangle
    // });

    // Phaser.Actions.RandomRectangle(group.getChildren(), customBoundsRectangle)
  }

  // addRectangle() {
  //   let rectangle = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 500, 540)
  //   rectangle.setOrigin(0, 0)
  //   rectangle.setFillStyle(0xffffff, 0.2)

  //   this.add(rectangle)
  //   // this.data.get("test")
  // }
}