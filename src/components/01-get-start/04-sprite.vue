<template>
  <div>
    <div ref="pixiRenderer"></div>
    <button @click="changePosition">change position</button>
    <button @click="chengeSize">change size</button>
    <button @click="changeScale">scale sprite</button>
    <button @click="rotateSprite">rotate sprite</button>
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
    },
    changePosition () {
      // or do this way
      // this.cat.x = 96
      // this.cat.y = 96
      this.cat.position.set(96, 96)
    },
    chengeSize () {
      this.cat.width = 80
      this.cat.height = 120
    },
    changeScale () {
      // or do this way
      // this.cat.scale.x = 0.5
      // this.cat.scale.y = 0.5
      this.cat.scale.set(0.5, 0.5)
    },
    rotateSprite () {
      // you can change anchor to center like this
      // this.cat.anchor.x = 0.5
      // this.cat.anchor.y = 0.5
      // or use pivot to set the anchor
      // this.cat.pivot.set(32, 32)
      this.cat.rotation = 0.5
    }
  }
}
</script>
