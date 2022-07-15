<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <!-- back как параметр который описан в app page -->
        <div v-else>
        <div class="breadcrumbs">
            <router-link :to="{name: 'PrivateCabinet', params: {localId}}">К списку заявок</router-link>
        </div>
        <app-page v-if="request">

            <router-link v-slot="{navigate}" custom :to="{name: 'UserPage', params: {userId: userLocalId}}">
                <h2>Заказчик:
                    <a @click="navigate">{{userName}}</a>
                </h2>
            </router-link>

            <p><app-status :type="status"></app-status></p>
            
            <p><strong>Сумма: {{currency(amount)}}</strong></p>
            <p><strong>Срок заявки истекает&nbsp;{{deadline}}</strong></p>
            <p><strong>
                Описание:&nbsp;{{descriptionCast}}
            </strong></p>
            
            <h3>Файлы заказчика:</h3>
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

            <div class="form-control">
                <label for="file-input">
                    <h2 v-if="files.length == 0">Дать ответ на задание</h2>
                    <h2 v-else>Добавить файл</h2>
                </label>
                <span>.jpg, .jpeg, .png, .docx, .doc, .pdf, .xlsx, .pptx</span><br>
                <span>размер файла не должен превышать 3 МБ</span><br>
                <small v-if="message">{{message}}</small>
                <drop-zone class="wrapperList uploadBorder" @files-dropped="onDrop">
                    <input
                        id="file-input"
                        type="file"
                        name="file"
                        required
                        multiple
                        @change="onChange">
                    <div v-if="files.length > 0">
                        <file-preview v-for="(file, idx) of files" :key="file.id"
                        :file="file"
                        :idx = "idx"
                        tag="ul" @remove="removeFile"></file-preview>
                    </div>
                    <div v-else>
                        <label for="file-input"><img class="uploadImg" :src="mainRoad +'upload.png'" alt=""></label>
                    </div>
                </drop-zone>
            </div>

            <div class="form-control">
                <label for="description">Коментарии к ответу</label>
                <textarea name="description" id="description" rows="10"
                v-model="description"
                ></textarea>
            </div>
            <!-- //прикрепить новые сделанные -->
            <button class="btn danger" @click="upload" :disabled="!(files.length > 0)">Отправить работу</button>
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
import {currency} from '../utils/currency-formator'
import useFileList from '../components/dragNdrop/composition/file-list'
import DropZone from '../components/dragNdrop/components/dropZone.vue'
import FilePreview from '../components/dragNdrop/components/filePreview.vue'
import createUploader from '../components/dragNdrop/composition/file-uploader'

    export default {
        components: {
            AppPage, AppLoader, AppStatus, DropZone, FilePreview
        },

        setup() {
            const loading = ref(true)
            const route = useRoute()
            const router = useRouter()
            const store = useStore()
            // const router = useRouter()
            //request
            const request = ref({})
            //executor
            // const executorName = ref()
            const rating = ref({})
            // const photo = ref({})
            //application
            const status = ref()
            const userName = ref()
            const userLocalId = ref()
            const localId = ref()
            const amount = ref()
            const deadline = ref()
            //описание от исполнителя
            const description = ref()
            //описание от заказчика
            const descriptionCast = ref()

            const filesList = ref([])

            const mainRoad = ref()
            const pathRandom = ref()
            
            //базовый url
            mainRoad.value = process.env.BASE_URL
            onMounted(async()=> {

                loading.value = true
                //id исполнителя
                localId.value = store.getters['auth/localId']

                request.value = await store.dispatch('request/loadById', route.params.id)
                // const userDbData = await store.dispatch('user/getUserData', localId.value)
                // //исполнитель
                // console.log('userDbData', userDbData);
                // executorName.value = userDbData.userName
                // rating.value = userDbData.rating
                // photo.value = userDbData.photo
                console.log("reqyest", request.value);
                pathRandom.value = request.value.pathRandom
                status.value = request.value.status
                amount.value = request.value.amount
                //заказчик
                userName.value = request.value.userName
                descriptionCast.value = request.value.description
                deadline.value = request.value.date
                //файлы заказчика
                filesList.value = request.value.files
                //проверка наличия выполненных файлов
                // request.value.filesExe ? filesListExe.value = request.value.filesExe : filesListExe.value = []

                userLocalId.value = request.value.localId
                // request.value.executorsList ? executorsList.value = request.value.executorsList : executorsList.value = []
                // executorsList.value = user.value?.executorsList
                loading.value = false
            })

            //путь к файлам заказчика
            const {files, addFiles, removeFile, message} = useFileList()

            const onChange = async (e) => {
                addFiles(e.target.files)
                e.target.value = null
            }

            const onDrop = async(e) => {
                addFiles(e)
                e = null
            }

            const upload = async()=> {
                loading.value = true
                const { uploadFiles } = createUploader(`${userLocalId.value}/${pathRandom.value}-done`)

                const filesExe = await uploadFiles(files.value)
                console.log('filexEXE', filesExe);
                const data = {...request.value, id:route.params.id, status: 'on_inspection', filesExe: filesExe, descriptionExe: description.value}
                //обновили в базе
                await store.dispatch('request/update', data)
               
                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})
                loading.value = false

            }

            

            return {loading, currency, upload, status, amount, userName, request, filesList, userLocalId, localId, rating,
            removeFile, onChange, onDrop, files, message, mainRoad, description, descriptionCast, deadline
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>