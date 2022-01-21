<template>
  <div id="app">
    <h1>bersdfsdberb</h1>
    <ToDoList 
      v-bind:todos="todos"
    />
  </div>
</template>

<script>
import ToDoList from '@/components/list'
export default {
  name: 'App',
  data() {
    return {
      todos: [
        {id: 1, title: 'Buy eggs', complited: false},
        {id: 2, title: 'Buy bread', complited: false},
        {id: 3, title: 'Buy cookies', complited: false},
      ]
    }
  },
  components: {
    ToDoList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
