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

                <p><strong>&nbsp;Сумма</strong>: {{currency(amount)}}</p>

                <p><strong>&nbsp;Deadline</strong>: {{date}}</p>

                <table class="table">
                    <tr>
                        <td v-if="request.files">Файлы
                            <tr v-for="r in request.files" :key="r.id">
                            <td>
                                <a :href="r.url" target="_blank">{{r.name}}</a>
                            </td>
                            </tr>
                        </td>
                        <td v-if="request.filesExe">Решение
                            <tr v-for="r in request.filesExe" :key="r.id">
                            <td>
                                <a :href="r.url" target="_blank">{{r.name}}</a>
                            </td>
                        </tr>
                        </td>
                    </tr>
                </table>
                <button class="btn danger" @click="remove">Удалить</button>
            </app-page>
            </div>
            <h3 v-else class="text-center text-white">
                Заявки с ID = {{$route.params.id}} нет.
            </h3>
        </div>
    </div>
</template>

<script>
import {useRoute, useRouter} from 'vue-router'
import AppPage from '../components/ui/AppPage.vue'
import {ref, onMounted} from 'vue'
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
            const filesExe = ref([])
            //
            const executorsList = ref([])
            //наш объект
            const request = ref({})

            onMounted(async()=> {
                loading.value = true
                localId.value = store.getters['auth/localId']
                //обращаемся к loadById. передаем id из параметров пути
                request.value = await store.dispatch('request/loadById', route.params.id)
                //заполение статуса
                console.log("REQ", request.value);
                status.value = request.value?.status
                date.value = request.value?.date
                //файлы
                file.value = request.value?.files
                filesExe.value = request.value.filesExe
                amount.value = request.value.amount
                //executorsList
                request.value.executorsList ? executorsList.value = request.value.executorsList : executorsList.value = []
                loading.value = false
            })
            
            const remove = async () => {
                if (file.value) {
                    const { removeFiles } = createRemover(`${localId.value}/forWork`)
                    await removeFiles(file.value)
                }
                if (filesExe.value) {
                    const { removeFiles } = createRemover(`${localId.value}/forWork`)
                    await removeFiles(filesExe.value)
                }

                await store.dispatch('request/remove', route.params.id)
                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})
            }

           

            return {loading, request, currency, remove, status, date, amount, localId, executorsList
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>