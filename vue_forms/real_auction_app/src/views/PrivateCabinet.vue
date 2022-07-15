<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <app-page v-else>
            <div v-if="isExist">
            <div>
                <h1 style="margin-left: 40px;">{{userName}}</h1>
            <the-castom
                :localId = "localId"
                @createReq = "modalCreate = true"
                @findUser = "modalFind = true"
            ></the-castom>
            <teleport to="body">
                <app-modal v-if="modalCreate"
                :height = "'600px'"
                @close="modalCreate = false">
                    <request-modal
                    @created="modalCreate  = false"></request-modal>
                </app-modal>
                <app-modal v-else-if="modalFind" 
                title="Кого ищем?"
                :height = "'400px'"
                @close="onFindUserClose">
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
                        <app-modal v-if="changePhoto"
                        :height="'570px'"
                        @close="changePhoto = false">
                            <request-new-avatar @created="changePhoto = false"
                            @forceRerender = "(n)=> photo.link = n"
                            ></request-new-avatar>
                        </app-modal>

                        <app-email :isVerify="isVerifiedEmail" @verifyEmail="verifyEmail"
                        :email="email"
                        ></app-email><br>
                        <tr class="align-left display">
                            <th>Номер</th>
                            <td v-if="phone">{{phone}}</td>
                            <td v-else>8-800-555-35-35</td>
                        </tr><br><br>
                        <tr class="stars">
                            <star-rating
                            :value = rating.value
                            :amount = rating.count></star-rating>
                        </tr>

                    </div>
                </td>
                <td class="commentsColl">
                    <div class="details">
                    <!-- <details> -->
                        <summary
                        >Комментарии ({{commentsCount}})</summary>
                        <RequestComentList
                        :request = "comments"
                        v-if="comments.length > 0"
                        ></RequestComentList>
                        <tr v-else>
                            <p>Комментарии появляются когда вы заказываете или выполняете заявки.</p>
                            <br>
                            <img src="cometnsPhoto.png" alt="">
                        </tr>
                    </div>
                    <!-- </details> -->
                </td>
            </tr>
            
            </table>
            </div>
            </div>
            <div class="card">
                <details open>
                    <summary>Список моих заявок</summary>
                    <br>
                    <request-filter-cabinet v-model="filter"></request-filter-cabinet>
                    <request-table-cabinet :requests="requests"></request-table-cabinet>
                </details>
            </div>

            <div class="card">
                <details>
                    <br>
                    <summary>Выполняемые заявки</summary>
                    <request-table-exe :requests="requestsToComplite"></request-table-exe>
                </details>
            </div>

            <div class="card">
                <details>
                    <summary>История заявок</summary>
                    <br>
                    <request-filter-done v-model = "filterDone"></request-filter-done>
                    <request-table-done :requests="requestsComplited"></request-table-done>
                </details>
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
    import RequestFilterDone from '@/components/requests/RequestFilterDone.vue'
    import RequestTableCabinet from '@/components/requests/RequestTableCabinet.vue'
    import RequestTableExe from '@/components/requests/RequestTableExe.vue'
    import RequestTableDone from '@/components/requests/RequestTableDone.vue'
    import RequestComentList from '@/components/requests/RequestComentsList.vue'
    import StarRating from '../utils/star-rating.vue'

    export default {
        components: {
            AppLoader, AppPage, AppEmail, TheCastom, AppModal, RequestsUsers, RequestModal, RequestFilterCabinet, RequestTableCabinet, RequestTableExe, RequestTableDone, RequestNewAvatar, RequestComentList, StarRating, RequestFilterDone
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
            // const loadingCom = ref(false)
            const modalCreate = ref(false)
            const modalFind = ref(false)
            const isExist = ref(true)
            const changePhoto = ref(false)
            //данные пользователя
            const userName = ref()
            const email = ref()
            const localId = ref()

            const comments = ref([])
            const commentsCount = ref()
            const phone = ref('Неизвестно')
            const photo = ref({
                link: "upload.png",
                miniature: 'startSmailik.png'
            })
            //заявки
            // const toComplite = ref([])
            const rating = ref({})
            const score = ref()
            //filter
            const filter = ref({})
            const filterDone = ref({})
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
                return localId.value === request.localId &&request.status != 'done'
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
                return new Date(a.dateSort) - new Date(b.dateSort)
            })
            )

            const requestsToComplite = computed(()=> store.getters['request/requests']
            .filter(request => {
                if (request.performer){
                return localId.value === request.performer.localId && request.status != 'done'
                }
                // return request
            }))

            const requestsComplited = computed(()=> store.getters['request/requests']
            .filter(request => {
                if (request) {
                    return request.status == 'done'
                }
            })
            .filter(request => {
                const condition = filterDone.value.filter
                if (condition) {
                    if (condition == 'exe') {
                        return localId.value === request.performer.localId
                    } else if (condition == 'castomer') {
                        return localId.value === request.localId
                    }
                } else {
                    return request
                }
            }))

            // .filter(request => {
                
            //     if (request.performer){
            //     return localId.value === request.performer.localId && request.status == 'done'
            //     }
            //     // return request
            // }))

            const verifyEmail = async()=> await store.dispatch('user/verifyEmail', email.value)
            console.log(process.env.BASE_URL);
            
            onMounted(async()=> {

                const req =  await store.getters['request/requests']
                console.log("req", req);
                const user = await store.dispatch('user/getUserData', localId.value)
                comments.value = await aboutComentators(user.comments)

                const registrData = await store.dispatch('user/getProfile')
                const registrDataUser = registrData.users[0]
                //загрузили заяки
                await store.dispatch('request/load')

                if (user !== null) {
                    
                    console.log("COVALUe", comments.value)
                    console.log("USER", user);
                    console.log("DOC", registrDataUser);
                    userName.value = user.userName
                    email.value = registrDataUser.email
                    localId.value = user.localId
                    phone.value = user.phone
                    photo.value = user.photo
                    commentsCount.value = user.comments.length
                    rating.value = user.rating
                    const num = user.rating.value/user.rating.count
                    isNaN(num) ? score.value = 0 : score.value = num.toFixed(2)

                    isVerifiedEmail.value = registrDataUser.emailVerified
                    //инфа про коментаторов
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
                    photo.value?.link
                ]
                preload(sources, (completed) => {
                    if (completed === true) {
                        loading.value = false
                    }
                })
            })
            
            const aboutComentators = async(about) => {
                // loadingCom.value = true
                let arr = []
                about.forEach(async(item) => {
                    const user = await store.dispatch('user/getUserData', item.user)
                    arr.push({
                        userName: user.userName,
                        photo: user.photo.miniature,
                        text: item.text,
                        score: item.score,
                        localId: item.user
                    })
                })
                console.log("LIst", arr);
                return arr
                // loadingCom.value = false
                
                
            }

            return {
                loading, userName, email, photo, phone, localId, rating, comments, verifyEmail, isVerifiedEmail, modalCreate, modalFind, onFindUserClose, requests, filter, isExist,  changePhoto, requestsToComplite, requestsComplited, commentsCount, score, filterDone
            }
            // requestsToComplite, requestsComplited,, 
        }
        
    }

</script>

<style scoped>

.stars {

}

#i{
  color: #ec9801;
}

table {
    width: 100%;
}
.display {
    display: inline-grid;
}

.margin-top{
    margin-top: 1rem;
}
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

.details{
  overflow:auto;
  display:block;
  margin-bottom: 1.5rem;
  width:100%;
}

summary {
   /* display:block; */
   padding: .3em 1em .3em .9em;
   border-bottom: 1px solid #e2e8f0;
   font-size:1.4em;
   cursor: pointer;
   position: relative;
}

summary ~ * {
   padding: 0 1em 10px 1.4em;
}


</style>