<template>
  <div>
    <div ref="pixiRenderer"></div>
  </div>
</template>

<script>
import keyboard from '../../shared/keyboard'
import hitTestRectangle from '../../shared/hitTestRectangle'

export default {
  data () {
    return {
      app: {},
      cat: {},
      emoji: {},
      square: {},
      message: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.app = new this.$PIXI.Application({width: 512, height: 512})
      const elem = this.$refs.pixiRenderer
      elem.appendChild(this.app.view)

      this.$PIXI.loader
        .add('/static/images/cat.png')
        .add('/static/images/emoji.png')
        .on('progress', this.loadProgressHandler)
        .load(this.setup)
    },
    setup () {
      this.cat = new this.$PIXI.Sprite(
        this.$PIXI.loader.resources['/static/images/cat.png'].texture
      )
      this.cat.position.set(231, 231)
      this.cat.vx = 0
      this.cat.vy = 0

      // Capture the keyboard arrow keys
      let left = keyboard(37)
      let up = keyboard(38)
      let right = keyboard(39)
      let down = keyboard(40)

      left.press = () => {
        this.cat.vx = -5
      }
      left.release = () => {
        if (right.isDown) this.cat.vx = 5
        else this.cat.vx = 0
      }
      right.press = () => {
        this.cat.vx = 5
      }
      right.release = () => {
        if (left.isDown) this.cat.vx = -5
        else this.cat.vx = 0
      }
      up.press = () => {
        this.cat.vy = -5
      }
      up.release = () => {
        if (down.isDown) this.cat.vy = 5
        else this.cat.vy = 0
      }
      down.press = () => {
        this.cat.vy = 5
      }
      down.release = () => {
        if (up.isDown) this.cat.vy = -5
        else this.cat.vy = 0
      }

      // set the state of game
      let state = this.play

      this.app.ticker.add(delta => state(delta))

      // create a new square
      this.rectangle = new this.$PIXI.Graphics()
      this.rectangle.beginFill(0x66CCFF)
      this.rectangle.lineStyle(4, 0xFF3300, 1)
      this.rectangle.drawRect(0, 0, 100, 100)
      this.rectangle.endFill()
      this.rectangle.x = 200
      this.rectangle.y = 200

      // create a explain text
      this.message = new this.$PIXI.Text('no collision')
      this.message.style = {fill: 'white', font: '16px PetMe64'}
      this.message.position.set(20, 20)

      this.app.stage.addChild(this.rectangle, this.message, this.cat)
    },
    play () {
      this.cat.x += this.cat.vx
      this.cat.y += this.cat.vy

      if (hitTestRectangle(this.cat, this.rectangle)) {
        this.message.text = 'Hit!'
        this.rectangle.tint = 0xff3300
        this.cat.setTexture(this.$PIXI.loader.resources['/static/images/emoji.png'].texture)
      } else {
        this.message.text = 'No Collision!'
        this.rectangle.tint = 0xccff99
        this.cat.setTexture(this.$PIXI.loader.resources['/static/images/cat.png'].texture)
      }
    }
  }
}
</script>
