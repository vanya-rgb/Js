<template>
    <div>
        <nav class="navbar">
            <h2>Auction</h2>

            <ul class="navbar-menu">
                <li>
                    <router-link to="/">Home page</router-link>
                </li>
                <li>
                    <router-link to="/help">Help</router-link>
                </li>
                <li v-if="isAuth">
                    
                   <router-link to="/lk">Account</router-link>
                </li>
                <li v-else>
                   <router-link  to="/auth">Log in</router-link>
                </li>

            </ul>
        </nav>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
    export default {
        setup(){
            const store = useStore()
            const isAuth = computed(()=> store.getters.isAuth)
            return{
                isAuth
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>