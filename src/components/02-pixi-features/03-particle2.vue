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
      particles: [],
      subStage: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.app = new this.$PIXI.Application({
        width: 1024,
        height: 512,
        antialias: true
      })
      const elem = this.$refs.pixiRenderer
      elem.appendChild(this.app.view)

      // this.particleContainer = new this.$PIXI.ParticleContainer()
      // this.app.stage.addChild(this.particleContainer)
      this.setup()
    },
    setup () {
      var text = new PIXI.Text('ETHAN', {
        fontWeight: 'bold',
        fontSize: 180,
        fontFamily: 'Arial',
        fill: '#FFFFFF',
        align: 'center'
      })

      text.anchor.set(0.5)
      text.x = this.app.renderer.width / 2
      text.y = this.app.renderer.height / 2

      this.app.stage.addChild(text)
      console.log(this.app.stage)
      const tmpCanvas = this.app.renderer.plugins.extract.canvas(this.app.stage)
      const imageData = tmpCanvas.getContext('2d').getImageData(0, 0, this.app.renderer.width, this.app.renderer.height)
      this.app.stage.removeChild(text)

      const particleSpace = 5
      const widthDiff = (this.app.renderer.width - tmpCanvas.width) / 2
      const heightDiff = (this.app.renderer.height - tmpCanvas.height) / 2

      for (var y = 0; y < tmpCanvas.height; y += particleSpace) {
        for (var x = 0; x < tmpCanvas.width; x += particleSpace) {
          if (imageData.data[((y * imageData.width + x) * 4) + 3] > 100) {
            this.particles.push(new Particle(x + widthDiff, y + heightDiff, this.app.stage))
          }
        }
      }

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

  constructor (posX, posY, stage) {
    this.posX = posX
    this.posY = posY

    this.line = new PIXI.Graphics()

    this.line.lineStyle(1, 0xffd900, 1)
    this.line.moveTo(0, 0)
    this.line.quadraticCurveTo(0, 0, 1, 1)
    this.line.x = this.posX
    this.line.y = this.posY

    stage.addChild(this.line)
  }

  update (mouseX, mouseY) {
    this.speedX = (this.posX - this.line.x) / this.rendererWidth * this.maxSpeed
    this.speedY = (this.posY - this.line.y) / this.rendererHeight * this.maxSpeed

    const distance = Math.sqrt(Math.pow(mouseX - this.line.x, 2) + Math.pow(mouseY - this.line.y, 2))
    if (distance < 25) {
      const accX = (mouseX - this.line.x)
      this.speedX -= accX / 4

      const accY = (mouseY - this.line.y)
      this.speedY -= accY / 4
    }

    this.line.x += this.speedX
    this.line.y += this.speedY
  }

  // destroy () {
  //   this.pixiAPP.stage.removeChild(this.sprite)
  //   this.sprite.destroy()
  // }
}

// var particles = [],
//     controllers = [],
//     graphicsCords = [],
//     texture,
//     isReady = false,
//     settings = {
//       text: '( ͡° ͜ʖ ͡°)',
//       textSize: 250,
//       spaceBetween: 4,
//       sizeMax: 4,
//       speedMin: 0.01,
//       speedMax: 0.075,
//       opacityMin: 1,
//       particleType: 'circle',
//       color1: '#50514F',
//       color2: '#F25F5C',
//       color3: '#FFE066',
//       color4: '#247BA0',
//       color5: '#70C1B3',
//       backgroundColor: '#EEEEEE'
//     };

// var app = new PIXI.Application(window.innerWidth, window.innerHeight, { antialias: true });
// document.body.appendChild(app.view);

// var sprites = new PIXI.ParticleContainer(30000, {
//   scale: true,
//   position: false,
//   rotation: false,
//   uvs: false,
//   alpha: false
// })
// app.stage.addChild(sprites)

// app.ticker.add(function() {
//   if (!isReady) {
//     setup()
//   }

//   for (var i = 0, len = particles.length; i < len; i++) {
//     particles[i].update()
//   }
// })

// function setup() {
//   app.renderer.backgroundColor = settings.backgroundColor.replace('#', '0x')
//   colors = [settings.color1, settings.color2, settings.color3, settings.color4, settings.color5]

//   particles = []
//   graphicsCords = []

//   texture = createTexture()

//   var text = new PIXI.Text(settings.text, {
//     fontWeight: 'bold',
//     fontSize: settings.textSize,
//     fontFamily: 'Arial',
//     fill: '#000000',
//     align: 'center'
//   })

//   text.anchor.set(0.5)
//   text.x = app.renderer.width / 2
//   text.y = app.renderer.height / 2

//   app.stage.addChild(text)

//   var widthDiff = (app.renderer.width - tmpCanvas.width) / 2
//   var heightDiff = (app.renderer.height - tmpCanvas.height) / 2

//   if (widthDiff < 0) {
//     widthDiff = 0
//   }

//   if (heightDiff < 0) {
//     heightDiff = 0
//   }

//   app.stage.removeChild(text)

//   var tmpX = tmpY = colorIndex = tmpScale = tmpScaleMin = tmpScaleMax = tmpSpeed = 0, cords, t;
//   for (var y = 0; y < tmpCanvas.height; y += settings.spaceBetween) {
//     for (var x = 0; x < tmpCanvas.width; x += settings.spaceBetween) {
//       if (imageData.data[((y * imageData.width + x) * 4) + 3] > 128) {
//         particles.push(new Particle(x + widthDiff, y + heightDiff));
//       }
//     }
//   }

//   shuffle(particles);

//   for (var i = 0, len = particles.length; i < len; i++) {
// sprites.addChild(particles[i]);
//   }

//   isReady = true;
// }

// function createTexture() {
//   var graphics = new PIXI.Graphics(),
//       xCounter = 0,
//       yCounter = 0,
//       size = settings.sizeMax,
//       colorTmp,
//       spacer = 2;

//   for (var i = 0, len = colors.length; i < len; i++) {
//     xOffset = xCounter * (size * 2) + size + (xCounter * spacer);
//     yOffset = yCounter * (size * 2) + size + (yCounter * spacer);

//     colorTmp = colors[i].replace('#', '0x');

//     graphics.beginFill(colorTmp);
//     graphics.drawCircle(xOffset, yOffset, size, size);
//     graphics.endFill();

//     graphicsCords.push({ x: xOffset - size, y: yOffset - size });

//     if (xOffset >= app.renderer.width - (size * 2) - size) {
//       xCounter = 0;
//       yCounter++;
//     } else {
//       xCounter++;
//     }
//   }

//   return graphics.generateTexture();
// }

// function Particle(x, y) {
//   this.scaleMin = getRandom(0.1, 0.25);
//   this.scaleMax = getRandom(0.75, 1);
//   this.baseScale = getRandom(this.scaleMin, this.scaleMax);
//   this.velocity = getRandom(settings.speedMin, settings.speedMax);
//   this.speed = 0;

//   var cords = graphicsCords[getRandomInt(0, colors.length - 1)];
//   var t = new PIXI.Texture(texture.baseTexture, new PIXI.math.Rectangle(cords.x, cords.y, settings.sizeMax * 2, settings.sizeMax * 2));

//   PIXI.Sprite.call(this, t);

//   this.position.x = x;
//   this.position.y = y;
//   this.anchor.x = this.anchor.y = 0.5;
//   this.scale.x = this.scale.y = this.baseScale;
//   this.alpha = getRandom(settings.opacityMin, 1);
// }

// Particle.prototype = Object.create(PIXI.Sprite.prototype);

// Particle.prototype.update = function() {
//   this.baseScale = Math.abs(Math.sin(this.speed)) + this.scaleMin;
//   this.scale.x = this.scale.y = this.baseScale;
//   this.speed += this.velocity;
// }

// /**********************************************************************/

// function getRandom(min, max) {
//   return Math.random() * (max - min) + min;
// }

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function shuffle(a) {
//   var j, x, i;
//   for (i = a.length; i; i--) {
//     j = Math.floor(Math.random() * i);
//     x = a[i - 1];
//     a[i - 1] = a[j];
//     a[j] = x;
//   }
// }

</script>
