<template>
    <div>
        <app-alert v-if="alert" title="Работаем c Composition" type="primary"
        @close="close"
        ></app-alert>

        <div class="card">
            <h1>Переиспользование</h1>

            <button class="btn primary" @click="toggle">{{ alert ? "Закрыть" : "Показать" }} сообщение</button>
            <button class="btn" @click="navigate">Перейти на главную</button>
        </div>
    </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'
import AppAlert from '../AppAlert.vue'
import {useAlert} from '../use/alert'
    export default {
        setup() {
            // const {alert, close, toggle} = useAlert()
            const router = useRouter()
            const route = useRoute()
            console.log(route)

            const navigate = () => router.push('/')

            return {
                navigate,
                ...useAlert()
            }
        },
        components: {
            AppAlert
        }
    }
</script>

<style lang="scss" scoped>

</style>