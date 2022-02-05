<template>
    <li>
        <span v-bind:class="{done: todo.complited}">
            <input type="checkbox" 
            v-on:change="todo.complited = !todo.complited">
            <strong>{{index + 1}}</strong>
            {{todo.title}}
        </span>
        <button class="rm" v-on:click="$emit('remove-todo', todo.id)">&times;</button>
    </li>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        },
        index: Number
    },
    
}
</script>

<style scoped>
    li {
        display: flex;
        justify-content: space-between;
        padding: .5rem 2rem;
        border: 1px solid #ccc;
        margin-bottom: 1rem;
    }

    .rm {
        background: red;
        color: #fff;
        border-radius: 50%;
        font-weight: bold;
    }

    input {
        margin-right: 1rem;
    }

    .done {
        text-decoration: line-through;
    }
</style>