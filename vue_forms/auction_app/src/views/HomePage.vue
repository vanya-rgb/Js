<template>
    <div>
       <all-tasks></all-tasks>
    </div>
</template>

<script>
import AllTasks from './tasks/AllTasksPage.vue'
    export default {
        name: 'HomePage',
        components: {
            AllTasks
        }
    }
</script>

<style lang="scss" scoped>

</style>