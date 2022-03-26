<template>
    <div class="alert" :class="type" @click="$emit('close')">
        <p class="atert-title">{{ title }}</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    </div>
</template>

<script>
    export default {
        emits: ['close'],
        props: ['title', 'type']
    }
</script>

<style lang="scss" scoped>

</style>