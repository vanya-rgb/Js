<template>
	<component :is="tag" class="file-preview">
		<button @click="$emit('remove', file)" class="close-icon">&times;</button>
		<img :src="file.url" :alt="file.file.name" :title="file.file.name" />
	</component>
</template>

<script>
 export default {
	props: {
		file: {
			type: Object,
			required: true
		},
		tag: {
			type: String,
			default: 'li'
		}
	},
	emits: ['remove']
 }
</script>


