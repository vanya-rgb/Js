<template>
    <div>

    </div>
</template>

<script>
    export default {
        props: ['title'],
        watch: {
            title: {
                immediate: true,
                handler() {
                    document.title = this.title;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>