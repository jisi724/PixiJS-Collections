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
      let door = new this.$PIXI.Sprite(tileset['door'])
      let treasure = new this.$PIXI.Sprite(tileset['treasure'])
      explorer.position.set(40, 240)
      treasure.position.set(430, 240)
      door.position.set(32, 0)

      this.app.stage.addChild(dungeon, explorer, treasure, door)

      // Make the blobs
      let numberOfBlobs = 8
      let spacing = 48
      let xOffset = 90
      for (let i = 0; i < numberOfBlobs; i++) {
        let blob = new this.$PIXI.Sprite(tileset['blob'])
        let x = spacing * i + xOffset
        let y = this.randomInt(0, this.app.stage.height - blob.height * 3)
        blob.position.set(x, y)
        this.app.stage.addChild(blob)
      }
    },
    randomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
}
</script>
