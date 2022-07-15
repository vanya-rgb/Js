<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div v-else>
            <!-- <div v-if="isModalComment"> -->
            <h2 class="center">Пожалуйста, оцените работу</h2>
            <app-stars
            @countChanged="num => {
                isChanged = true
                count = num
            }"
            ></app-stars>
            <!-- <h3 v-if="count">Ваша оценка {{count}} из 5</h3> -->
            <br>
            <div class="form-control">
                <textarea placeholder = "Ваш комментарий здесь..."
                rows="10"
                v-model="text">
                </textarea>
            </div>
            <br>
            <h3 class="center">"Эту заявку вы сможете найти на своей странице в разделе "Выполненные заявки"</h3>

            <button class="btn primary go_down"
            :disabled = "!isChanged"
            @click="updateExe">Дальше</button>
            <!-- </div> -->

            <!-- <div v-if="isModalGood">
                <h3>Выполненную заявку можно будет найти в разделе 'Выполненные заявки'</h3>
                <tr><img :src="mainId+'goodIcon.png'" alt=""></tr>
                <br>
                <button class="btn primary" @click="isModalGood = false">Продолжить</button>
            </div> -->
            
            <!-- <button v-if="firstStep" class="btn primary center" :disabled ="isReady" @click="saveClicked">Продолжить</button> -->
        </div>
    </div>
</template>

<script>


import {ref, onMounted} from 'vue'
// import {useStore} from 'vuex'
import AppLoader from '../ui/AppLoader.vue'
import AppStars from '../ui/AppStars.vue'
import {useStore} from 'vuex'

    export default {
        props: {
            rating: {
                type: Object,
            },
            comments: {
                type: Array
            },
            localIdExe: {
                type: String,
                required: true
            },
            localId: {
                type: String,
                required: true
            }
        },
        emits: ['action'],
        components: {
            AppLoader, AppStars
        },

        setup(props, {emit}) {
            const mainId = ref()
            const loading = ref(false)
            const count = ref()
            const text = ref('')

            const isChanged = ref(false)
            // const isModalComment = ref(true)
            // const isModalGood = ref(false)

            const res = ref([])
            const store = useStore()

            onMounted(async() => {
                mainId.value = process.env.BASE_URL
            })

            const updateExe = async()=> {
                emit('action')
                const resValue = props.rating.value + count.value
                const resCount = props.rating.count + 1
                console.log("textPre!!!!", text.value);

                if (text.value != '') {
                    console.log("text!!!!", text.value);
                    const newComments = [{
                        text: text.value,
                        score: count.value,
                        user: props.localId
                    }]
                    console.log("NEwCom", newComments);
                    if (props.comments.length > 0) {
                        console.log("more", res.value);
                        res.value = newComments.concat(props.comments)
                        console.log("morePast", res.value);
                    } else {
                        console.log("less", res.value);
                        res.value = newComments
                        console.log("lessPast", res.value);
                    }
                } else {
                    console.log("Else");
                    res.value = props.comments
                }

                console.log("props", props.comments);
                console.log("res", res.value);

                await store.dispatch('update/updateExeData', {
                    rating: {
                        count: resCount,
                        value: resValue
                    },
                    comments: res.value,
                    localId: props.localIdExe
                })
                // isModalComment.value = false
                // isModalGood.value = true
                
            }

            return {
                loading, count, text, updateExe, mainId, isChanged
            }
        }

    }
</script>

<style scoped>
.go_down {
    display: table;
    margin: 10px auto;
}
</style>