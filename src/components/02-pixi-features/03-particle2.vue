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
      mousePosition: {},
      particles: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.app = new this.$PIXI.Application({
        width: 512,
        height: 512,
        antialias: true
      })
      const elem = this.$refs.pixiRenderer
      elem.appendChild(this.app.view)
      this.setup()
    },
    setup () {
      let line = new this.$PIXI.Graphics()

      line.lineStyle(4, 0xffd900, 1)
      line.moveTo(0, 0)
      line.lineTo(80, 50)
      line.quadraticCurveTo(20, 10, 30, 80)
      line.x = 32
      line.y = 32

      this.app.stage.addChild(line)
    }
  }
}
</script>
