<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div v-else-if="request">

        <div class="breadcrumbs">
        <router-link :to="path" class="text-white">К списку заявок</router-link>
        </div>
        <app-page title="Заявка">
            <p><strong>&nbsp;Status</strong>: <app-status :type="request.status"></app-status></p>

            <p><strong>&nbsp;Ник</strong>: {{request.userName}}</p>

            <div class="form-control">
                <label for="amount">Сумма:</label>
                <input type="number" id="amount" v-model.number="amount">
            </div>

            <div class="form-control">
                <label for="date">Deadline</label>
                <input type="date" :min="new Date().toISOString().split('T')[0]" id="date" v-model="date">
            </div>
            <table class="table" v-if="request.file">
                <thead>
                    <tr>
                        <th>Файлы</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in request.file" :key="r.id">
                        <td>
                            <a :href="r.url" target="_blank">{{r.name}}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="btn danger" @click="remove">Удалить</button>
            <button v-if='hasChanges' class="btn" @click="update">Обновить</button>
        </app-page>
        </div>
        <h3 v-else class="text-center text-white">
            Заявки с ID = {{$route.params.id}} нет.
        </h3>
        
    </div>
</template>

<script>
import {useRoute, useRouter} from 'vue-router'
import AppPage from '../components/ui/AppPage.vue'
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus.vue'
import {currency} from '../utils/currency-formator'
import createRemover from '../components/dragNdrop/composition/file-remove'
    export default {
        components: {
            AppPage, AppLoader, AppStatus
        },
        setup() {
            const loading = ref(true)
            const route = useRoute()
            const router = useRouter()
            const store = useStore()
            const status = ref()
            const date = ref()
            const amount = ref()
            const path = ref()
            const file = ref([])
            const number = ref()
            //наш объект
            const request = ref({})
            const hasChanges = computed(()=> request.value.date !== date.value ||  request.value.amount!== amount.value)

            onMounted(async()=> {
                loading.value = true
                //обращаемся к loadById. передаем id из параметров пути
                request.value = await store.dispatch('request/loadById', route.params.id)
                //заполение статуса
                console.log("REQ", request.value);
                status.value = request.value?.status
                path.value = `/lk/+${request.value.localId}`
                date.value = request.value?.date
                file.value = request.value?.file
                number.value = request.value.path
                amount.value = request.value.amount

                loading.value = false
            })
            //удаление из базы данных
            //удаление из локального store
            const remove = async () => {
                if (file.value) {
                    const { removeFiles } = createRemover(number.value)
                    await removeFiles(file.value)
                }
                
                
                await store.dispatch('request/remove', route.params.id)
                router.push(path.value)
            }

            const update = async() => {
                //получили объект
                const data = {...request.value, date: date.value, amount: amount.value,  id:route.params.id}
                //обновили в базе
                await store.dispatch('request/update', data)
                //обновили локально
                request.value.date = date.value
            }


            return {loading, request, currency, remove, update, status, hasChanges, path, date, amount}
        }
    }
</script>

<style lang="scss" scoped>

</style>