<template>
    <div>
        <div v-if="loading">Идет загрузка...</div>
        <div class="container" v-else>
            <!-- //переключатель -->
            <tr>
                <td v-if="!switcher">Поиск по нику</td>
                <td v-else>Поиск по Email</td>
                <td>
                    <label class="switch">
                        <input type="checkbox" v-model="switcher">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>
            
            <div class="form-control">
            <!-- <label for="userName">Введите пиздюка</label> -->
            <input type="text" id="userName" v-model="input">
        </div>
        <request-users-table
        :requests="requests"
        :input="input"></request-users-table>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex"
import {ref, computed, watch, onMounted} from "vue"
import RequestUsersTable from './RequestsUsersTable.vue'
    export default {
        components: {
            RequestUsersTable
        },
        setup() {
            const input = ref()
            const store = useStore()
            const loading = ref(false)
            const switcher = ref(true)

            onMounted(async()=>{
                loading.value = true
                await store.dispatch('requestUsersModule/getAllUsers')
                loading.value = false
            })

            watch(input, values => {
                console.log("userName:", values);
                if (values){
                    sendReq()
                }
            })
            const sendReq = async() => {
                await store.dispatch('requestUsersModule/findUsers', {
                    input:input.value,
                    isSwitch: switcher.value
                })
            }
            const requests = computed(()=> {
                console.log("REQUESTS", requests)
                return store.getters['requestUsersModule/users']
            })

            return {
                input, requests, loading, switcher
            }
        }
    }
</script>

<style lang="less" scoped>

</style>