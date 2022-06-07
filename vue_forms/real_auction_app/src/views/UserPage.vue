<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div v-else>
        <app-page :title="userName">
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
                        <td v-if="isVerifiedEmail">
                            <span class="badge primary"><span>Email&nbsp;</span><span>подтвержден</span></span>
                        </td>
                        <td v-else>
                            <div class="badge danger cursor">
                                <span>Email не&nbsp;</span><span> подтвержден</span>
                            </div>
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
        </app-page>

        <!-- <app-page title = "Список моих заявок">

        <request-filter-cabinet v-model="filter"></request-filter-cabinet>
        <reqest-table-cabinet :requests="requests"></reqest-table-cabinet>

        </app-page> -->
        </div>
    </div>
</template>

<script>
    
    import {ref, onMounted} from 'vue'
    import AppLoader from '../components/ui/AppLoader.vue'
    import AppPage from '../components/ui/AppPage.vue'
    import {useStore} from 'vuex'
    // import { getAuth } from "firebase/auth"
    import { preload } from 'vue-onload'
    import {useRoute} from 'vue-router'

    export default {
        components: {
            AppLoader, AppPage
        },
        setup() {
            const loading = ref(true)
            const modalCreate = ref(false)
            const modalFind = ref(false)
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
            const rating = ref({})
            // const localId = ref()
            const isVerifiedEmail = ref(false)
            // const data = ref()
            const store = useStore()
            const route = useRoute()
            localId.value = route.params.userId
            
            onMounted(async()=> {
                
                const user = await store.dispatch('user/getUserData', localId.value)

                console.log("Guest", user);
                userName.value = user.userName
                email.value = user.email
                localId.value = user.localId
                phone.value = user.phone
                user.photo.name == "unnamed" ? photo.value.link = `${process.env.BASE_URL}upload.jpg` : photo.value = user.photo
                comments.value = user.comments
                rating.value = user.rating
                isVerifiedEmail.value = user.isVerifiedEmail

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
                loading, userName, email, photo, phone, localId, rating, comments, isVerifiedEmail, modalCreate, modalFind
            }
        }
        
    }

</script>
