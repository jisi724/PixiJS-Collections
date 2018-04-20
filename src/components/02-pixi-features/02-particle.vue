<template>
  <div>
    <div ref="pixiRenderer"></div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'

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
        height: 512
      })
      const elem = this.$refs.pixiRenderer
      elem.appendChild(this.app.view)

      this.$PIXI.loader
        .add('/static/images/land.jpg')
        .load(this.setup)

      this.app.stage = new this.$PIXI.particles.ParticleContainer(10000, {
        position: true,
        rotation: false,
        alphaAndtint: false,
        scale: false,
        uvs: false
      })
    },
    setup () {
      const texture = this.$PIXI.loader.resources['/static/images/land.jpg'].texture.baseTexture

      // redefine the size of the canvas
      const rendererWidth = this.app.renderer.view.width
      const rendererHeight = rendererWidth / (texture.width / texture.height)
      this.app.renderer.resize(rendererWidth, rendererHeight)

      const frameWidth = 12
      const frameHeight = 12

      const xLoopCount = Math.floor(rendererWidth / frameWidth) - 1
      const yLoopCount = Math.floor(rendererHeight / frameHeight) - 1

      const scale = rendererWidth / texture.width

      for (let i = 0; i < xLoopCount; i++) {
        for (let j = 0; j < yLoopCount; j++) {
          this.particles.push(new Particle(i * frameWidth, j * frameHeight, scale, texture, this.app))
        }
      }
      console.log(this.particles.length)

      this.app.ticker.add(delta => this.gameLoop(delta))
    },
    gameLoop (delta) {
      this.mousePosition = this.getMousePosition()
      this.particles.forEach(element => {
        element.update(this.mousePosition.x, this.mousePosition.y)
      })
    },
    getMousePosition () {
      return this.app.renderer.plugins.interaction.mouse.global
    }
  }
}

class Particle {
  speedX = 0
  speedY = 0
  maxSpeed = 80

  rendererWidth = 512
  rendererHeight = 512

  frameWidth = 12
  frameHeight = 12

  constructor (posX, posY, scale, baseTexture, pixiAPP) {
    this.sprite = new PIXI.Sprite(new PIXI.Texture(baseTexture))
    this.sprite.scale.set(scale, scale)
    this.posX = posX
    this.posY = posY

    this.sprite.texture.frame = new PIXI.Rectangle(
      posX / scale,
      posY / scale,
      this.frameWidth / scale,
      this.frameHeight / scale
    )
    this.sprite.x = Math.random() * this.rendererWidth
    this.sprite.y = Math.random() * this.rendererHeight
    this.pixiApp = pixiAPP

    pixiAPP.stage.addChild(this.sprite)
  }

  update (mouseX, mouseY) {
    this.speedX = (this.posX - this.sprite.x) / this.rendererWidth * this.maxSpeed
    this.speedY = (this.posY - this.sprite.y) / this.rendererHeight * this.maxSpeed

    const distance = Math.sqrt(Math.pow(mouseX - this.sprite.x, 2) + Math.pow(mouseY - this.sprite.y, 2))
    if (distance < 50) {
      const accX = (mouseX - this.sprite.x)
      this.speedX -= accX / 4

      const accY = (mouseY - this.sprite.y)
      this.speedY -= accY / 4
    } else if (distance > 100 && this.posX !== this.sprite.x) {
      this.speedX = (this.posX - this.sprite.x) / this.rendererWidth * this.maxSpeed * 2
      this.speedY = (this.posY - this.sprite.y) / this.rendererHeight * this.maxSpeed * 2
    }

    this.sprite.x += this.speedX
    this.sprite.y += this.speedY
  }

  destroy () {
    this.pixiAPP.stage.removeChild(this.sprite)
    this.sprite.destroy()
  }
}
</script>
