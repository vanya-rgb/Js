<template>
	<div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive" @drop.prevent="onDrop">
        <slot :dropZoneActive="active"></slot>
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
export default {
    emits: ['files-dropped'],
    setup(_, {emit}) {
        let active = ref(false)

        function setActive() {
            active.value = true
        }
        function setInactive() {
            setTimeout(() => {
                active.value = false
            }, 50)
        }
        function onDrop(e) {
            setInactive()
            emit('files-dropped', e.dataTransfer.files)
        }
        function preventDefaults(e) {
            e.preventDefault()
        }
        const events = ['dragenter', 'dragover', 'dragleave', 'drop']
        onMounted(() => {
            events.forEach((eventName) => {
                document.body.addEventListener(eventName, preventDefaults)
            })
        })
        onUnmounted(() => {
            events.forEach((eventName) => {
                document.body.removeEventListener(eventName, preventDefaults)
            })
        })
        return {
            active, setActive, setInactive, onDrop
        }
    }
}


</script>