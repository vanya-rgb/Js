<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <!-- back как параметр который описан в app page -->
        <div v-else>
        <div class="breadcrumbs">
            <router-link :to="{name: 'PrivateCabinet', params: {localId}}">К списку заявок</router-link>
        </div>
        <app-page title="Заявка" v-if="request">
            <p><strong>Status</strong>: <app-status :type="status"></app-status></p>
            <div v-if="localId !== userLocalId">
                <router-link v-slot="{navigate}" custom :to="{name: 'UserPage', params: {userId: userLocalId}}">
                    <p><strong>Заказчик</strong>: <a @click="navigate">{{userName}}</a></p>
                </router-link>
            </div>
            <div v-else>
                <router-link v-slot="{navigate}" custom :to="{name: 'PrivateCabinet', params: {localId}}">
                    <p><strong>Заказчик</strong>: <a @click="navigate">{{userName}}</a></p>
                </router-link>
            </div>
            <p><strong>Сумма</strong>: {{currency(amount)}}</p>
            <p><strong>Файлы заказчика</strong></p>
            <table class="table min file-preview" v-if="filesList">
                <tr v-for="r in filesList" :key="r.id">
                    <app-icon
                        :type="r.type"
                        :url="r.url"
                        :name="r.name"
                    ></app-icon>
                </tr>
            </table>
            <div class="form-control">
                <label for="file-input" class="upload-container label form-control">Дать ответ на задание</label>
                <span>.jpg, .jpeg, .png, .docx, .doc, .pdf, .xlsx, .pptx</span><br>
                <span>размер файла не должен превышать 3 МБ</span><br>
                <small v-if="message">{{message}}</small>
                <drop-zone class="wrapperList" @files-dropped="onDrop">
                    <input
                        id="file-input"
                        type="file"
                        name="file"
                        required
                        multiple
                        @change="onChange">
                    <div v-if="files.length > 0">
                        <file-preview v-for="file of files" :key="file.id" :file="file" tag="ul" @remove="removeFile"></file-preview>
                    </div>
                    <div v-else>
                        <img class="uploadImg" :src="mainRoad +'upload.jpg'" alt="">
                    </div>
                </drop-zone>
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
import AppIcon from '@/components/ui/AppIcon.vue'

    export default {
        components: {
            AppPage, AppLoader, AppStatus, DropZone, FilePreview, AppIcon
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
            const filesList = ref([])
            const filesListExe = ref([])
            const executorsList = ref([])
            const offerAmount = ref()
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
                pathRandom.value = request.value.pathRandom
                status.value = request.value.status
                amount.value = request.value.amount
                //заказчик
                userName.value = request.value.userName
                //файлы заказчика
                filesList.value = request.value.files
                //проверка наличия выполненных файлов
                request.value.filesExe ? filesListExe.value = request.value.filesExe : filesListExe.value = []

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
                
                const { uploadFiles } = createUploader(`${userLocalId.value}/${pathRandom.value}-done`)
                const filesExe = await uploadFiles(files.value)
                const data = {...request.value, id:route.params.id, status: 'on_inspection', filesExe: filesExe}
                //обновили в базе
                await store.dispatch('request/update', data)
                // //получили юзера
                // const exe = await store.dispatch('user/getUserData', localId.value)
                // //убрали выполненную зявку
                // const newExe = exe.toComplite.filter(val=> {
                //     return val.id !== route.params.id
                // })
                // //список ранее выполненных
                // let oldExe = []
                // exe.сomplited ? oldExe = exe.сomplited : oldExe = []
                // //та самая выполненная заявка
                // const beforeExe = exe.toComplite.find(val=> {
                //     return val.id == route.params.id
                // })
                // oldExe.push(beforeExe)
                // //обновили профиль
                // await store.dispatch('update/updateExeData', {
                //     toComplite: newExe,
                //     сomplited: oldExe,
                //     status: 'done',
                //     localId: localId.value
                // })
                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})

            }

            //проверка что заявка уже взята пользователем
            // const alreadyExist = computed(()=>
            //     executorsList.value.find(item =>
            //         item.localId == localId.value
            //     )
            // )

            return {loading, currency, upload, status, amount, offerAmount, userName, request, filesList, userLocalId, localId, executorsList, rating,
            removeFile, onChange, onDrop, files, message, mainRoad, filesListExe
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>