<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <!-- back как параметр который описан в app page -->
        <app-page back title="Заявка" v-else-if="request">
            <p><strong>Имя владельца</strong>: {{request.fio}}</p>
            <p><strong>Телефон</strong>: {{request.phone}}</p>
            <p><strong>Сумма</strong>: {{currency(request.amount)}}</p>
            <p><strong>Status</strong>: <app-status :type="request.status"></app-status></p>
            <!-- //обновление статуса -->
            <div class="form-control">
                <label for="status">Статус</label>
                <select id="status" v-model="status">
                    <option value="done">Завершен</option>
                    <option value="cancelled">Отклонен</option>
                    <option value="active">Активен</option>
                    <option value="pending">Выполняется</option>
                </select>
            </div>
            <button class="btn danger" @click="remove">Удалить</button>
            <button v-if='hasChanges' class="btn" @click="update">Обновить</button>
        </app-page>
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
            //наш объект
            const request = ref({})
            const hasChanges = computed(()=> request.value.status !== status.value)

            onMounted(async()=> {
                loading.value = true
                //обращаемся к loadById. передаем id из параметров пути
                request.value = await store.dispatch('request/loadById', route.params.id)
                //заполение статуса
                status.value = request.value?.status
                loading.value = false
            })
            //удаление из базы данных
            //удаление из локального store
            const remove = async () => {
                await store.dispatch('request/remove', route.params.id)
                router.push('/')
            }

            const update = async() => {
                //получили объект
                const data = {...request.value, status: status.value, id:route.params.id}
                //обновили в базе
                await store.dispatch('request/update', data)
                //обновили локально
                request.value.status = status.value
            }


            return {loading, request, currency, remove, update, status, hasChanges}
        }
    }
</script>

<style lang="scss" scoped>

</style>