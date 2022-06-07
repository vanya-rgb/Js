<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <!-- back как параметр который описан в app page -->
        <app-page back title="Заявка" v-else-if="request">
            <p><strong>Status</strong>: <app-status :type="request.status"></app-status></p>
            <p><strong>Заказчик</strong>: {{request.userName}}</p>
            <p><strong>Сумма</strong>: {{currency(request.amount)}}</p>
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
            <the-timer :dateCreate="dateCreate" :timeInterval="timeForBidding"></the-timer>
            <div class="form-control">
                <label for="offer">Сделаю за:</label>
                <input type="number" onkeypress="if (this.value.length > 4) return false;" v-model.number="offerAmount" required >
            </div>
            <button class="btn danger" :disabled="offerAmount == ''" @click="take">Взять за <small v-if="offerAmount">{{currency(offerAmount)}}</small></button>

        </app-page>
        <h3 v-else class="text-center text-white">
            Заявки с ID = {{$route.params.id}} нет.
        </h3>
        
    </div>
</template>

<script>
// useRouter
import {useRoute, useRouter} from 'vue-router'
import AppPage from '../components/ui/AppPage.vue'
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus.vue'
import {currency} from '../utils/currency-formator'
import TheTimer from '../components/TheTimer.vue'

 
    export default {
        components: {
            AppPage, AppLoader, AppStatus, TheTimer
        },

        setup() {
            const loading = ref(true)
            const route = useRoute()
            // const router = useRouter()
            const store = useStore()
            const status = ref()
            const dateCreate = ref()
            const amount = ref()
            const timeForBidding = ref()

            const executorsList = ref([1])
            const offerAmount = ref(amount)
            //наш объект
            const request = ref({})
            //юзер
            const user = ref({})
            const userDisplayName = ref()
            const userLocalId = ref()
            const tokenUser = ref()

            const router = useRouter()

            // const hasChanges = computed(()=> offerAmount.value)

            onMounted(async()=> {
                loading.value = true
                //обращаемся к loadById. передаем id из параметров пути
                request.value = await store.dispatch('request/loadById', route.params.id)

                const userRes = await store.dispatch('user/getProfile')
                user.value = userRes.users[0]
                
                console.log("USER", user.value);
                // executorsList.value = user.value?.executorsList
                user.value.executorsList ? executorsList.value = user.value.executorsList : executorsList.value = []
                userDisplayName.value = user.value?.displayName
                userLocalId.value = user.value?.localId
                const token = computed(()=> store.getters['auth/token'])
                tokenUser.value = token.value

                dateCreate.value = request.value.dateCreate
                amount.value = request.value.amount
                timeForBidding.value = request.value?.timeForBidding
                loading.value = false
            })
            const toCastomer = ()=> router.push(`/${userLocalId.value}`)

            const addItem = async() => {
                const item = {
                    userDisplayName: userDisplayName.value,
                    userLocalId: userLocalId.value,
                    tokenUser: tokenUser.value
                }
                console.log("ITEM", item);
                executorsList.value.push(item)
            }

            const take = async() => {
                console.log(executorsList.value)
                await addItem()
                console.log(executorsList.value)
                const data = {...request.value, executorsList: executorsList.value, id: route.params.id}
                //обновили в базе
                await store.dispatch('request/update', data)
                //обновили локально
            }


            return {loading, request, currency, take, status, dateCreate, amount, timeForBidding, offerAmount,
            userDisplayName, toCastomer
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>