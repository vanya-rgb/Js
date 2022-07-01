<template>
    <div class="sidebar-menu">
        <ul>
            <li>
                <img :src="mainId+'request.png'" alt="">
                <router-link to="/">Заявки</router-link>
            </li>
            <li>
                <img :src="mainId+'help.png'" alt="">
                <router-link to="/help">Помощь</router-link>
            </li>
            <li>
                <img :src="mainId+'user.png'" alt="">
                <router-link :to="{name: 'PrivateCabinet', params: {localId}}">
                    Моя страница
                </router-link>
            </li>
            <li>
                <img :src="mainId+'exit.png'" alt="">
                <a href="#" @click.prevent="logout">Выход</a>
            </li>
        </ul>
    </div>
</template>
<script>
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
    export default {
        setup() {
            const mainId = ref()
            mainId.value = process.env.BASE_URL
            const store = useStore()
            const localId = computed(()=> store.getters['auth/localId'])

            return {
                logout: () => {
                    store.commit('auth/logout')
                }, localId, mainId
            }
        }
    }
</script>
