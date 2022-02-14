<template>
    <button class="btn" :class= "color" @click= "$emit('action')"><slot></slot></button>
</template>
slot указывает что мы отслеживаем текст из родительского блока

<script>
    export default {
        emits: ['action'],
        props: {
            color: {
                type: String,
                default: '',
                // валидация из нескольких значений
                validator(value) {
                    return ['', 'primary', 'danger'].includes(value)
                }
            }
        },
        methods: {
            btnLog() {
                console.log('Button log')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>