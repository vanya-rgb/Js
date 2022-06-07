<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <!-- back как параметр который описан в app page -->
        <div v-else>
        <app-page back title="Заявка" v-if="request">
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
            <table class="table min" v-if="filesList">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Файлы</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(r, idx) in filesList" :key="r.id">
                        <td>{{idx+1}}</td>
                        <td>
                            <a :href="r.url" target="_blank">{{r.name}}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="form-control">
                <label for="file-input" class="upload-container label form-control">Выберите (или перетищите) файл</label>
                <drop-zone class="wrapper" @files-dropped="onDrop">
                    <input id="file-input" type="file" name="file" multiple @change="onChange">
                    <div class="card">
                    <file-preview v-for="file of files" :key="file.id" :file="file" tag="li" @remove="removeFile"></file-preview>
                    </div>
                </drop-zone>
            </div>
            <!-- //прикрепить новые сделанные -->
            <button class="btn danger" @click="upload">Отправить работу</button>
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
import {ref, onMounted, computed} from 'vue'
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
            const executorName = ref()
            const rating = ref({})
            const photo = ref({})
            //application
            const status = ref()
            const userName = ref()
            const userLocalId = ref()
            const localId = ref()
            const amount = ref()
            const filesList = ref([])
            const executorsList = ref([])
            const offerAmount = ref()

            //путь к файлам заказчика

            const {files, addFiles, removeFile} = useFileList()

            const onChange = async (e) => {
                console.log("FILES", e.target.files);
                addFiles(e.target.files)
                console.log("files", files.value);
                e.target.value = null
            }

            const onDrop = async(e) => {
                console.log("FILES", e);
                addFiles(e)
            }

            const upload = async()=> {
                
                const { uploadFiles } = createUploader(`${userLocalId.value}/forWork`)
                const file = await uploadFiles(files.value)
                const data = {...request.value, id:route.params.id, status: 'done', filesExe: file}
                //обновили в базе
                await store.dispatch('request/update', data)
                //получили юзера
                const exe = await store.dispatch('user/getUserData', localId.value)
                //убрали выполненную зявку
                const newExe = exe.toComplite.filter(val=> {
                    return val.id !== route.params.id
                })
                //список ранее выполненных
                let oldExe = []
                exe.сomplited ? oldExe = exe.сomplited : oldExe = []
                //та самая выполненная заявка
                const beforeExe = exe.toComplite.find(val=> {
                    return val.id == route.params.id
                })
                console.log('beforeExe', beforeExe);
                oldExe.push(beforeExe)
                //обновили профиль
                store.dispatch('update/updateExeData', {
                    toComplite: newExe,
                    сomplited: oldExe,
                    status: 'done',
                    localId: localId.value
                })
                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})

            }

            onMounted(async()=> {
                loading.value = true
                //localId
                localId.value = store.getters['auth/localId']
                console.log("ID", localId.value);
                request.value = await store.dispatch('request/loadById', route.params.id)
                const userDbData = await store.dispatch('user/getUserData', localId.value)
                //исполнитель
                console.log('userDbData', userDbData);
                executorName.value = userDbData.userName
                rating.value = userDbData.rating
                photo.value = userDbData.photo

                status.value = request.value.status
                amount.value = request.value.amount
                userName.value = request.value.userName
                filesList.value = request.value.files
                userLocalId.value = request.value.localId
                console.log("!!!", userLocalId.value);
                request.value.executorsList ? executorsList.value = request.value.executorsList : executorsList.value = []
                // executorsList.value = user.value?.executorsList
                loading.value = false
            })

            
            //проверка что заявка уже взята пользователем
            const alreadyExist = computed(()=>
                executorsList.value.find(item =>
                    item.localId == localId.value
                )
            )



            return {loading, currency, upload, status, amount, offerAmount, userName, request, filesList, userLocalId, localId, executorsList, alreadyExist, rating,
            removeFile, onChange, onDrop, files
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>