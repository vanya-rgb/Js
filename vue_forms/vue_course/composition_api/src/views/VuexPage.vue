<template>
    <div>
        <div class="card">
            <h1>{{ appTitle }}</h1>
            <!-- $store.getters.appTitle -->
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
    export default {
        setup() {
            const store = useStore()


            return {
                appTitle: store.getters.appTitle.toUpperCase()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>