<template>
    <div class="card card-w30">
        <template v-if="blocks.length">
          <component
            v-for="block in blocks"
            :key="block.id"
            :is="'resume-' + block.type"
            v-bind="{value: block.value}"
          ></component>
        </template>
        <h3 v-else>Add first block to see the result</h3>
      </div>
</template>

<script>
import ResumeAvatar from './parts/ResumeAvatar.vue'
import ResumeSubtitle from './parts/ResumeSubtitle'
import ResumeText from './parts/ResumeText'
import ResumeTitle from './parts/ResumeTitle'

export default {
    props: ['blocks'],
    components: {
        ResumeAvatar,
        ResumeSubtitle,
        ResumeText,
        ResumeTitle
    }
}
</script>

<style lang="scss" scoped>

</style>