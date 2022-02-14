<template>
  <div class="container pt-1">
    <div class="card">
      <acync-component></acync-component>
      <h2>Динамические и асинхронные компоненты</h2>

      <app-button ref = 'myBtn' :color= "oneColor" @action = "active = 'one'">One</app-button>
      <app-button :color= "twoColor" @action = "active = 'two'">Two</app-button>
    </div>

    <!-- <app-text-1 v-if = "active == 'one'"></app-text-1>
    <app-text-2 v-else-if = "active == 'two'"></app-text-2> -->
    <!-- //динамическая подстановка нужного помпонента -->
    <keep-alive>
      <component :is="componentName"></component>
    </keep-alive>
  </div>
</template>

<script>
  import AppButton from './AppButton.vue'
  import AppTextOne from './AppText1.vue'
  import AppTextTwo from './AppText2.vue'
  export default {
    data() {
      return {
        active: 'one'
      }
    },
    mounted() {
        // setTimeout( ()=> {
        //   this.componentName = 'new comp. name'
        // }, 1000)
        this.$refs.myBtn.btnLog()
    },
    computed: {
      // componentName() {
      //   // if (this.active == 'one') {
      //   //   return 'app-text-1'
      //   // }
      //   // else {
      //   //   return 'app-text-2'
      //   // }
      //   return 'app-text-' + this.active
      // },
      componentName: {
        get() {
          return 'app-text-' + this.active
        },
        set(value) {
          console.log('componentName', value)
        }
      },
      oneColor() {
        return this.active == 'one' ? 'primary' : ''
      },
      twoColor() {
        return this.active == 'two' ? 'primary' : ''
      }
    },
    components: {
      AppButton, AppTextOne, AppTextTwo
    }
  }
</script>

<style lang="scss" scoped>

</style>