<template>
  <div class="practices">
    <Mouse v-if="showComponents('mouse')"></Mouse>
    <particle v-if="showComponents('particle')"></particle>
    <ParticleTwo v-if="showComponents('text-practile')"></ParticleTwo>
  </div>
</template>

<script>
import Mouse from './01-mouse-follow'
import Particle from './02-particle'
import ParticleTwo from './03-particle2'

export default {
  name: 'GetStart',
  components: {
    Mouse,
    Particle,
    ParticleTwo
  },
  methods: {
    showComponents (component) {
      return this.$route.params.componentName === component
    }
  }
}
</script>
