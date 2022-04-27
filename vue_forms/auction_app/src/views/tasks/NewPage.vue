<template>
    <div class="modal-backdrop">
        <div class="modal">
            <form class="card" @submit.prevent="submit">
                <h1>New Task</h1>
                <div class="form-control">
                    <label for="title">Title</label>
                    <input type="text" id="title" v-model="title">
                </div>

                <div class="form-control">
                    <label for="description">Description</label>
                    <textarea type="text" id="description" v-model="description"></textarea>
                </div>

                <div class="form-control">
                    <label for="date">Deadline date</label>
                    <input type="date" id="date" v-model="date">
                </div>

                <button class="btn primary"
                :disabled="!isValid">Create</button>
                <button class="btn danger"
                @click="$emit('close')"
                >Close</button>
            </form>
        </div> 
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {computed, ref} from 'vue'

    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const title = ref('')
            const date = ref(null)
            const description = ref('')
            
            const submit = () => {
                const newTask = {
                    id: Date.now().toString(),
                    title: title.value,
                    date: new Date(date.value).setHours(23,59,59,999),
                    description: description.value,
                    status: 'active'
                }

                store.dispatch('createTask', newTask)
                router.push('/')
            }
            const isValid = computed(() => {
                return title.value !== '' && date.value && description.value !==''
            })

            return {
                submit, title, date, description, isValid
            }

        },
        emits: ['close']
    }
</script>

<style lang="scss" scoped>

</style>