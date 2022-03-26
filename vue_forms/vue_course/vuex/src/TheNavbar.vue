<template>
  <header class="navbar">
    <strong>Counter {{ counter }}</strong>
    <button class="btn" @click="add">Add 5</button>
  </header>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
  export default {
    computed: {
      // counter() {
      //   return this.$store.getters['count/counter']
      // },
      //... = spread
      ...mapGetters('count', ['counter'])
    },
    methods: {
      //добавили новый метод в компонент
      ...mapMutations({
        addFive: 'count/add'
      }),
      add() {
        this.addFive({value: 5})
        // this.$store.commit('add', {
        //   value: 5,
        // })
        // this.$store.commit({
        //   type: 'add',
        //   value: 5
        // })
      }
    }
  }
</script>
