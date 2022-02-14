<template>
    <div class="card">
        <ul>
            <li v-for = "(item, idx) in 5" :key="item">
                <slot :iter="item" :idx = "idx"></slot>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>