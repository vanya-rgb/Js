<template>
    <div>
         <div class="container">
             <div class="card">
                <help-task
                    text = "Problem understanding how it works"
                    answer = "Just magic"
                ></help-task>
             </div>
             <div class="card">
                <help-task
                    text = "`The main problem with quotes on the Internet is that people immediately believe in their authenticity` V. I. Lenin"
                    answer = "We know that you did not say this Lenin"
                ></help-task>
            </div>
         </div>
    </div>
</template>

<script>
import HelpTask from './HelpTask.vue'
    export default {
        components: {
            HelpTask
        }
    }
</script>

<style lang="scss" scoped>

</style>