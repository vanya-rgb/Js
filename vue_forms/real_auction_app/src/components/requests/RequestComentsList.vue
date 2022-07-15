<template>
    
        <div class="table">
            <tr v-for="(r, idx) in request" :key="idx">
            <td><img class="wrapper" :src="r.photo" alt=""></td>
            <td>
                <div class="content">
                    <a class="nickName" href="">{{r.userName}}</a>
                    <app-badge-rating
                        :rating= r.score
                    >
                    </app-badge-rating>
                    
                    <div class="text">{{r.text}}</div>
                </div>
            </td>
            </tr>
        </div>
    
</template>

<script>
// import {currency} from '../../utils/currency-formator'
// import AppStatus from '../ui/AppStatus.vue'
import AppBadgeRating from '../ui/AppBadgeRating.vue'
    export default {
        props: ['request'],
        setup() {
            // return {currency}
        },
        components: {
            AppBadgeRating
        }
    }
</script>

<style scoped>
.content {
    /* vertical-align: top; */
    text-align: left;
    overflow: hidden;
}
.nickName {
    font: 700;
    font-size: 1.1rem;
    margin-right: 1rem;
}
.text {
    background: #f0f0f0; /* Цвет фона */
    width: 300px;
    border-radius: 10px;
    /* min-width: 300px; Ширина блока */
    padding: 10px; /* Поля */
    /* font-size: 1.2em; Размер шрифта */
    word-wrap: break-word; /* Перенос слов */ 
}

.table {
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
    vertical-align: top;
}

</style>