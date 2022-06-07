<template>
    <div>
        <ul class="navbar-menu">
            <li class="content" @click="$emit('createReq')">Создать заявку</li>
            <li class="content">Найти челика</li>
            <li class="content">Удалить аккаунт</li>
        </ul>
    </div>
</template>

<script>
    export default {
        emits: ['createReq']
        
    }
</script>

<style lang="scss" scoped>

</style>