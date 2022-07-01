<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <app-page v-else>
            <div v-if="isExist">
            <div>
                <h1>{{userName}}</h1>
            <the-castom
                :localId = "localId"
                @createReq = "modalCreate = true"
                @findUser = "modalFind = true"
            ></the-castom>
            <teleport to="body">
                <app-modal v-if="modalCreate" @close="modalCreate = false">
                    <request-modal
                    @created="modalCreate  = false"></request-modal>
                </app-modal>
                <app-modal v-else-if="modalFind" title="Кого ищем?" @close="onFindUserClose">
                    <requests-users></requests-users>
                </app-modal>
            </teleport>
            <div class="card">
            <table>
            <tr>
                <td class="avatar-col">
                    <div class="margin">
                        <div class="margin">
                            <div class="effect">
                            <img :src="photo.link"
                            >
                            <div class="caption">
                                <button class="btn primary" @click="changePhoto = true">Изменить фото</button>
                            </div>
                            </div>
                        </div>
                        <app-modal v-if="changePhoto" @close="changePhoto = false">
                            <request-new-avatar @created="changePhoto = false"
                            @forceRerender = "(n)=> photo.link = n"
                            ></request-new-avatar>
                        </app-modal>

                        <app-email :isVerify="isVerifiedEmail" @verifyEmail="verifyEmail"
                            :email="email"
                        ></app-email>
                        <tr class="align-left"><th>Номер:</th><td>{{phone}}</td></tr>
                        <tr class="align-left"><th>Рейтинг:</th><td>{{rating.value}}</td></tr>
                        
                    </div>
                </td>
                <td style="vertical-align: top;">
                    <tr>
                        <td>фото</td>
                        <td>
                            <tr>ник</tr>
                            <tr>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse rem a, aspernatur totam dolorem fuga ipsam molestias in eaque deleniti autem eligendi, provident vel delectus.</tr>
                            <!-- <tr class="align-left" v-for="(com, idx) in comments" :key="idx">
                            </tr> -->
                        </td>
                    </tr>
                </td>
            </tr>
            
            </table>
            </div>
            </div>
            <div class="card">
                <h1>Список моих заявок</h1>
                <request-filter-cabinet v-model="filter"></request-filter-cabinet>
                <request-table-cabinet :requests="requests"></request-table-cabinet>
            </div>
            <!-- <app-page title = "Список моих заявок">
                
            </app-page> -->
            <div class="card">
                <h1>Выполняемые заявки</h1>
                <request-table-exe :requests="requestsToComplite"></request-table-exe>
            </div>
            <div class="card">
                <h1>Выполненные заявки</h1>
                <request-table-done :requests="сomplited"></request-table-done>
            </div>
            </div>
            <div v-else>
                <div class="card">Такой страницы не существует</div>
            </div>
        </app-page>
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
    import RequestNewAvatar from '@/components/requests/RequestNewAvatar.vue'
    import RequestFilterCabinet from '../components/requests/RequestFilterCabinet.vue'
    import RequestTableCabinet from '@/components/requests/RequestTableCabinet.vue'
    import RequestTableExe from '@/components/requests/RequestTableExe.vue'
    import RequestTableDone from '@/components/requests/RequestTableDone.vue'

    export default {
        components: {
            AppLoader, AppPage, AppEmail, TheCastom, AppModal, RequestsUsers, RequestModal, RequestFilterCabinet, RequestTableCabinet, RequestTableExe, RequestTableDone, RequestNewAvatar
        },
        data() {
            return {
                componentKey: 0,
            }
        },
        methods: {
            forceRerender() {
                this.componentKey += 1;
            }
        },
        setup() {
            const loading = ref(true)
            const modalCreate = ref(false)
            const modalFind = ref(false)
            const isExist = ref(true)
            const changePhoto = ref(false)
            //данные пользователя
            const userName = ref()
            const email = ref()
            const localId = ref()
            const comments = ref([])
            const phone = ref('Неизвестно')
            const photo = ref({
                link: "upload.png",
                miniature: 'startSmailik.png'
            })
            //заявки
            // const toComplite = ref([])
            // const сomplited = ref([])
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
                if (request.localId){
                return localId.value === request.localId
                }
                // return request
            })
            .filter(request => {
                if (filter.value.date) {
                    return request.date == filter.value.date
                }
                return request
            })
            .sort((a, b)=>{
                return new Date(a.date) - new Date(b.date)
            })
            )

            const requestsToComplite = computed(()=> store.getters['request/requests']
            .filter(request => {
                if (request.performer){
                return localId.value === request.performer.localId
                }
                // return request
            }))

            const verifyEmail = async()=> await store.dispatch('user/verifyEmail', email.value)
            console.log(process.env.BASE_URL);
            
            onMounted(async()=> {

                const req =  await store.getters['request/requests']
                console.log("req", req);
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
                    // //заявки на исполнение
                    // user.toComplite ? toComplite.value = user.toComplite : toComplite.value = []
                    // //исполненные заявки
                    // console.log("Tocomplete", toComplite.value);
                    // user.сomplited ? сomplited.value = user.сomplited : сomplited.value = []

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
                loading, userName, email, photo, phone, localId, rating, comments, verifyEmail, isVerifiedEmail, modalCreate, modalFind, onFindUserClose, requests, filter, isExist,  changePhoto, requestsToComplite
            }
            // requestsToComplite, requestsComplited,
        }
        
    }

</script>

<style>
  .effect {
  position: relative;
  width: 256px;
  height: 256px;
  overflow: hidden;
}

.effect img {
    border-radius: 10px;
}

.effect .caption {
   position: absolute;
   bottom: -100%;
   left: 0px;
   background: rgba(0,0,0,0.7);
   width: 100%;
   height: 100%;
   color: #fff;
   -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 1, 1) 0s;
   -o-transition: all 0.3s cubic-bezier(0.4, 0, 1, 1) 0s;  
   -ms-transition: all 0.3s cubic-bezier(0.4, 0, 1, 1) 0s; 
   -moz-transition: all 0.3s cubic-bezier(0.4, 0, 1, 1) 0s; 
   transition: all 0.3s cubic-bezier(0.4, 0, 1, 1) 0s; 
}

.effect:hover .caption {
  bottom: 0px;
}

.effect .caption .btn {
  text-align: center;
  display: block;
  margin: 140px auto;
}
</style>