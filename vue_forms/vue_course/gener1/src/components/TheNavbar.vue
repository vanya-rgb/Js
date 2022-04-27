<template>
    <div>
        <nav class="navbar">
            <h3>Hello World</h3>
            <ul class="navbar-menu">
                <li>
                    <router-link to="/">Заявки</router-link>
                </li>
                <li>
                    <router-link to="/help">Помощь</router-link>
                </li>
                <!-- <li>
                    <router-link to="/lk">Личный кабинет</router-link>
                </li> -->
                <li>
                    <router-link :to="{name: 'PrivateCabinet', params: {id}}">
                        Личный кабинет
                    </router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="logout">Выход</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {computed} from 'vue'
    export default {
        setup() {
            const router = useRouter()
            const store = useStore()
            const id = computed(()=> store.getters['auth/userId'])

            return {
                logout: () => {
                    store.commit('auth/logout')
                    router.push('/auth')
                },
                id
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>