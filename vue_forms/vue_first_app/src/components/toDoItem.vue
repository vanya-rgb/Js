<template>
    <li>
        {{ todo.title }}
        <span>
            <input type="checkbox">
            <strong>{{todo.id}}</strong>
            {{todo.title}}
        </span>
        <button>&times;</button>
    </li>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true
        }
    }
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
</style>