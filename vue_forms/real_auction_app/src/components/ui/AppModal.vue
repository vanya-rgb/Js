<template>
    <div>
        <div class="modal-backdrop" @click="$emit('close')"></div>
        <div class="modal" :style="{
            height: height
        }">
            <div class="sc-modal">
                <h3 v-if="title">{{title}}</h3>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            },
            height: {
                type: String,
                required: false,
                defaulf: '400px'
            }
        },
        emits: ['close']
    }
</script>
