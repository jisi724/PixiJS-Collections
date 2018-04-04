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

      // load images, once it's done, run setup
      this.$PIXI.loader
        .add([
          '/static/images/cat.png',
          '/static/images/tileset.png'
        ])
        .on('progress', this.loadProgressHandler)
        .load(this.setup)
    },
    loadProgressHandler (loader, resource) {
      console.log('loading: ' + resource.url)
      console.log('progress: ' + loader.progress + '%')
    },
    setup () {
      console.log('All files loaded')

      let tileset = this.$PIXI.utils.TextureCache['/static/images/tileset.png']
      // PIXI.Rectangle(x, y, width, length);
      let rectangle = new this.$PIXI.Rectangle(0, 64, 64, 64)
      tileset.frame = rectangle
      let rocket = new this.$PIXI.Sprite(tileset)
      rocket.position.set(60, 60)
      this.cat = new this.$PIXI.Sprite(this.$PIXI.loader.resources['/static/images/cat.png'].texture)

      this.app.stage.addChild(rocket)
      this.app.stage.addChild(this.cat)
    }
  }
}
</script>
