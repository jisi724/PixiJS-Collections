<template>
  <div>
    <div ref="pixiRenderer"></div>
    <button @click="resetCat">reset cat</button>
  </div>
</template>

<script>
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
        width: 256,
        height: 256
      })
      const elem = this.$refs.pixiRenderer
      elem.appendChild(this.app.view)

      this.$PIXI.loader
        .add('/static/images/cat.png')
        .load(this.setup)
    },
    setup () {
      this.cat = new this.$PIXI.Sprite(
        this.$PIXI.loader.resources['/static/images/cat.png'].texture
      )
      this.app.stage.addChild(this.cat)
      // vx, vy can be used as movement speed
      this.cat.vx = 1.1
      this.cat.vy = 1.1

      // ticker did the same thing like requestAnimationFrame
      this.app.ticker.add(delta => this.gameLoop(delta))
    },
    gameLoop (delta) {
      // delta is a frame delay, used for poor preformamce
      if (this.cat.position.x > (256 - this.cat.width) || this.cat.position.x < 0) {
        if (this.cat.vx < 7 && this.cat.vx > -7) {
          this.cat.vx *= -1 * (Math.random() + 1)
        } else {
          this.cat.vx *= -1
        }
      }
      if (this.cat.position.y > (256 - this.cat.height) || this.cat.position.y < 0) {
        if (this.cat.vy < 7 && this.cat.vy > -7) {
          this.cat.vy *= -1 * (Math.random() + 1)
        } else {
          this.cat.vy *= -1
        }
      }
      this.cat.x += this.cat.vx
      this.cat.y += this.cat.vy
    },
    resetCat () {
      this.cat.position.set(0, 0)
      this.cat.vx = 1
      this.cat.vy = 1
    }
  }
}
</script>
