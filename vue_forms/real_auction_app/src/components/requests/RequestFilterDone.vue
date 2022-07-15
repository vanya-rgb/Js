<template>
    <div class="filter">
        <div class="form-control">
            <select v-model="filter">
                <option value="castomer">Как заказчик</option>
                <option value="exe">Как исполнитель</option>
            </select>
        </div>
        <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
    </div>
</template>

<script>
import {ref, watch, computed} from 'vue'
    export default {
        //передаем name; status в filter
        emits: ['update:modelValue'],
        props: ['modelValue'],
        setup(_, {emit}) {
            const filter = ref()

            watch(filter, values => {
                emit('update:modelValue', {
                    filter: values,
                })
            })

            const isActive = computed(()=> filter.value)

            return {
                filter, isActive,
                reset: () => {
                    filter.value = ''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>