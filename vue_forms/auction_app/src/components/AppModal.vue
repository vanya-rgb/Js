<template>
<div>
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">
        <h3>Все отлично!</h3>
        <p>Жмякай кнопку чтобы продолжить.</p>
        <button class="btn primary" @click="$emit('toPrivateCabinet')">Дальше</button>
    </div>
</div>
</template>

<script>
    export default {
        emits: ['close', 'toPrivateCabinet']
    }
</script>

<style lang="scss" scoped>

</style>