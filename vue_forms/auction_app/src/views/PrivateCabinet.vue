<template>
    <div>
        <new-page
            v-if="modal"
            @close="modal = false"
        ></new-page>

        <div class="card">
            <button class="btn primary" @click="modal = !modal">Show</button>
        </div>
    </div>
</template>

<script>
import NewPage from './tasks/NewPage.vue'
    export default {
        data() {
            return {
                modal: false,

            }
        },
        components: {
            NewPage
        }
    }
</script>

<style lang="scss" scoped>

</style>