<template>
  <div>
    Hello World
  </div>
</template>

<script>
export default {
  mounted () {
    // test if pixi init
    let type = 'WebGL'
    if (!this.$PIXI.utils.isWebGLSupported()) type = 'canvas'
    this.$PIXI.utils.sayHello(type)
  }
}
</script>
