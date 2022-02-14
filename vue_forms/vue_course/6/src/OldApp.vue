<template>
  <div class='container pt-1'>
    <div class="card">
      <!-- //глобально //лежит в main -->
      <the-header></the-header>
      <h2>Actual news {{now}}</h2>
      <span>Open: <strong>{{openRate}}</strong> | Read <strong>{{ readRate }}</strong></span>
    </div>

    <app-news
      v-for="item in news"
      :key="item.id"
      :title = "item.title"
      :id = "item.id"
      :is-open = "item.isOpen"
      :was-read = "item.wasRead"
      @open-news= "openNews"
      @read-news = "readNews"
      @unmark = "unreadNews"
    >
    <!-- произошло событие в дочернем файле -->
    <!-- выполняем метод openNews при событии open в дочернем классе -->
    </app-news>
  </div>
</template>

<script>
import AppNews from "./AppNew.vue";

export default {
  name: 'App',
  data() {
    return {
      now: new Date().toLocaleDateString(),
      news: [
        {
          title: 'Joe Biden won',
          id: 1,
          isOpen: false,
          wasRead: false
        },
        {
          title: 'Vue 3 work',
          id: 2,
          isOpen: false,
          wasRead: false
        }
      ],

      openRate: 0,
      readRate: 0
    }
  },
  provide() {
    return {
      title: 'News list',
      news: this.news
    }
  },
  components: {
    'app-news': AppNews
  },
  methods: {
    openNews() {
      this.openRate ++
    },
    readNews(id) {
      const idx = this.news.findIndex(news => news.id === id)
      this.news[idx].wasRead = true
      this.readRate ++
    },
    unreadNews(id) {
      const news = this.news.find(news => news.id === id)
      news.wasRead = false
      this.readRate --
    }
  }
}
</script>

// scoped - отслеживать стили только для этого файла
<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  h2 {
    color: darkkhaki;
  }
</style>
