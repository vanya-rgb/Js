<template>
  <div id="app">
    <h1>bersdfsdberb</h1>
    <addTodo
      @add-todo= "addTodo"
    
    />
    <ToDoList 
      v-bind:todos="todos"
      @remove-todo = "removeTodo"
    />
  </div>
</template>

<script>
import ToDoList from '@/components/list'
import addTodo from '@/components/addTodoComp'

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
    ToDoList, addTodo
  },
  methods: {
    removeTodo(id) {
      this.todos = this.todos.filter(el=> el.id !== id)
    },
    addTodo(todo) {
      this.todos.push(todo)
    }
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
