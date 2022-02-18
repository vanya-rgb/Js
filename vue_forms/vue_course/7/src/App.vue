<template>
  <div class="container">
    <form class="card" @submit.prevent="submitHandler">
      <h1>Анкета на Vue разработчика!</h1>
      
      <!-- <div class="form-control" :class = "{invalid: error}">
        <label :for="id">{{label}}</label>
        <input
          
          type="text"
          id="id"
          :placeholder="placeholder">

        <small v-if="error">{{error}}</small>
    </div> -->

      <app-input
        placeholder="Input name"
        :error= "errors.name"
        label= "Как тебя зовут?"
        v-model="name"
      ></app-input>

      <div class="form-control">
        <label for="age">Выбери возраст</label>
        <input
          v-model.number="age"
          type="number" id="age">
      </div>

      <div class="form-control">
        <label for="city">Твой город</label>
        <select id="city" v-model= "city">
          <option value="spb">Санкт-Петербург</option>
          <option value="msk">Москва</option>
          <option value="kzn">Казань</option>
          <option value="nsk">Новосибирск</option>
        </select>
      </div>

      <div class="form-checkbox">
        <span class="label">Готов к переезду в Токио?</span>
        <div class="checkbox">
          <label><input type="radio" v-model="relocate" value="yes" name="trip"/> Да</label>
        </div>

        <div class="checkbox">
          <label><input type="radio" v-model="relocate" value="no" name="trip"/> Нет</label>
        </div>
      </div>

      <div class="form-checkbox">
        <span class="label">Что знаешь во Vue?</span>
        <div class="checkbox">
          <label><input name="skills" v-model="skills" value="vuex" type="checkbox"/> Vuex</label>
        </div>
        <div class="checkbox">
          <label><input name="skills" v-model="skills" value="router" type="checkbox"/> Vue CLI</label>
        </div>
        <div class="checkbox">
          <label><input name="skills" v-model="skills" value="cli" type="checkbox"/> Vue Router</label>
        </div>
      </div>

      <div class="form-checkbox">
        <span class="label">our company rulse</span>
        <div class="checkbox">
          <label><input type="checkbox" v-model="agree"/> С правилами согласен</label>
        </div>
      </div>

      <button type="submit" class="btn primary">Отправить</button>
    </form>
  </div>
</template>

<script>
import AppInput from "./AppInput.vue"
  export default {
    data() {
      return {
        name: '',
        age: 23,
        city: 'spb',
        relocate: "yes ",
        skills: [],
        agree: null,
        errors: {
          name: null
        }
      }
    }
    ,
    methods: {
      isValid() {
        let isValid = true

        if (this.name.length == 0) {
          this.errors.name = 'Имя не может быть пустым'
          isValid = false
        }
        else {
          this.errors.name = null
        }
        return isValid
      },
      submitHandler() {
        if (this.isValid()) {
          console.group('Form Data')
          console.log("Name:", this.name)
          console.log("Age:", this.age)
          console.log("City:", this.city)
          console.log("To Tokyo", this.relocate)
          console.log("Skills", this.skills)
          console.log("agree", this.agree)
          console.groupEnd()
        }
      },
    },
    components: {AppInput}
  }
</script>

<style>
  .form-control small {
    color: red;
  }

  .form-control.invalid input {
    border-color: red;
  }
</style>
