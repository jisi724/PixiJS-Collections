<template>
  <div>
    <div ref="pixiRenderer"></div>
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
        .add('/static/images/treasureHunt.json')
        .load(this.setup)
    },
    setup () {
      let tileset = this.$PIXI.loader.resources['/static/images/treasureHunt.json'].textures
      let explorer = new this.$PIXI.Sprite(tileset['explorer'])
      let dungeon = new this.$PIXI.Sprite(tileset['dungeon'])
      // let blob = new this.$PIXI.Sprite(tileset['blob'])
      // let door = new this.$PIXI.Sprite(tileset['door'])
      let treasure = new this.$PIXI.Sprite(tileset['treasure'])

      explorer.position.set(40, 240)
      treasure.position.set(430, 240)

      this.app.stage.addChild(dungeon, explorer, treasure)
    }
  }
}
</script>
