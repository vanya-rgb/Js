<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <app-page v-else :title="userName">
        <the-castom></the-castom>
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
    import AppEmail from '../components/ui/AppEmail.vue'
    import TheCastom from '../components/TheCastom.vue'

    export default {
        components: {
            AppLoader, AppPage, AppEmail, TheCastom
        },
        setup() {
            const loading = ref(true)
            const email = ref('Неизвестно')
            // const notation = ref('Неизвестно')
            const phone = ref('Неизвестно')
            const picLink = ref()
            const userName = ref()
            const isVerifiedEmail = ref(false)
            
            const id = ref()
            // const data = ref()
            const store = useStore()
            const route = useRoute()
            id.value = route.params.id

            const verifyEmail = async()=> await store.dispatch('user/verifyEmail', email.value)
            
            onMounted(async()=> {
                const response  = await store.dispatch('user/getProfile')
                const user = response.users[0]

                if (user !== null) {
                
                    console.log("USER", user);
                    user.displayName ? userName.value = user.displayName : userName.value = 'Ник не выбран'
                    user.photoUrl ? picLink.value = user.photoUrl : picLink.value = `${process.env.BASE_URL}upload.jpg`
                    
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
                loading, userName, email, picLink, phone, id, verifyEmail, isVerifiedEmail
            }
        }
        
    }

</script>
