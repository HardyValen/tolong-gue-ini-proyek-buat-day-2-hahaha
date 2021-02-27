import { GAME, SCENE_MANAGER } from "../..";
import { CST } from "../../CST";
import { landingContainerRef, manualContainerRef } from "../MenuScene";

export default class _Landing extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, children = null) {
    super(scene, x, y, children)
    
    this.scene = scene;
    this.optionState = 0;

    this.hideRender = this.hideRender
    this.destroyKeyboardInteractive = this.destroyKeyboardInteractive

    this.options = {
      "Game Start": this.gameStart,
      "Extra Start": () => {},
      "Practice": () => {},
      "Spell Practice": () => {},
      "Manual": this.showManual,
      // "Options": () => {},
      "Quit": this.quit,
    }

    Object.keys(this.options).forEach((option, index) => {
      let style = {
        fontFamily: `Lora`,
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#000000',
        stroke: '#ffffff',
        strokeThickness: 4
      }

      let text = new Phaser.GameObjects.Text(this.scene, 0, (40 * index), option, style)
      this.add(text)
    })

    this.keymap = {
      'UP': {
        add: () => {
          this.keymap['UP'].keyObj = this.scene.input.keyboard.addKey('UP', true, true)
          this.keymap['UP'].keyObj.on('down', () => {
            this.optionState = this.optionState == 0 ? Object.keys(this.options).length - 1 : (this.optionState - 1) % Object.keys(this.options).length
            this.updateObjects()
          });
        },
        destroy: () => {
          this.keymap['UP'].keyObj.destroy()
        }
      },

      'DOWN': {
        add: () => {
          this.keymap['DOWN'].keyObj = this.scene.input.keyboard.addKey('DOWN', true, true)
          this.keymap['DOWN'].keyObj.on('down', () => {
            this.optionState = (this.optionState + 1) % Object.keys(this.options).length
            this.updateObjects()
          });
        },
        destroy: () => {
          this.keymap['DOWN'].keyObj.destroy()
        }
      },

      'Z': {
        add: () => {
          this.keymap['Z'].keyObj = this.scene.input.keyboard.addKey('Z', true, true)
          this.keymap['Z'].keyObj.on('down', () => {
            Object.values(this.options)[this.optionState]()
          });
        },
        destroy: () => {
          this.keymap['Z'].keyObj.destroy()
        }
      },

      'X': {
        add: () => {
          this.keymap['X'].keyObj = this.scene.input.keyboard.addKey('X', true, true)
          this.keymap['X'].keyObj.on('down', () => {
            this.optionState = Object.keys(this.options).length - 1
            this.updateObjects()
          });
        },
        destroy: () => {
          this.keymap['X'].keyObj.destroy()
        }
      }
    }

    this.updateObjects()
  }

  addKeyboardInteractive() {
    Object.keys(this.keymap).forEach(key => {
      this.keymap[key].add()
    })
  }

  destroyKeyboardInteractive() {
    Object.keys(this.keymap).forEach(key => {
      this.keymap[key].destroy()
    })
  }

  hideRender() {
    this.setActive(false).setVisible(false)
  }

  showRender() {
    this.setActive(true).setVisible(true)
  }

  updateObjects(/* menuState */) {
    // if (menuState === CST.MENU_STATE.landing) {
      this.list.forEach((text, index) => {
        if (index === this.optionState) {
          text.setColor("#FF0000")
        } else {
          text.setColor("#000000")
        }
      })
    // }
  }

  quit() {
    window.close()
  }

  showManual() {
    landingContainerRef.hideRender()
    landingContainerRef.destroyKeyboardInteractive()
    manualContainerRef.showRender()
    manualContainerRef.addKeyboardInteractive()
  }

  gameStart() {
    console.log(GAME.scene.getScene(CST.SCENES.MENU).data.values)
    // landingContainerRef.scene.scene.stop(CST.SCENES.MENU)
    // landingContainerRef.scene.scene.remove(CST.SCENES.MENU)
    // landingContainerRef.scene.scene.start(CST.SCENES.MENU)
  }
}