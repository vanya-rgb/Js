<template>
    <div>
        <ul class="navbar-menu">
            <li class="content" @click="$emit('createReq')">Создать заявку</li>
            <li class="content" @click="$emit('findUser')">Найти челика</li>
            <li class="content">Удалить аккаунт</li>
        </ul>
    </div>
</template>

<script>
    export default {
        emits: ['createReq', 'findUser']
        
    }
</script>

<style lang="scss" scoped>

</style>