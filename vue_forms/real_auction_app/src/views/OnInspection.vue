<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <!-- back как параметр который описан в app page -->
        <div v-else>
        <div class="breadcrumbs">
            <router-link :to="{name: 'PrivateCabinet', params: {localId}}">На мою cтраницу</router-link>
        </div>
        <app-page v-if="request">

            <router-link v-slot="{navigate}" custom :to="{name: 'UserPage', params: {userId: userLocalId}}">
                <h2>Выполнил:
                    <a @click="navigate">{{userName}}</a>
                </h2>
            </router-link>

            <p><app-status :type="status"></app-status></p>
            
            <h3>Полученное решение:</h3>
            <div class="highlight" v-if="filesList">
                <file-preview v-for="(file, idx) in filesList"
                    :key="file.id"
                    :file="file"
                    :idx = "idx"
                    :hide = "true"
                    tag="ul"
                >
                </file-preview>
            </div>

            <p><strong v-if="description">Описание: {{description}}</strong></p>

            <button class="btn warning" @click="isModalBad = true">Я не доволен</button>
            <button class="btn primary" @click="isModalGood = true">Отличная работа!</button>

            <app-modal v-if="isModalGood"
            :height = "'420px'"
            @close = "isModalGood = false">
                <request-feedback
                :rating = "rating"
                :comments = "comments"
                :localIdExe = "userLocalId"
                :localId = "localId"
                @action = "updateRequest"
                ></request-feedback>
            </app-modal>

            <!-- <app-modal-min v-if="isModalGood" title="Выполненную заявку можно будет найти в разделе 'Выполненные заявки'." @close = "isModalGood = false">
            <div>
                <tr><img :src="mainId+'goodIcon.png'" alt=""></tr>
                <br>
            <button class="btn primary margin-left" @click="isModalGood = false">Продолжить</button>
            </div>
            </app-modal-min> -->

            <app-modal v-if="isModalBad" title="Опишите проблему, что не так? Что нужно будет переделать?" 
            class="center"
            @close = "isModalBad = false">
            <div>
                <tr><img :src="mainId+'badIcon.png'" alt=""></tr><br>
            <button class="btn danger margin-left" @click="isModalBad = false">Жаловаться</button>
            </div>
            </app-modal>

            <!-- //прикрепить новые сделанные -->
        </app-page>
        <h3 v-else class="text-center text-white">
            Заявки с ID = {{$route.params.id}} нет.
        </h3>
        </div>
    </div>
</template>

<script>
// useRouter
import {useRoute, useRouter} from 'vue-router'
import AppPage from '../components/ui/AppPage.vue'
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus.vue'
import FilePreview from '../components/dragNdrop/components/filePreview.vue'
// import AppModal from '@/components/ui/AppModal.vue'
import AppModal from '../components/ui/AppModal'
import RequestFeedback from '@/components/requests/RequestFeedback.vue'

    export default {
        components: {
            AppPage, AppLoader, AppStatus, FilePreview, RequestFeedback, AppModal
        },

        setup() {
            const loading = ref(true)
            const route = useRoute()
            // const router = useRouter()
            const store = useStore()
            const router = useRouter()
            //request
            const request = ref({})
            //executor
            const status = ref()
            const userName = ref()
            const userLocalId = ref()
            const localId = ref()
            const comments = ref()
            const rating = ref()
            //описание от исполнителя
            const description = ref()
            //modal
            const isModalGood = ref(false)
            const isModalBad = ref(false)

            const filesList = ref([])

            const mainId = ref()
            
            //базовый url
            mainId.value = process.env.BASE_URL
            onMounted(async()=> {

                loading.value = true
                //id заказчика
                localId.value = store.getters['auth/localId']
                console.log('local', localId.value);

                request.value = await store.dispatch('request/loadById', route.params.id)

                console.log("reqyest", request.value);
                status.value = request.value.status
                //исполнитель
                
                userLocalId.value = request.value.performer.localId
                //все об исполнителе чтобы в дальнейшеем поменять рейтинг и отзывы
                const exeData = await store.dispatch('user/getUserData', userLocalId.value)
                userName.value = exeData.userName
                rating.value = exeData.rating
                comments.value = exeData.comments

                console.log("exeData", exeData);

                description.value = request.value.descriptionExe
                //файлы заказчика
                filesList.value = request.value.filesExe
                //проверка наличия выполненных файлов
                // request.value.filesExe ? filesListExe.value = request.value.filesExe : filesListExe.value = []

                
                // request.value.executorsList ? executorsList.value = request.value.executorsList : executorsList.value = []
                // executorsList.value = user.value?.executorsList
                loading.value = false
            })

            const updateRequest = async() => {
                console.log("onIncp");
                // loading.value = true
                const data = {...request.value, id:route.params.id, status: 'done'}
                //обновили в базе
                await store.dispatch('request/update', data)
                router.push(`/${localId.value}`)
                // loading.value = false
            }



            return {loading, status, userName, request, filesList, userLocalId, localId,
            mainId, description, isModalGood, isModalBad, comments, rating, updateRequest
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>