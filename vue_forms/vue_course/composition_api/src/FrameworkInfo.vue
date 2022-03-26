<template>
    <div class="card">
        <p>Название: <strong>{{ name }}</strong></p>
        <p>Версия: <strong>{{ version }} ({{doubleVersion}})</strong></p>
        <button class="btn warning" @click="changetoThree">Изменить на 3 версию</button>
    </div>
</template>

<script>
import {computed, inject} from 'vue'
    export default {
        emits: ['change-version'],
        setup(props, context) {

           function change() {
               context.emit('change-version', 3)
           }

           const version = inject('version')


           return {
               name: inject('name'),
               version,
               doubleVersion: computed(() => version.value*2),
               changetoThree: change
           }
       }
    }
</script>

<style lang="scss" scoped>

</style>