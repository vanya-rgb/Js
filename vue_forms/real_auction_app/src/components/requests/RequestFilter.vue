<template>
    <div class="filter">
        <div class="form-control">
            <select v-model="filter">
                <option disabled selected>Сортировка дэдлайну</option>
                <option value="earlier">Уже скоро</option>
                <option value="later">Можно не торопиться</option>
                <option disabled selected>Сортировка по стоимости</option>
                <option value="expensive">Дорогие</option>
                <option value="cheap">Дешевые</option>
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
            const filter = ref('earlier')

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