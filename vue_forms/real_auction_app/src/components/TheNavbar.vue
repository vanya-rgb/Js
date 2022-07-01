<template>
    <div>
        <nav class="navbar">
            <h3>Auction App</h3>
            <ul class="navbar-menu" v-if="windowWidth <= 900">
                <li>
                    <router-link to="/">Заявки</router-link>
                </li>
                <li>
                    <router-link to="/help">Помощь</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'PrivateCabinet', params: {localId}}">
                        Личный кабинет
                    </router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="logout">Выход</a>
                </li>
            </ul>
            <!-- <ul class="form-control navbar-menu">
                <li>
                    <input type="text">
                </li>
                <li>

                </li>
            </ul> -->
        </nav>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
    export default {
        props: ['windowWidth'],
        setup() {
            const store = useStore()
            const localId = computed(()=> store.getters['auth/localId'])

            return {
                logout: () => {
                    store.commit('auth/logout')
                }, localId
            }
        }
    }
</script>
