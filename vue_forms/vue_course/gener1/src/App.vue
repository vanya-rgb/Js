<template>
  <div>
    <component :is="layout + '-layout'" v-if="layout"></component>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {computed} from 'vue'
import MainLayout from './layout/MainLayout.vue'
import AuthLayout from './layout/AuthLayout.vue'

export default ({
  setup() {
    const route = useRoute()
    return {
      layout: computed(()=>route.meta.layout)
    }
  },
  components: {
    MainLayout, AuthLayout
  }
})
</script>

