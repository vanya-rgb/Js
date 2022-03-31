<template>
    <div class="container">
      <form class="card" @submit.prevent="submitHandler">
          <h1>Registration form</h1>
        <app-input
          type = "text"
          placeholder="Enter your name"
          :error = "errors.firstName"
          label = "What is your name?"
          v-model = "firstName"
        ></app-input>

        <app-input
          type = "text"
          placeholder="Enter last name"
          :error = "errors.secondName"
          label = "What is your last name?"
          v-model = "secondName"
        ></app-input>

        <app-input
          type = "text"
          placeholder="Enter login"
          :error = "errors.login"
          label = "Enter login here"
          v-model = "login"
        ></app-input>

        <app-input
            type= "email"
            placeholder="Enter email here"
            :error= "errors.email"
            label="Enter email"
            v-model= "email"
        ></app-input>

        <app-input
            type= "password"
            placeholder="Enter password"
            :error= "errors.password"
            label="Enter password here"
            v-model= "password"
        ></app-input>

        <app-input
            type= "password"
            placeholder="Reenter password"
            :error= "errors.password"
            label="Reenter password here"
            v-model= "repeatPassword"
        ></app-input>

        <div class="form-checkbox">
            <div class="checkbox">
                <label for=""><input v-model="sex" type="radio" value="male" name="sex">male</label>
            </div>
            <div class="checkbox">
                <label for=""><input v-model="sex" type="radio" value="female" name="sex">female</label>
            </div>
        </div>

        <div class="form-control">
            <label for="age">How old are you?</label>
            <input type="number" id="age" v-model.number= "age">
        </div>

        <button
            class="btn primary"
            type="submit"
        >Send</button>
      </form>
    <app-modal
        v-if="modal"
        @close="modal = false"
        @toPrivateCabinet="navigate"
    ></app-modal>
  </div>
</template>

<script>
import AppInput from './AppInput.vue'
import AppModal from './AppModal.vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
    export default {
        setup(){
            
            const router = useRouter()
            const store = useStore()
            //переход в личный после регистрации
            const navigate = () => {
                store.dispatch('changeAuthStatus')
                router.push('/lk')
            }
            return {
                navigate
            }
        },
        data() {
            return {
                firstName: '',
                secondName: '',
                email: '',
                password: '',
                repeatPassword: '',
                login: '',
                age: 23,
                sex: 'male',
                errors: {
                    firstName: null,
                    secondName: null,
                    email: null,
                    password: null,
                    login: null
                },
                modal: false
            }
        },
        methods: {
    //проверим валидность поля
            isValid() {
                let isValid = true

                if (this.password.lenght < 6 || this.repeatPassword < 6) {
                    this.errors.password = 'Password must be longer than 6 characters'
                    isValid = false
                } 
                else if (this.repeatPassword !== this.password){
                    this.errors.password = 'Passwords do not match'
                    isValid = false
                } else {
                    this.errors.password = null
                }

                if(this.login.length == 0) {
                    this.errors.login = 'Login cannot be empty'
                    isValid = false
                } else {
                    this.errors.login = null
                }

                if(this.email.length == 0) {
                    this.errors.email = 'Email cannot be empty'
                    isValid = false
                } else {
                    this.errors.email = null
                }
                if (this.firstName.length == 0) {
                    this.errors.firstName = 'Name cannot be empty'
                    isValid = false
                } else {
                    this.errors.firstName = null
                }
                if(this.secondName.length == 0) {
                    this.errors.secondName = 'Last name cannot be empty'
                    isValid = false
                } else {
                    this.errors.secondName = null
                }

                console.log(this.errors)
                return isValid
            },
            submitHandler() {
                if (this.isValid()) {
                    this.modal = true

                }
            },

            
        },
  components: {
    AppInput, AppModal
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