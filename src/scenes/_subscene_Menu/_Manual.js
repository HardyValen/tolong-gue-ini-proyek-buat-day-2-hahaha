import { CST } from "../../CST";
import { landingContainerRef, manualContainerRef } from "../MenuScene";

export default class _Manual extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, children = null) {
    super(scene, x, y, children) 
  
    this.scene = scene
    this.optionState = 0

    this.options = {
      "1. Controls": `Arrow Keys --> Player movement \nZ Key --> Shoot\nX Key --> Bomb\nShiftLeft --> Focus (HOLD)\nESC Key --> Pause\n`,
      "2. Credits": `Made by Phaser 3, Webpack, Web Font Loader (Lora, Berkshire Swash, Roboto Condensed), and written in Javascript. Took inspiration from ZUN whom made the Touhou Project series when he was in college years.\n\nSoftware used: VScode, TexturePacker, GIMP, Figma, Chromium\nThanks for SpritersResource and SoundsResource\n`
    }

    // landingContainerRef.hideRender()

    Object.entries(this.options).forEach((option, index) => {
      let optionStyle = {
        fontFamily: `Lora`,
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#000000',
        stroke: '#ffffff',
        strokeThickness: 4
      }
      let optionEntry = new Phaser.GameObjects.Text(this.scene, 0, (40 * index), option[0], optionStyle)
      optionEntry.type = "OptionText"
      this.add(optionEntry)
    })

    let manualStyle = {
      fontFamily: `Lora`,
      fontSize: '16px',
      color: '#ffffff',
      shadow: {
        offsetY: 2,
        blur: 2,
        color: '#000',
        fill: true,
      },
      wordWrap: {
        width: 500,
      }
    }
    
    let manualEntry = new Phaser.GameObjects.Text(this.scene, 200, 0, '', manualStyle)
    manualEntry.type = "ManualText"
    this.add(manualEntry)

    console.log(this.list.filter(item => {
      return item.type === "OptionText"
    }))

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

      'X': {
        add: () => {
          this.keymap['X'].keyObj = this.scene.input.keyboard.addKey('X', true, true)
          this.keymap['X'].keyObj.on('down', () => {
            this.back()
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

  updateObjects() {
    this.list.filter(item => {return item.type === "OptionText"}).forEach((text, index) => {
      if (index === this.optionState) {
        text.setColor("#FF0000")
      } else {
        text.setColor("#000000")
      }
    })

    this.list.filter(item => {return item.type === "ManualText"}).forEach((text) => {
      text.setText(Object.values(this.options)[this.optionState])
    })
  }

  back() {
    manualContainerRef.hideRender()
    manualContainerRef.destroyKeyboardInteractive()
    landingContainerRef.showRender()
    landingContainerRef.addKeyboardInteractive()
  }
}