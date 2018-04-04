<template>
  <div>
    <div ref="pixiRenderer"></div>
    <button @click="toggleCat">toggle cat</button>
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
        .add('/static/images/cat.png')
        .on('progress', this.loadProgressHandler)
        .load(this.setup)
    },
    loadProgressHandler (loader, resource) {
      console.log('loading: ' + resource.url)
      console.log('progress: ' + loader.progress + '%')
    },
    setup () {
      console.log('All files loaded')
      // create sprite
      this.cat = new this.$PIXI.Sprite(
        this.$PIXI.loader.resources['/static/images/cat.png'].texture
      )
      // add sprite into stage
      this.app.stage.addChild(this.cat)
      // this.app.stage.removeChild(this.ca)
    },
    toggleCat () {
      this.cat.visible = !this.cat.visible
    }
  }
}
</script>
