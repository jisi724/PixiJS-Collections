<template>
  <div>
    <div ref="pixiRenderer"></div>
  </div>
</template>

<script>
import keyboard from '../../shared/keyboard'

export default {
  data () {
    return {
      app: {},
      cat: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.app = new this.$PIXI.Application({
        width: 512,
        height: 512
      })
      const elem = this.$refs.pixiRenderer
      elem.appendChild(this.app.view)

      this.$PIXI.loader
        .add('/static/images/cat.png')
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

      this.app.stage.addChild(this.cat)
    },
    play () {
      this.cat.x += this.cat.vx
      this.cat.y += this.cat.vy
    }
  }
}
</script>
