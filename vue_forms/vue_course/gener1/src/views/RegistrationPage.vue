<template>
    <div>
        <form class="card" @submit.prevent="onSubmit">
            <div class="breadcrumbs">
                <router-link to="/auth" class="text">К авторизации</router-link>
            </div>
            <h1>Регистрация</h1>

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
            

            <button class="btn primary" type="submit" :disabled="isSubmitting">Зарегистрироваться</button>
        </form>

       
    </div>
</template>

<script>
import {useRegistrationForm} from '../use/registrate-form'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {error} from '../utils/error'



    export default {
        setup(){
            const route = useRoute()
            const store = useStore()
            if (route.query.message) {
                store.dispatch('setMessage', {
                    value: error(route.query.message),
                    type: 'warning'
                })
            }
            
            return {...useRegistrationForm()}
        }
    }
</script>

<style lang="scss" scoped>

</style>