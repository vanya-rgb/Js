<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div v-else>
            <div v-if="request">
            <div class="breadcrumbs">
            <router-link :to="{name: 'PrivateCabinet', params: {localId}}">К списку заявок</router-link>
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
                <table class="table" v-if="request.files">
                    <thead>
                        <tr>
                            <th>Файлы</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="r in request.files" :key="r.id">
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

            <app-page title="Предложившие помощь" >
                <table class="table" v-if="executorsList.length !== 0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Исполнитель</th>
                            <th>Рейтинг</th>
                            <th>Сумма</th>
                            <th>Выбрать</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(r, idx) in executorsList" :key="r.id">
                            <td>{{idx+1}}</td>
                            <td>
                                <div v-if="localId !== r.localId">
                                    <router-link v-slot="{navigate}" custom :to="{name: 'UserPage', params: {userId: r.localId}}">
                                        <a @click="navigate">{{r.userName}}</a>
                                    </router-link>
                                </div>
                                <div v-else>
                                    <router-link v-slot="{navigate}" custom :to="{name: 'PrivateCabinet', params: {localId}}">
                                        <a @click="navigate">{{r.userName}}</a>
                                    </router-link>
                                </div>
                            </td>
                            <td>{{r.rating.value}}/{{r.rating.count}}</td>
                            <td>{{currency(r.amount)}}</td>
                            <td><button class="btn" @click="choosePerformer(r.localId)">Назначить</button></td>
                        </tr>
                    </tbody>
                </table>
                <app-page class="text-center" v-else><h3>Пока никто не вызвался:(</h3></app-page>
            </app-page>
        </div>
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
            const localId = ref()
            const file = ref([])
            //
            const executorsList = ref([])
            const toComplite = ref([])
            //наш объект
            const request = ref({})
            const hasChanges = computed(()=> request.value.date !== date.value ||  request.value.amount!== amount.value)

            onMounted(async()=> {
                loading.value = true
                localId.value = store.getters['auth/localId']
                //обращаемся к loadById. передаем id из параметров пути
                request.value = await store.dispatch('request/loadById', route.params.id)
                //заполение статуса
                console.log("REQ", request.value);
                status.value = request.value?.status
                date.value = request.value?.date
                file.value = request.value?.files
                amount.value = request.value.amount
                //executorsList
                request.value.executorsList ? executorsList.value = request.value.executorsList : executorsList.value = []
                loading.value = false
            })
            const choosePerformer = async(id) => {
                console.log("LOCAL", id);
                //обновили статус в базе
                status.value = 'in_progress'
                await update()
                //забрали данные исполнителя
                const exe = await store.dispatch('user/getUserData', id)
                //скачали актуальные данные
                request.value = await store.dispatch('request/loadById', route.params.id)
                exe.toComplite ? toComplite.value = exe.toComplite : toComplite.value = []
                toComplite.value.push(request.value)
                //добавили заявку исполнителю
                store.dispatch('update/updateExeData', {
                    toComplite: toComplite.value,
                    сomplited: [],
                    status: 'in_progress',
                    localId: id
                })
                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})

            }
            //удаление из базы данных
            //удаление из локального store
            const remove = async () => {
                if (file.value) {
                    const { removeFiles } = createRemover(`${localId.value}/forWork`)
                    await removeFiles(file.value)
                }

                await store.dispatch('request/remove', route.params.id)
                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})
            }

            const update = async() => {
                //получили объект
                const data = {...request.value, date: date.value, amount: amount.value,  id:route.params.id, status: status.value}
                //обновили в базе
                await store.dispatch('request/update', data)
                //обновили локально
                request.value.date = date.value
            }


            return {loading, request, currency, remove, update, status, hasChanges, date, amount, localId, executorsList, choosePerformer
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>