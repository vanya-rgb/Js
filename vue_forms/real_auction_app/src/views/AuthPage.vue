<template>
    <div>
        <title-component title="Вход в систему"></title-component>
        <form class="card" @submit.prevent="onSubmit">
            <h1>Войти в систему</h1>

            <div :class="['form-control', {invalid: eError}]">
                <label for="id">Email</label>
                <input type="Email" id="Email" v-model="email" @blur="eBlur">
                <small v-if="eError">{{eError}}</small>
            </div>

            <div :class="['form-control', {invalid: pError}]">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" @blur="pBlur">
                <small v-if="pError">{{pError}}</small>
            </div>

            <button class="btn primary" type="submit" :disabled="isSubmitting">Войти</button>
            <!-- Регистрация -->
            <router-link to="/reg">
                <button  button class="btn" type="button">Регистрация</button>
            </router-link>
            <router-link to="/forgot">
                <a href="" @click="clearMessage">Забыли пароль?</a>
            </router-link>
            <div class="text-danger"
            v-if="leftTwo">У вас осталось 2 попытки.</div>
            <div class="text-danger"
            v-if="leftOne">Аккуратней! Осталось только одна попытка.</div>
            <div class="text-danger"
            v-else-if="isTooManyAttempts">Шучу, тыкайтесь сколько хотите:)</div>
        </form>

       
    </div>
</template>

<script>
import {useLoginForm} from '../use/login-form'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {error} from '../utils/error'
// import {ref} from 'vue'
import titleComponent from '@/components/ui/titleComponent.vue'

    export default {
        setup(){
            const route = useRoute()
            const store = useStore()
            //прозьба войти в систему
            if (route.query.message) {
                store.dispatch('setMessage', {
                    value: error(route.query.message),
                    type: 'warning'
                })
            }
            //очистка сообщений
            const clearMessage = () => {
                store.commit('clearMessage')
            } 
            // const time = ref(300000)
            //нужен чтобы ловить статус при перезагрузке  страницы
            //const attemptsCountFromStorage = ref()
            //attemptsCountFromStorage.value = localStorage.getItem('isTooManyAttempts')

            return {...useLoginForm(), clearMessage}
        },
        components: {
            titleComponent
        }
    }
</script>

<style>
.text-danger {
    margin-top: 10px;
    /* margin-bottom: 10px; */
}
a {
    margin-top: 10px;
}
a:hover {
    color: #42c288;
}

</style>