<template>
<div @resize="resize">
    <div class="breadcrumbs" v-if="back">
        <router-link to="/">К списку заявок</router-link>
    </div>
    <div>
        <div class="card max-height">
            <h1 class="card-title"
                v-if="title">
                {{title}}
                <slot name="header"></slot>
            </h1>
            <slot></slot>
        </div>
    </div>
</div>
    
</template>

<script>

    export default {
        props: {
            title: {
                type: String,
                required: false
            },
            back: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return { windowWidth: window.innerWidth };
        },
        methods: {
            handleWindowResize(event) { this.windowWidth = event.currentTarget.innerWidth; },
        },
        beforeUnmount: function () {
            window.removeEventListener('resize', this. handleWindowResize)
        },
        mounted() {
            window.addEventListener('resize', this.handleWindowResize);
        },
        setup(props) {
            document.title = `${props.title}`
        }
    }
</script>

<style lang="scss" scoped>

</style>