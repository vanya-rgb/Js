<template>
    <div>
        <h4 v-if="!input" class="text-center">Начните поиск...</h4>
        <h4 v-else-if="requests.length == 0" class="text-center">Такого пользователя нет</h4>
        <table v-else class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Ник</th>
                    <th>Email</th>
                    <!-- <th>Deadline</th>
                    <th>Предмет</th>
                    <th>Действие</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(r, idx) in requests" :key="r.localId">
                    <td>{{idx + 1}}</td>
                    <td>{{r.userName}}</td>
                    <td>{{r.email}}</td>
                    <td>
                        <router-link v-slot="{navigate}" custom :to="{name: 'UserPage', params: {userId: r.localId}}">
                            <button class="btn" @click="navigate">Открыть</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {currency} from '../../utils/currency-formator'
// import AppStatus from '../ui/AppStatus.vue'
    export default {
        props: ['requests', 'input'],
        setup() {
            return {currency}
        },
        components: {
            // AppStatus
        }
    }
</script>

<style lang="scss" scoped>

</style>