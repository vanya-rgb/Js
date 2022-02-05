<template>
    <div>
        <ul>
            <ToDoItem
                v-for="(todo, i) in todos" :key="todo.todoId"
                v-bind:todo="todo"
                v-bind:index="i"
                v-on:remove-todo="removeTodo"
            />
        </ul>
    </div>
</template>

<script>
import ToDoItem from '@/components/toDoItem'
export default {
    props: ['todos'],
    components: {
        ToDoItem
    },
    methods: {
        removeTodo(id) {
            this.$emit('remove-todo', id)
        }
    }
}
</script>

<style scoped>
    ul {
        margin: 0;
        padding: 0;
    }
</style>