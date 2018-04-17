<template>
  <div class="practices">
    <Mouse v-if="showComponents('mouse')"></Mouse>
  </div>
</template>

<script>
import Mouse from './01-mouse-follow'

export default {
  name: 'GetStart',
  components: {
    Mouse
  },
  methods: {
    showComponents (component) {
      return this.$route.params.componentName === component
    }
  }
}
</script>
