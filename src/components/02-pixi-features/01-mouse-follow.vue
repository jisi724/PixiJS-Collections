<template>
  <div>
    <div ref="pixiRenderer"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      app: {},
      cat: {},
      mousePosition: {}
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

      // load images, once it's done, run setup
      this.$PIXI.loader
        .add('/static/images/emoji.png')
        .on('progress', this.loadProgressHandler)
        .load(this.setup)
    },
    setup () {
      this.cat = new this.$PIXI.Sprite(
        this.$PIXI.loader.resources['/static/images/emoji.png'].texture
      )
      this.app.stage.addChild(this.cat)

      this.cat.speed = 3
      this.mousePosition = this.getMousePosition()

      this.app.ticker.add(delta => this.gameLoop(delta))
    },
    gameLoop (delta) {
      this.mousePosition = this.getMousePosition()
      let dx = this.mousePosition.x - this.cat.x
      let dy = this.mousePosition.y - this.cat.y
      let angle = Math.atan2(dy, dx)
      let vx = Math.cos(angle) * this.cat.speed
      let vy = Math.sin(angle) * this.cat.speed
      this.cat.x += vx
      this.cat.y += vy
    },
    getMousePosition () {
      return this.app.renderer.plugins.interaction.mouse.global
    }
  }
}
</script>
