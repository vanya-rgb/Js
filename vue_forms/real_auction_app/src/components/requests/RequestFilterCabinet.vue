<template>
    <div class="filter">
        <div class="form-control">
            <input type="date" placeholder="Deadline" v-model="date">
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
            const date = ref()

            watch(date, values => {
                // console.log("qwcqw", values);
                emit('update:modelValue', {
                    date: values,
                })
            })

            const isActive = computed(()=> date.value)

            return {
                date, isActive,
                reset: () => {
                    date.value = ''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>