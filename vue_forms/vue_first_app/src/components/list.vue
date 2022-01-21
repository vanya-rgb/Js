<template>
    <div>
        <ul>
            <ToDoItem
                v-for="todo in todos" :key="todo.todoId"
                v-bind:todo="todo"
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
    }
}
</script>

<style scoped>
    ul {
        margin: 0;
        padding: 0;
    }
</style>