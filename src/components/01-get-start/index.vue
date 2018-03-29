<template>
  <div class="practices">
    <init v-if="showComponents('init')"></init>
    <test v-if="showComponents('test')"></test>
  </div>
</template>

<script>
import Init from './01-init'
import Test from './02-test'

export default {
  name: 'GetStart',
  components: {
    Init,
    Test
  },
  methods: {
    showComponents (component) {
      return this.$route.params.componentName === component
    }
  }
}
</script>
