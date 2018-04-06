<template>
  <div class="practices">
    <Init v-if="showComponents('init')"></Init>
    <StageRender v-if="showComponents('stagerender')"></StageRender>
    <Texture v-if="showComponents('texture')"></Texture>
    <Sprite v-if="showComponents('sprite')"></Sprite>
    <Tileset v-if="showComponents('tileset')"></Tileset>
    <Atlas v-if="showComponents('atlas')"></Atlas>
    <Movement v-if="showComponents('movement')"></Movement>
    <Keyboard v-if="showComponents('keyboard')"></Keyboard>
  </div>
</template>

<script>
import Init from './01-init'
import StageRender from './02-stage-render'
import Texture from './03-texture'
import Sprite from './04-sprite'
import Tileset from './05-tileset-image'
import Atlas from './06-tileset-atlas'
import Movement from './07-movement'
import Keyboard from './08-keyboard'

export default {
  name: 'GetStart',
  components: {
    Init,
    StageRender,
    Texture,
    Sprite,
    Tileset,
    Atlas,
    Movement,
    Keyboard
  },
  methods: {
    showComponents (component) {
      return this.$route.params.componentName === component
    }
  }
}
</script>
