<template>
	<li class="file-preview">
		<img :src="file.url" />

		<!-- <span class="status-indicator loading-indicator" v-show="file.status == 'loading'">In Progress</span>
		<span class="status-indicator success-indicator" v-show="file.status == true">Uploaded</span>
		<span class="status-indicator failure-indicator" v-show="file.status == false">Error</span> -->
	</li>
</template>

<script>
export default {
    props: ['file'],
    // emits: ['remove']
}

</script>
