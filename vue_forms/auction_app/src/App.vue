<template>
  <div>
    <component :is="layout + '-layout'" v-if="layout">
    </component>
  </div>
</template>

<script>
import MainLayout from './layout/MainLayout.vue'
import AuthLayout from './layout/AuthLayout.vue'
import {useRoute} from 'vue-router'
import {computed} from 'vue'

export default {
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  },
  data() {
    return {
      isAuth: true
    }
  },
  methods: {
    login() {
      this.isAuth = true
      //query параметры
      if(this.$route.query.page) {
        this.$router.push(this.$route.query.page)
      } else {
        this.$router.push('/')
      }

    },
    logout() {
      this.isAuth = false
      this.$router.push({
        path: '/',
        //route отображает текущий url адрес
        //path путь на котором мы находимся
        query: {
          page: this.$route.path
        }
      })
    },
    provide() {
      return {
        login: this.login,
        logout: this.logout,
      }
    }
  },

  components: {
    MainLayout, AuthLayout
  }
}
</script>

<style>
  
</style>
