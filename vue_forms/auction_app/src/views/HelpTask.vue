<template>
    <div>
        <div class="question" @click="show = !show">{{text}}
        </div>
        <div v-if="show" @click="show = !show">{{answer}}
        </div>
    </div>
</template>

<script>

    export default {
        props: ['text', 'answer'],
        data(){
            return{
                show: false
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>