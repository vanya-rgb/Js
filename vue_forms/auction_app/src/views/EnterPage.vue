<template>
  <form class="card" @submit.prevent="submit">
    <h2>Authorization</h2>
    <div :class="['form-control', {invalid:eError}]">
      <label for="email">Email</label>
      <input type="text" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{eError}}</small>
    </div>

    <div :class="['form-control', {invalid:pError}]">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting" type="submit">Войти</button>
    <!-- //пример работы router -->
    <router-link to="/forget">
      <button class="btn warning">Забыл пароль</button>
    </router-link>
    <router-link to="/create">
      Create account
    </router-link>
  </form>
</template>

<script>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const {handleSubmit, isSubmitting} = useForm()
        const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
          'email',
          yup.string().trim().required('Input email').email('Correct email required')
        )
        const PASS_MIN_LEN = 6
        const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
          'password',
          yup.string().trim().required('Input password').min(PASS_MIN_LEN, `Length must be at least ${PASS_MIN_LEN} characters`)
        )

        const submit = handleSubmit(() =>{
          store.dispatch('changeAuthStatus')
          router.push('/')
        })

        return {
            submit, isSubmitting,
            password, pError, pBlur,
            email, eError, eBlur
        }
    },
}
</script>

<style scoped>

</style>