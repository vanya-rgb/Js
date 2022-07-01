<template>
    <div>
        <ul class="navbar-menu">
            <li class="content" @click="$emit('createReq')">Создать заявку</li>
            <li class="content" @click="$emit('findUser')">Найти челика</li>
            <li class="content">
                <router-link :to="{name: 'Edit', params: {localId}}">Редактировать профиль</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        emits: ['createReq', 'findUser'],
        props: ['localId']
    }
</script>

<style lang="scss" scoped>

</style>