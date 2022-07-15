<template>
    <div>
        <ul class="navbar-menu">
            <li class="content" @click="$emit('createReq')">Создать заявку</li>
            <li class="content" @click="$emit('findUser')">Найти челика</li>
        </ul>
        <router-link :to="{name: 'Edit', params: {localId}}">
                    <font-awesome-icon icon="fa-solid fa-gears" id="icon" size="2x"/>
        </router-link>
    </div>
</template>

<script>
    export default {
        emits: ['createReq', 'findUser'],
        props: ['localId']
    }
</script>

<style scoped>

#icon:hover {
    color: #3eaf7c;
}

a {
    color: unset;
}

</style>