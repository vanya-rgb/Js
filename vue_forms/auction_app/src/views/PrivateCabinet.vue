<template>
    <div class="container with-nav">
        <div class="sidebar">
            <new-page
                v-if="modal"
                @close="modal = false"
            ></new-page>

            <div class="card text-center" @click="modal = !modal">Create new task</div>
            <div class="card text-center" @click="logout">Log out</div>

        </div>
        <div class="card login" v-if="user.firstName !== ''">
            <div class="card marked">
                <strong>{{user.firstName}}</strong>
                <br>
                <strong>{{user.secondName}}</strong>
            </div>
        </div>
        <h1 class="text-white center" v-else>You shouldn't be here</h1>
        
    </div>
</template>

<script>
import NewPage from './tasks/NewPage.vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {computed} from 'vue'
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const user = computed(()=> store.getters.user)
            console.log(user)

            function logout() {
                store.dispatch('changeAuthStatus')
                router.push('/')
            }
            return {
                logout, user
            }
        },
        data() {
            return {
                modal: false,

            }
        },
        components: {
            NewPage
        }
    }
</script>

<style lang="scss" scoped>

</style>