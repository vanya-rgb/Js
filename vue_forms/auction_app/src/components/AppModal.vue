<template>
<div>
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">
        <h3>All right!</h3>
        <p>Push the button to continue</p>
        <button class="btn primary" @click="$emit('toPrivateCabinet')">forward</button>
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