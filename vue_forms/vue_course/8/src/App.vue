<template>
  <div class="container">
    <app-alert :alert= "alert" @close= "alert = null"></app-alert>

    <form class="card" @submit.prevent = "createPerson">
      <h2>Работа с базой данных</h2>

      <div class="form-control">
        <label for="name">Введите имя!</label>
        <input type="text" id="name" v-model.trim = "name">
      </div>

      <button class="btn primary" :disabled="name.length === 0">Create</button>
    </form>
  <!-- //Loader -->
    <app-loader v-if="loading"></app-loader>

    <app-people-list
      v-else
     :people= "people"
     @load="loadPeople"
     @remove="removePerson"
    ></app-people-list>
  </div>
</template>

<script>
import AppPeopleList from "./AppPeopleList.vue"
import AppAlert from "./AppAlert.vue"
import AppLoader from "./AppLoader.vue"
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      people: [],
      alert: null,
      loading: false
    }
  },
  //загрузка списка при старте
  mounted() {
    this.loadPeople()
  },
  methods: {
    //Заполнение базы
    async createPerson() {
      const responce = await fetch('https://vue-with-http-b080e-default-rtdb.europe-west1.firebasedatabase.app/people.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.name
        })
      })

      const firebaseData = await responce.json()

      //динамическая отрисовка
      this.people.push({
        firstName: this.name,
        id: firebaseData.name
      })

      this.name = ''
    },
    //Загрузка базы
    async loadPeople() {
      try {
        //индикатор загрузки
        this.loading = true
        
        const {data} = await axios.get('https://vue-with-http-b080e-default-rtdb.europe-west1.firebasedatabase.app/people.json')

        if (!data) {
          throw new Error('Cписок людей пуст!')
        }


        this.people = Object.keys(data).map(key => {
          return {
            id: key,
            firstName: data[key].firstName,
            // ...data[key]
          }
        }) //массив ключей
        this.loading = false
      }
      catch(e) {
        this.alert = {
          type: 'danger',
          title: 'Error!',
          text: e.message
        }
        this.loading = false
      }
    },
    async removePerson(id) {
      try {

        const name = this.people.find(person => person.id === id).firstName
        await axios.delete(`https://vue-with-http-b080e-default-rtdb.europe-west1.firebasedatabase.app/people/${id}.json`)

      //динамическая отрисовка
        this.people = this.people.filter(person => person.id !== id)
        this.alert = {
          type: 'primary', 
          title: 'Success!',
          text: `user ${name} was delited`
      }
      } catch (e) {
        this.alert = {
          type: 'danger',
          title: 'Error!',
          text: e.message
        }
      }
    }
  },
  components: {
    AppPeopleList, AppAlert, AppLoader
  }
}
</script>

<style>

</style>
