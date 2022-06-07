<template>
    <div>
        <div class="card">
            <div>{{displayName}}</div>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {onMounted, ref} from 'vue'
    export default {
        setup(){
            const user = ref({})
            const displayName = ref()

            const store = useStore()
            onMounted(async()=>{
                const userRes = await store.dispatch('user/getProfile')
                user.value = userRes.users[0]
                displayName.value = user.value.displayName
                console.log("USER", user.value);
            })
            return {
                displayName
            }
            
        }
    }
</script>

<style lang="scss" scoped>

</style>