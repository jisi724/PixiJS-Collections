<template>
  <div>
    <div ref="pixiRenderer"></div>
    <button @click="changeBgColor">change background</button>
    <button @click="resize">resize</button>
  </div>

</template>

<script>
export default {
  data () {
    return {
      app: {}
    }
  },
  mounted () {
    // stage and render
    this.app = new this.$PIXI.Application({
      width: 256,
      height: 256,
      antialias: true, // smooth the edge
      transparent: false, // background transparent
      resolution: 1
    })
    const elem = this.$refs.pixiRenderer
    elem.appendChild(this.app.view)
  },
  methods: {
    changeBgColor () {
      if (this.app.renderer.backgroundColor === 0x061639) {
        this.app.renderer.backgroundColor = 0x000000
      } else {
        this.app.renderer.backgroundColor = 0x061639
      }
    },
    resize () {
      this.app.renderer.resize(520, 520)
    }
  }
}
</script>
