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

                <table class="table file-preview">
                    <tr>
                        <td v-if="request.files">Файлы
                            <tr v-for="r in request.files" :key="r.id">
                                <app-icon
                                    :type="r.type"
                                    :url="r.url"
                                    :name="r.name"
                                ></app-icon>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="request.filesExe">Решение
                            <tr v-for="file in request.filesExe" :key="file.id">
                                <app-icon
                                    :type="file.type" :url="file.url"
                                    :name="file.name"
                                ></app-icon>
                            </tr>
                        </td>
                    </tr>
                </table>
                <button class="btn danger"
                    @click="remove"
                    v-if="customerId == localId"
                >Удалить</button>
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
import AppIcon from '@/components/ui/AppIcon.vue'

    export default {
        components: {
            AppPage, AppLoader, AppStatus, AppIcon
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
            const customerId = ref()
            const file = ref([])
            const filesExe = ref([])
            const pathRandom = ref()
            //
            const executorsList = ref([])
            //наш объект
            const request = ref({})

            onMounted(async()=> {
                loading.value = true
                localId.value = store.getters['auth/localId']
                //обращаемся к loadById. передаем id из параметров пути
                request.value = await store.dispatch('request/loadById', route.params.id)
                //id заказчика
                customerId.value = request.value.localId
                //путь к файлам
                pathRandom.value = request.value.pathRandom
                //заполение статуса
                console.log("PATH", `${localId.value}/${pathRandom.value}`);
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
                    const { removeFiles } = createRemover(`${localId.value}/${pathRandom.value}`)
                    await removeFiles(file.value)
                }
                if (filesExe.value) {
                    const { removeFiles } = createRemover(`${localId.value}/${pathRandom.value}`)
                    await removeFiles(filesExe.value)
                }
                const exe = await store.dispatch('user/getUserData', localId.value)
                console.log("EXE", exe);
                //убрали выполненную зявку
                const newDone = exe.сomplited.filter(val=> {
                    return val.id !== route.params.id
                })
                console.log("NEWDONE", newDone);
                //обновили профиль
                await store.dispatch('update/updateDoneData', {
                    сomplited: newDone,
                    localId: localId.value
                })

                await store.dispatch('request/remove', route.params.id)
                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})
            }

            return {loading, request, currency, remove, status, date, amount, localId, executorsList, customerId
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>