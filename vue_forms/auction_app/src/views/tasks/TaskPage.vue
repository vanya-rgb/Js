<template>
    <div>
        <div class="card" v-if="task">
            <h2>{{task.title}}</h2>
            <p><strong>Status</strong>
                : <app-status :type="task.status"></app-status>
            </p>
            <p><strong>Deadline</strong>
                : {{ new Date(task.date).toLocaleDateString()}}
            </p>
            <p><strong>Description</strong>
                : {{task.description}}
            </p>
            <div>
                <button class="btn" @click="setStatus('pending')">Take</button>
                <button class="btn primary" @click="setStatus('done')">To complete</button>
                <button class="btn danger" @click="setStatus('cancelled')">Cancelled</button>
            </div>
        </div>
        <h3 class="text-write center" v-else>
            There in no tasks with id {{idKey}}
        </h3>
    </div>
</template>

<script>
import AppStatus from '../../components/AppStatus.vue'
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

    export default {
        components: {
            AppStatus
        },
        props: ['id'],
        setup(props) {
            const store = useStore()
            const router = useRouter()

            const task = computed(() => store.getters.taskbyId(props.id))

            const setStatus = status => {
                const updated = {...task.value, status}
                store.dispatch('changeTask', updated)
                router.push('/')
            }
            return {
                setStatus, idKey: props.id, task
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>