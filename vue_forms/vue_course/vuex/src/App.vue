<template>
  <div class="container with-nav">
    <the-navbar></the-navbar>
    <div class="card">
      <h1>{{uppercaseTitle}}</h1>
      <h2>Счетчик {{ counter }} ({{doubleCounter}})</h2>
      <button class="btn primary" @click="add">Добавить</button>
      <button class="btn primary"
      @click="incrementAsync({value: 10,delay: 1500})">Добавить 10</button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import TheNavbar from './TheNavbar.vue'
export default {
  components: {TheNavbar},
  // data() {
  //   return {
  //     counter: 0
  //   }
  // },
  computed: {
    ...mapGetters(['uppercaseTitle']),
    ...mapGetters('count', ['counter', 'doubleCounter'])
  },
  methods: {
    ...mapMutations({add: 'count/increment'}),
    //добавили через map функция стала излишна
    // add() {
    //   //передача mutations
    //   this.increment()
    // },
    ...mapActions('count', ['incrementAsync']),
    // incrementAcync() {
    //   this.$store.dispatch('incrementAsync', {
    //     value: 10,
    //     delay: 1500
    //   })
    // }
  }
}
</script>
