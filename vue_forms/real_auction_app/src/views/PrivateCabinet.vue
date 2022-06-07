<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div v-else>
            <div v-if="isExist">
            <app-page :title="userName">
            <the-castom 
                @createReq = "modalCreate = true"
                @findUser = "modalFind = true"
            ></the-castom>
            <teleport to="body">
                <app-modal v-if="modalCreate" title="Создать заявку" @close="modalCreate = false">
                    <request-modal @created="modalCreate  = false"></request-modal>
                </app-modal>
                <app-modal v-else-if="modalFind" title="Кого ищем?" @close="onFindUserClose">
                    <requests-users></requests-users>
                </app-modal>
            </teleport>
            <table class="card table">
                <tr>
                    <td>
                        <div class="wrapper">
                            <img :src="photo.link">
                        </div>
                    </td>
                    <td>
                        <tr>
                        <th>Email:</th>
                            <td>{{email}}</td>
                            <td>
                                <app-email :isVerify="isVerifiedEmail" @verifyEmail="verifyEmail"></app-email>
                            </td>
                        </tr>
                        <tr><th>Номер</th><td>{{phone}}</td></tr>
                        <tr><th>Рейтинг</th><td>{{rating.value}}</td></tr>
                        <tr><th>Коменты</th></tr>
                        <tr v-for="(com, idx) in comments" :key="idx">
                            <td>Коменты</td>
                        </tr>
                    </td>
                </tr>
                    
            </table>
            <router-link :to="{name: 'Edit', params: {localId}}">
                Обновить
            </router-link>
            </app-page>

            <app-page title = "Список моих заявок">
                <request-filter-cabinet v-model="filter"></request-filter-cabinet>
                <request-table-cabinet :requests="requests"></request-table-cabinet>
            </app-page>
            <app-page title = "Выполняемые заявки">
                <request-table-exe :requests="toComplite"></request-table-exe>
            </app-page>
            <app-page title = "Выполненные заявки">
                <request-table-exe :requests="сomplited"></request-table-exe>
            </app-page>
            </div>
            <div v-else>
                <div class="card">Такой страницы не существует</div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import {ref, onMounted, computed} from 'vue'
    import AppLoader from '../components/ui/AppLoader.vue'
    import AppPage from '../components/ui/AppPage.vue'
    import {useStore} from 'vuex'
    // import { getAuth } from "firebase/auth"
    import { preload } from 'vue-onload'
    import {useRoute} from 'vue-router'
    import AppEmail from '../components/ui/AppEmail.vue'
    import TheCastom from '../components/TheCastom.vue'
    import AppModal from '../components/ui/AppModal.vue'
    import RequestsUsers from '../components/requests/RequestsUsers.vue'
    import RequestModal from '@/components/requests/RequestModal.vue'
    import RequestFilterCabinet from '../components/requests/RequestFilterCabinet.vue'
    import RequestTableCabinet from '@/components/requests/RequestTableCabinet.vue'
    import RequestTableExe from '@/components/requests/RequestTableExe.vue'

    export default {
        components: {
            AppLoader, AppPage, AppEmail, TheCastom, AppModal, RequestsUsers, RequestModal, RequestFilterCabinet, RequestTableCabinet, RequestTableExe
        },
        setup() {
            const loading = ref(true)
            const modalCreate = ref(false)
            const modalFind = ref(false)
            //exist
            const isExist = ref(true)
            //данные пользователя
            const userName = ref()
            const email = ref()
            const localId = ref()
            const comments = ref([])
            const phone = ref('Неизвестно')
            const photo = ref({
                link: "upload.jpg",
                name: 'unnamed'
            })
            //заявки
            const toComplite = ref([])
            const сomplited = ref([])
            const rating = ref({})
            //filter
            const filter = ref({})
            // const localId = ref()
            const isVerifiedEmail = ref(false)
            // const data = ref()
            const store = useStore()
            const route = useRoute()
            localId.value = route.params.localId

            const onFindUserClose = ()=> {
                modalFind.value = false
                store.commit('requestUsersModule/cleanUsers')
            }

            const requests = computed(()=> store.getters['request/requests']
            .filter(request => {
                if (filter.value.date) {
                    return request.date == filter.value.date
                }
                return request
            })
            .filter(request => {
                if (request.localId){
                return localId.value === request.localId
                }
                // return request
            })
            .sort((a, b)=>{
                return new Date(a.date) - new Date(b.date)
            })
            )

            const verifyEmail = async()=> await store.dispatch('user/verifyEmail', email.value)
            console.log(process.env.BASE_URL);
            
            onMounted(async()=> {

                const user = await store.dispatch('user/getUserData', localId.value)

                const registrData = await store.dispatch('user/getProfile')
                const registrDataUser = registrData.users[0]
                //загрузили заяки
                await store.dispatch('request/load')

                if (user !== null) {
                    console.log("USER", user);
                    console.log("DOC", registrDataUser);
                    userName.value = user.userName
                    email.value = registrDataUser.email
                    localId.value = user.localId
                    phone.value = user.phone
                    photo.value = user.photo
                    comments.value = user.comments
                    rating.value = user.rating
                    isVerifiedEmail.value = registrDataUser.emailVerified
                    //заявки на исполнение
                    user.toComplite ? toComplite.value = user.toComplite : toComplite.value = []
                    //исполненные заявки
                    user.сomplited ? сomplited.value = user.сomplited : сomplited.value = []

                    if (user.isVerifiedEmail !== registrDataUser.emailVerified) {
                        await store.dispatch('update/updateUserData', {isVerifiedEmail: registrDataUser.emailVerified})
                    }

                } else {
                    isExist.value = false
                }
                const sources = [
                    photo.value?.link,
                    ]
                    preload(sources, (completed) => {
                        if (completed === true) {
                        loading.value = false
                    }
                })
            })
            

            return {
                loading, userName, email, photo, phone, localId, rating, comments, verifyEmail, isVerifiedEmail, modalCreate, modalFind, onFindUserClose, requests, filter, isExist, toComplite, сomplited
            }
        }
        
    }

</script>
