<template>
    <span :class="['badgeRating', className]">
    <font-awesome-icon id="i" icon="fa fa-star" size="1x" />
        {{text}}
    </span>
</template>

<script>
import {ref} from 'vue'
    export default {
        props: {
            rating: {
                type: Number
            }
        },
        setup(props) {

            const classMap = {
                1: 'danger',
                2: 'warning',
                3: 'warning',
                4: 'dirtyPrimary',
                5: 'primary',
            }

            const className = ref(classMap[props.rating])
            const text = ref(props.rating)

            return {
                className, text
            }
        }
    }
</script>

<style scoped>
.badgeRating {
    font-size: 1rem;
    border-radius: 30px;
    margin: 0.2rem;
}



</style>