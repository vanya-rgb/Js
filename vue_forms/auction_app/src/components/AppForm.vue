<template>
    <div class="container">
      <form class="card" @submit.prevent="submit">
          <h1>Registration form</h1>
        <div :class="['form-control', {invalid:fnError}]">
            <label for="firstName">What is your name?</label>
            <input type="text" id="firstName" placeholder="Enter your name" v-model="firstName" @blur="fnBlur">
            <small v-if="fnError">{{fnError}}</small>
        </div>
        <div :class="['form-control', {invalid:snError}]">
            <label for="secondName">What is your last name?</label>
            <input type="text" id="secondName" placeholder="Enter last name" v-model="secondName" @blur="snBlur">
            <small v-if="snError">{{snError}}</small>
        </div>

        <div :class="['form-control', {invalid:lError}]">
            <label for="login">Enter login</label>
            <input type="text" id="login" placeholder="Enter login here" v-model="login" @blur="lBlur">
            <small v-if="lError">{{lError}}</small>
        </div>

        <div :class="['form-control', {invalid:eError}]">
            <label for="email">Enter email</label>
            <input type="email" id="email" placeholder="Enter email here" v-model="email" @blur="eBlur">
            <small v-if="eError">{{eError}}</small>
        </div>

        <div :class="['form-control', {invalid:pError}]">
            <label for="password">Enter password</label>
            <input type="password" id="password" placeholder="Enter password" v-model="password" @blur="pBlur">
            <small v-if="pError">{{pError}}</small>
        </div>
        
        <div :class="['form-control', {invalid:rpError}]">
            <label for="repeatPassword">Reenter password</label>
            <input type="password" id="repeatPassword" placeholder="Enter password" v-model="repeatPassword" @blur="rpBlur" @change="isEqual">
            <small v-if="rpError">{{rpError}}</small>
        </div>

        <div class="form-checkbox">
            <div class="checkbox">
                <label for=""><input v-model="sex" type="radio" value="male" name="sex">male</label>
            </div>
            <div class="checkbox">
                <label for=""><input v-model="sex" type="radio" value="female" name="sex">female</label>
            </div>
            <div class="checkbox">
                <label for=""><input v-model="sex" type="radio" value="combat_helicopter" name="sex">combat helicopter</label>
            </div>
            
        </div>

        <div class="form-control">
            <label for="age">How old are you?</label>
            <input type="number" id="age" v-model.number= "age">
        </div>

        <button class="btn primary" type="submit"
            :disabled="isSubmitting">Send</button>
      </form>
    <app-modal
        v-if="modal"
        @close="modal = false"
        @toPrivateCabinet="navigate"
    ></app-modal>
  </div>
</template>

<script>
import AppModal from './AppModal.vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {ref} from 'vue'
    export default {
        setup(){
            const router = useRouter()
            const store = useStore()
            
            const {handleSubmit, isSubmitting} = useForm()

            const {value: firstName, errorMessage: fnError, handleBlur: fnBlur} = useField(
                'firstName',
                yup.string().trim().required('Input name')
            )
            const {value: secondName, errorMessage: snError, handleBlur: snBlur} = useField(
                'secondName',
                yup.string().trim().required('Input surname')
            )
            const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
                'email',
                yup.string().trim().required('Input email').email('Correct email required')
            )
            const PASS_MIN_LEN = 6
            const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
                'password',
                yup.string().trim().required('Input password').min(PASS_MIN_LEN, `Length must be at least ${PASS_MIN_LEN} characters`)
            )
            const {value: repeatPassword, errorMessage: rpError, handleBlur: rpBlur} = useField(
                'repeatPassword',
                yup.string().trim().required('Input password').min(PASS_MIN_LEN, `Length must be at least ${PASS_MIN_LEN} characters`)
            )
            const {value: login, errorMessage: lError, handleBlur: lBlur} = useField(
                'login',
                yup.string().trim().required('Input login')
            )

            const age = ref(23)
            const sex = ref('combat_helicopter')
            const modal = ref(false)



            const submit = handleSubmit(() => {
                const newUser = {
                    firstName: firstName.value,
                    secondName: secondName.value,
                    email: email.value,
                    password: password.value,
                    login: login.value,
                    age: age.value,
                    sex: sex.value
                }
                console.log(newUser)
                store.dispatch('createUser', newUser)
               
                modal.value = true
            })
            function navigate() {
                return router.push('/auth')
            }
            function isEqual() {
                return password == repeatPassword
            }
            
            return {
                submit, navigate, isSubmitting, isEqual,
                firstName, fnError, fnBlur,
                secondName, snError, snBlur,
                email, eError, eBlur,
                password, pError, pBlur,
                repeatPassword, rpError, rpBlur,
                login, lError, lBlur,
                age, sex, modal
            }
        },
  components: {
    AppModal
  }
    }
</script>

<style scoped>
    .form-control small {
    color: red;
  }

  .form-control.invalid input {
    border-color: red;
  }

  .highlight {
      color: red;
  }
</style>