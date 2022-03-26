<template>
    <div>
      <app-alert v-if="alert" title="Работаем c Composition" type="danger"
        @close="close"
      ></app-alert>
      <div class="card">
        <h1>Vue Composition Api</h1>
        <strong>data, methods, computed, watch</strong>
        <hr>
        <div class="form control">
          <input type="text" ref="textInput">
          <input type="text" v-model="firstName">
        </div>

        <button class="btn" @click="change">Изменить</button>
        <button class="btn danger" @click="toggle">Alert</button>
      </div>

      <framework-info
        @change-version="changeVersion"
        class="test"
      >
        <template #footer>
          <p>this is footer</p>
        </template>
      </framework-info>
    </div>
</template>

<script>
import FrameworkInfo from '../FrameworkInfo.vue'
import {ref, reactive, computed, watch, provide} from 'vue'
import AppAlert from '../AppAlert.vue'


    export default {
    setup() {
        const name = ref('VueJS')
        const version = ref(3)
        const fraimework = reactive({
        name: 'vue JS',
        version: 3
        })
        const textInput = ref(null)
        const firstName = ref()


        //пример работы с computed
        const doubleVersion = computed(() => {
        return version.value*2
        })

        //пример работы с watch
        watch(firstName, (newValue) => {
        console.log(newValue)
        })

        function changeInfo() {
        // name.value = 'Vye Js!'
        // version.value = 42
        //работа как с обычным объектом
        //объект является proxy
        name.value = 'VUE Js'
        version.value = 42,

        console.log(textInput.value.value)
        }

        function changeVersion(number) {
        version.value = number
        }

        provide('name', name)
        provide('version', version)

        return {
        //name, version,
        //если нужно использовать только один раз
        // name: fraimework.value.name,
        // version: fraimework.value.version,
        //Экспортируем весь объект
        fraimework,
        change: changeInfo,
        doubleVersion,
        textInput,
        firstName,
        changeVersion,
        }
    },
        components: {
            FrameworkInfo, AppAlert
        }
    }
</script>

<style lang="scss" scoped>

</style>