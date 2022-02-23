<template>
  <div class="contaner">
    <div class="card">
      <h2>{{$i18n('app.title')}}</h2>

      <button class="btn" @click="changeLang">{{$i18n('app.button')}}</button>
      <button class="btn primary" @click="modal = true">Открыть модалку</button>

      <teleport to="body" disabled>
        <app-modal v-if="modal"
        @close="modal = false"  
        ></app-modal>
      </teleport>

      
    </div>
  </div>
</template>

<script>
import AppModal from './components/AppModel.vue'
  export default {
    // mounted() {
    //   this.$alert('dsfdsf')
    // }
    data() {
      return {
        modal: false
      }
    },
    methods: {
      changeLang() {
        this.changeI18N('en')
        this.$forceUpdate()
      }
    },
    inject: ['changeI18N'],
    components: {
      AppModal
    }
  }
</script>

<style lang="scss" scoped>

</style>