<template>
<div>
    <div class="breadcrumbs" v-if="back">
        <router-link to="/" class="text-white">К списку заявок</router-link>
    </div>
    <div class="card">
        <h1 class="card-title">
            {{title}}
            <slot name="header"></slot>
        </h1>

        <slot></slot>
    </div>
</div>
    
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            back: {
                type: Boolean,
                default: false
            }
        },
        setup(props) {
            document.title = `${props.title} | Клон`
        }
    }
</script>

<style lang="scss" scoped>

</style>