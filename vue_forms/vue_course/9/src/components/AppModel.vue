<template>
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">
        <h3>Заголовок модалки</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas omnis iusto magnam consectetur tempore tenetur modi soluta? Rem, saepe quidem.</p>
    </div>
</template>

<script>
    export default {
        emits: ['close']
    }
</script>

<style lang="scss" scoped>

</style>