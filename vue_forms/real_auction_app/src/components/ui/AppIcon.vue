<template>
<div>
    <img :src="iconLink">
</div>
</template>

<script>
import {ref} from 'vue'
    export default {
        props: {
            type: {
                type: String,
                required: true,
            },
        },
        setup(props) {
            const mainId = process.env.BASE_URL
            const linkMap = {
                'image/jpg': `${mainId}image_jpg.png`,
                'image/jpeg': `${mainId}image_jpg.png`,
                'image/png': `${mainId}image_png.png`,
                'application/msword': `${mainId}word.png`,
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': `${mainId}word.png`,
                'application/pdf': `${mainId}pdf.png`,
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': `${mainId}exel.png`,
                'application/vnd.openxmlformats-officedocument.presentationml.presentation': `${mainId}pptx.png`
            }
            const iconLink = ref(linkMap[props.type])

            // const title = ref(props.name)
            // console.log("rregeg", title.value);

            return {
                iconLink
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>