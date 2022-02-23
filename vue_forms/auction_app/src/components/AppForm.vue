<template>
    <div class="container">
      <form class="card" @submit.prevent="submitHandler">
          <h1>Анкета регистрации</h1>
        <app-input
          type = "text"
          placeholder="Введите имя"
          :error = "errors.firstName"
          label = "Как тебя зовут?"
          v-model = "firstName"
        ></app-input>

        <app-input
          type = "text"
          placeholder="Введите фамилию"
          :error = "errors.secondName"
          label = "Твоя фамилия"
          v-model = "secondName"
        ></app-input>

        <app-input
            type= "email"
            placeholder="Введите email здесь"
            :error= "errors.email"
            label="Укажи Email"
            v-model= "email"
        ></app-input>

        <div class="form-checkbox">
            <div class="checkbox">
                <label for=""><input v-model="sex" type="radio" value="M" name="sex">M</label>
            </div>
            <div class="checkbox">
                <label for=""><input v-model="sex" type="radio" value="Ж" name="sex">Ж</label>
            </div>
        </div>

        <div class="form-control">
            <label for="age">Сколько тебе лет?</label>
            <input type="number" id="age" v-model.number= "age">
        </div>

        <button
            class="btn primary"
            type="submit"
        >Отправить</button>
      </form>
    
    <app-modal
        v-if="modal"
        @close="modal = false"
        @toPrivateCabinet="privateCabinet"
    ></app-modal>
  </div>
</template>

<script>
import AppInput from './AppInput.vue'
import AppModal from './AppModal.vue'
    export default {
        data() {
            return {
                firstName: '',
                secondName: '',
                email: '',
                age: 23,
                sex: 'M',
                errors: {
                    firstName: null,
                    secondName: null,
                    email: null
                },
                modal: false
            }
        },
        methods: {
    //проверим валидность поля
            isValid() {
                let isValid = true

                if(this.email.length == 0) {
                    this.errors.email = 'Электронная почта не может быть пустой'
                    isValid = false
                } else {
                    this.errors.email = null
                }
                if (this.firstName.length == 0) {
                    this.errors.firstName = 'Имя не может быть пустым'
                    isValid = false
                } else {
                    this.errors.firstName = null
                }
                if(this.secondName.length == 0) {
                    this.errors.secondName = 'Фамилия не может быть пустой'
                    isValid = false
                } else {
                    this.errors.secondName = null
                }

                console.log(this.errors)
                return isValid
            },
            submitHandler() {
                if (this.isValid()) {
                    console.log("FirstName:", this.firstName)
                    console.log("SecondName:", this.secondName)
                    console.log("Email:", this.email)
                    console.log("Sex", this.sex)
                    console.log("Age", this.age)
                    this.modal = true
                }
            },

            //переход в личный после регистрации
            privateCabinet() {
                console.log('vwevw')
            }
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