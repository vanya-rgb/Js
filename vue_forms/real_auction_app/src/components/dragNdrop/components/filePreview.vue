<template>
	<component :is="tag">

			<tr style="vertical-align: middle;">
				<td class="alert-title">{{idx+1}}.</td>
				<td>
					<app-icon :type="file.type"></app-icon>
				</td>
				<td class="short-text">
						<a :href="file.url" target="_blank">{{file.name}}</a>
					</td>
				<td>
					<img :src="iconLink" @click="$emit('remove', file)" >
				</td>
			</tr>

	</component>
</template>

<script>
import AppIcon from '@/components/ui/AppIcon.vue'

 export default {
	props: {
		file: {
			type: Object,
			required: true
		},
		tag: {
			type: String,
			default: 'li'
		},
		idx: {
			type: Number,
			required: false
		},
	},
	setup() {
		const mainId = process.env.BASE_URL

		return {
			iconLink: `${mainId}closeIcon.png`
		}
	},
	components: {
		AppIcon
	},
	emits: ['remove']
 }
</script>


