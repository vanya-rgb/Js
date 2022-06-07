<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div v-else>
        <app-page :title="userName">
        <the-castom @createReq="modal = true"></the-castom>
        <teleport to="body">
            <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
                <request-modal @created="modal  = false"></request-modal>
            </app-modal>
        </teleport>
        <table class="card table">
            <tr>
                <td>
                    <div class="wrapper">
                        <img :src="picLink">
                    </div>
                    
                </td>
                <td class="text">
                    <tr>
                        <td>Email:</td>
                        <td>{{email}}</td>
                        <app-email :isVerify="isVerifiedEmail" @verifyEmail="verifyEmail"></app-email>
                    </tr>
                    <tr>
                        <td>Телефон:</td>
                        <td>{{phone}}</td>
                    </tr>
                </td>
            </tr>

        </table>
         <router-link :to="{name: 'Edit', params: {id}}">
             Обновить
        </router-link>
        </app-page>

        <app-page title = "Список моих заявок">

        <request-filter-cabinet v-model="filter"></request-filter-cabinet>
        <reqest-table-cabinet :requests="requests"></reqest-table-cabinet>

        </app-page>
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
    import RequestModal from '../components/request/RequestModal.vue'
    import RequestFilterCabinet from '../components/request/RequesrFilterCabinet.vue'
    import ReqestTableCabinet from '../components/request/RequestTableCabinet.vue'

    export default {
        components: {
            AppLoader, AppPage, AppEmail, TheCastom, AppModal, RequestModal, RequestFilterCabinet, ReqestTableCabinet
        },
        setup() {
            const loading = ref(true)
            const modal = ref(false)
            const email = ref('Неизвестно')
            // const notation = ref('Неизвестно')
            const phone = ref('Неизвестно')
            const picLink = ref()
            const userName = ref()
            const localId = ref()
            const filter = ref({})
            const isVerifiedEmail = ref(false)
            const id = ref()
            // const data = ref()
            const store = useStore()
            const route = useRoute()
            id.value = route.params.id

            const verifyEmail = async()=> await store.dispatch('user/verifyEmail', email.value)

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
            const qwe = computed(()=> store.getters['request/requests'])
            console.log(qwe.value)
            
            onMounted(async()=> {
                
                await store.dispatch('request/load')
                const response  = await store.dispatch('user/getProfile')
                const user = response.users[0]

                if (user !== null) {
                
                    console.log("USER", user);
                    user.displayName ? userName.value = user.displayName : userName.value = 'Ник не выбран'
                    user.photoUrl ? picLink.value = user.photoUrl : picLink.value = `${process.env.BASE_URL}upload.jpg`
                    localId.value = user.localId
                    email.value = user.email
                    
                    isVerifiedEmail.value = user.emailVerified

                    const sources = [
                            picLink.value,
                        ]

                    preload(sources, (completed) => {
                        if (completed === true) {
                            loading.value = false
                        }
                    })
                } else {
                    console.log('User is signed out');
                }
            })
            

           

            return {
                loading, userName, email, picLink, phone, id, verifyEmail, isVerifiedEmail, modal, requests, filter
            }
        }
        
    }

</script>
