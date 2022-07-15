<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <!-- back как параметр который описан в app page -->
        <div v-else>
        <app-page back title="Заявка" v-if="request">
            <p><strong>Заявка&nbsp;</strong><app-status :type="status"></app-status></p>

            <div v-if="localId !== userLocalId">
                <router-link v-slot="{navigate}" custom :to="{name: 'UserPage', params: {userId: userLocalId}}">
                    <strong>Заказчик&nbsp;<a @click="navigate">{{userName}}</a>&nbsp;готов заплатить {{currency(amount)}} за этот заказ.</strong>
                </router-link>
            </div>
            <div v-else>
                <router-link v-slot="{navigate}" custom :to="{name: 'PrivateCabinet', params: {localId}}">
                    <strong>Заказчик&nbsp;<a @click="navigate">{{userName}}</a>&nbsp;готов заплатить {{currency(amount)}} за этот заказ.</strong>
                </router-link>
            </div>
            <p><strong>Необходимо выполнить заявку до {{deadline}} включительно. <br></strong></p>
            <!-- <hr> -->
            <p><strong>Файлы заказчика:</strong></p>
            <div v-if="files.length > 0" class="highlight">
                <file-preview v-for="(file, idx) of files"
                    :key="file.id"
                    :file="file"
                    :idx = "idx"
                    :hide = "true"
                    tag="ul"
                    ></file-preview>
            </div>
             <p><strong>Описание:&nbsp;</strong>{{description}}</p>
            <div class="form-control">
                <label for="offer">Готов сделать за (укажите сумму в рублях):</label>
                <input type="number"
                    onkeypress="if (this.value.length > 4) return false;"
                    v-model.number="offerAmount"
                    required
                >
            </div>
            <!-- +disabled || userLocalId == localId -->
            <button class="btn danger" :disabled="offerAmount == '' || offerAmount == null || alreadyExist || localId == userLocalId" @click="take">Откликнуться</button>
            <!-- <small v-if="offerAmount">за{{currency(offerAmount)}}</small> -->
        </app-page>
        <h3 v-else class="text-center text-white">
            Заявки с ID = {{$route.params.id}} нет.
        </h3>

        <app-page title="Предложившие помощь" >
            <table class="table" v-if="executorsList.length !== 0">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Исполнитель</th>
                        <th>Рейтинг</th>
                        <th>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(r, idx) in executorsList" :key="r.id">
                        <td>{{idx+1}}.</td>
                        <td>
                            <img class="wrapper" :src="r.photo.miniature" alt="">
                        </td>
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
                        <td class="stars">
                            <star-rating
                            :styleStarWidth = 24
                            :styleStarHeight = 24
                            :isIndicatorActive = false
                            :value = r.rating.value
                            :amount = r.rating.count>
                        </star-rating>
                        </td>
                        <td>{{currency(r.amount)}}</td>
                        <td v-if="r.localId == localId">
                        <button class="btn danger"
                        @click="detele"
                        >Отказаться</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <app-page class="text-center" v-else><h3>Будь первым!</h3></app-page>
        </app-page>
        </div>
    </div>
</template>

<script>
// useRouter
import {useRoute} from 'vue-router'
import AppPage from '../components/ui/AppPage.vue'
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus.vue'
import {currency} from '../utils/currency-formator'
import filePreview from '@/components/dragNdrop/components/filePreview.vue'
import StarRating from '../utils/star-rating.vue'
 
    export default {
        components: {
            AppPage, AppLoader, AppStatus, filePreview, StarRating
        },

        setup() {
            const loading = ref(true)
            const route = useRoute()
            // const router = useRouter()
            const store = useStore()
            // const router = useRouter()
            //request
            const request = ref({})
            //executor
            const executorName = ref()
            const rating = ref({})
            const photo = ref({})
            //application
            const status = ref()
            const userName = ref()
            const userLocalId = ref()
            const localId = ref()
            const amount = ref()
            const deadline = ref()
            const description = ref()
            const files = ref([])
            const executorsList = ref([])
            const offerAmount = ref()

            onMounted(async()=> {
                loading.value = true
                //localId
                localId.value = store.getters['auth/localId']
                console.log("ID", localId.value);
                request.value = await store.dispatch('request/loadById', route.params.id)
                const userDbData = await store.dispatch('user/getUserData', localId.value)
                //исполнитель
                console.log('userDbData', userDbData);
                executorName.value = userDbData.userName
                rating.value = userDbData.rating
                photo.value = userDbData.photo
                deadline.value = request.value.date
                status.value = request.value.status
                amount.value = request.value.amount
                userName.value = request.value.userName
                files.value = request.value.files
                description.value = request.value.description
                userLocalId.value = request.value.localId
                request.value.executorsList ? executorsList.value = request.value.executorsList : executorsList.value = []
                console.log("Завка", request.value);
                // executorsList.value = user.value?.executorsList
                loading.value = false
            })
            //проверка что заявка уже взята пользователем
            const alreadyExist = computed(()=>
                executorsList.value.find(item =>
                    item.localId == localId.value
                )
            )

            const detele = async() => {
                const newExList = executorsList.value.filter(item => {
                    if(item.localId != localId.value) return item
                })
                //обновили в базе
                const data = {...request.value, executorsList: newExList, id: route.params.id}
                await store.dispatch('request/update', data)
                //локально
                executorsList.value = newExList
               
            }

            const take = async() => {
                const item = {
                    userName: executorName.value,
                    localId: localId.value,
                    amount: offerAmount.value,
                    rating: rating.value,
                    photo: photo.value
                }
                executorsList.value.push(item)

                const data = {...request.value, executorsList: executorsList.value, status: 'pending', id: route.params.id}
                //обновили в базе
                await store.dispatch('request/update', data)
                //обновили локально
                status.value = 'pending'
            }


            return {loading, currency, take, status, amount, offerAmount, userName, request, files, userLocalId, localId, executorsList, alreadyExist, rating, detele, deadline, description
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>