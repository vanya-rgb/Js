<template>
  <div>
    <div class="container column">
      <app-new-form @block-added="addBlock"></app-new-form>
      <app-vies :blocks="blocks"></app-vies>
    </div>

    <div class="container">
      <div class="loader" v-if="loading"></div>
      <!-- //комментарии -->
      <app-comments v-else :comments="comments" @load-comments="loadComments"></app-comments>
    </div>
  </div>
</template>

<script>
import AppNewForm from './components/AppNewForm.vue'
import AppVies from './components/AppView.vue'
import AppComments from './components/AppComments.vue'


export default {
  data() {
    return {
      blocks: [],
      loading: false,
      comments: []
    }
  },
  methods: {
    addBlock(block) {
      this.blocks.push(block)
      console.log(this.blocks)
    },
    async loadComments() {
      this.loading = true
      const result = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=42')
      this.comments = await result.json()
      this.loading = false

    }
  },
  components: {
    AppNewForm,
    AppVies,
    AppComments
  }
}
</script>

