<template>
    <div>
        <h4 v-if="requests.length == 0" class="text-center">Заявок пока нет</h4>
        <table v-else class="table"> 
            <thead>
                <tr>
                    <th>#</th>
                    <!-- <th>Ник</th> -->
                    <th>Сумма</th>
                    <th>Deadline</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(r, idx) in requests" :key="r.id">
                    <td>{{idx + 1}}</td>
                    <!-- <td>{{r.userName}}</td> -->
                    <td>{{currency(r.amount)}}</td>
                    <td>{{r.date}}</td>
                    <td><app-status :type="r.status"></app-status></td>
                    <td>
                        <div v-if="r.status == 'done'">
                            <router-link v-slot="{navigate}" custom :to="{name: 'RequestDone', params: {id: r.id}}">
                            <button class="btn" @click="navigate" :disabled="r.status == 'in_progress'">Открыть</button>
                        </router-link>
                        </div>
                        <div v-else>
                        <router-link v-slot="{navigate}" custom :to="{name: 'RequestCabinet', params: {id: r.id}}">
                            <button class="btn" @click="navigate" :disabled="r.status == 'in_progress'">Открыть</button>
                        </router-link>
                        </div>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {currency} from '../../utils/currency-formator'
import AppStatus from '../ui/AppStatus.vue'
    export default {
        props: ['requests'],
        setup() {
            return {currency}
        },
        components: {
            AppStatus
        }
    }
</script>

<style lang="scss" scoped>

</style>