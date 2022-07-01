<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div v-else>
            <div v-if="request">
            <div class="breadcrumbs">
            <router-link :to="{name: 'PrivateCabinet', params: {localId}}">Обратно на страницу</router-link>
            </div>
            <app-page title="Заявка">
                <p><strong>&nbsp;Status</strong>: <app-status :type="request.status"></app-status></p>

                <p><strong>&nbsp;Ник</strong>: {{request.userName}}</p>

                <div class="form-control">
                    <label for="amount">Сумма:</label>
                    <input type="number" id="amount" v-model.number="amount">
                </div>

                <div class="form-control">
                    <label for="date">Deadline</label>
                    <input type="date" :min="new Date().toISOString().split('T')[0]" id="date" v-model="date">
                </div>

                <div class="form-control">
                    <label for="file-input" class="upload-container label form-control">Внести изменения в файлы</label>
                    <span>.jpg, .jpeg, .png, .docx, .doc, .pdf, .xlsx, .pptx</span><br>
                    <span>размер файла не должен превышать 3 МБ</span><br>
                    <!-- <span></span><br> -->
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
                            <file-preview v-for="(file, idx) of files"
                            :key="file.id"
                            :file="file"
                            :idx = "idx"
                            tag="ul" @remove="(file)=> {
                                hasChanges = true
                                removeFile(file)
                            }"></file-preview>
                        </div>
                        <div v-else>
                            <img class="uploadImg" :src="uploadImg" alt="">
                        </div>
                    </drop-zone>
                </div>

                <div class="form-control">
                    <label for="description">Описание</label>
                    <textarea name="textarea" id="description"
                    v-model="description" required></textarea>
                </div><br>

                <button class="btn danger" @click="remove">Удалить заявку</button>
                <button v-if='hasChanges' class="btn"
                @click="update"
                :disabled = "files.length == 0"
                >Обновить</button>
            </app-page>
            </div>
            <h3 v-else class="text-center text-white">
                Заявки с ID = {{$route.params.id}} нет.
            </h3>

            <app-page title="Предложившие помощь" >
                <table class="table" v-if="executorsList.length !== 0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Исполнитель</th>
                            <th>Рейтинг</th>
                            <th>Сумма</th>
                            <th>Выбрать</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(r, idx) in executorsList" :key="r.id">
                            <td>{{idx+1}}</td>
                            <td>
                                <div>
                                    <router-link v-slot="{navigate}" custom :to="{name: 'UserPage', params: {userId: r.localId}}">
                                        <a @click="navigate">{{r.userName}}</a>
                                    </router-link>
                                </div>
                            </td>
                            <td>{{r.rating.value}}/{{r.rating.count}}</td>
                            <td>{{currency(r.amount)}}</td>
                            <td><button class="btn" @click="choosePerformer(r)">Назначить</button></td>
                        </tr>
                    </tbody>
                </table>
                <app-page class="text-center" v-else><h3>Пока никто не вызвался:(</h3></app-page>
            </app-page>
        </div>
    </div>
</template>

<script>
import {useRoute, useRouter} from 'vue-router'
import AppPage from '../components/ui/AppPage.vue'
import {ref, onMounted, watch, computed} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus.vue'
import {currency} from '../utils/currency-formator'
import createRemover from '../components/dragNdrop/composition/file-remove'
// import AppIcon from '@/components/ui/AppIcon.vue'
import useFileList from '@/components/dragNdrop/composition/file-list'
import DropZone from '@/components/dragNdrop/components/dropZone.vue'
import filePreview from '@/components/dragNdrop/components/filePreview.vue'
import createUploader from '@/components/dragNdrop/composition/file-uploader'
import {dateFormator} from '../utils/date-formator'

    export default {
        components: {
            AppPage, AppLoader, AppStatus, DropZone, filePreview
        },
        setup() {
            const loading = ref(true)
            const route = useRoute()
            const router = useRouter()
            const store = useStore()
            const status = ref()
            const date = ref()
            const amount = ref()
            const description = ref()
            const result = ref([])
            const localId = ref()
            const pathRandom = ref()
            const file = ref([])
            const filesAtStart = ref([])
            //
            const executorsList = ref([])
            const hasChanges = ref(false)
            // const toComplite = ref([])
            //наш объект
            const request = ref({})

            // const hasChanges = computed(()=> request.value.date !== date.value ||  request.value.amount!== amount.value || filesAtStart.value != files.value)


            const {files, addFiles, removeFile, addFileDirect, message} = useFileList()

            onMounted(async()=> {
                loading.value = true
                localId.value = store.getters['auth/localId']
                //обращаемся к loadById. передаем id из параметров пути
                request.value = await store.dispatch('request/loadById', route.params.id)
                //заполение статуса
                status.value = request.value?.status
                date.value = request.value?.date
                file.value = request.value?.files
                amount.value = request.value.amount
                description.value = request.value.description
                //добавили файлы в общий список изменив
                if (file.value) {
                    addFileDirect(file.value)
                }
                //запомнили файлы в начале
                
                filesAtStart.value = file.value
                console.log("!!Start", request.value);

                pathRandom.value = request.value.pathRandom
                //executorsList
                request.value.executorsList ? executorsList.value = request.value.executorsList : executorsList.value = []

                watch([date, amount, files, description], () => {
                    console.log("HASChandeg");
                // console.log("NEW", newValues);
                // console.log("PREV", prevValues);
                hasChanges.value = true
                })
                loading.value = false
            })

            

            const onChange = async (e) => {
                const filesLocal = e.target.files
                addFiles(filesLocal)
                console.log("files", files.value);
                e.target.files = null
            }

            const onDrop = async(e) => {
                console.log("FILES", e);
                addFiles(e)
                e = null
            }

            const update = async() => {
                loading.value = true
                const { uploadFiles } = createUploader(`${localId.value}/${pathRandom.value}`)

                const { removeFiles } = createRemover(`${localId.value}/${pathRandom.value}`)

                console.log("Start", filesAtStart.value);
                console.log("FIles", files.value)

                //сформировали из начального списка список удаленных элементов
                if (filesAtStart.value) {
                    filesAtStart.value.filter((x, ind) => {
                    files.value.map(item=> {
                        if (x.id == item.id) delete filesAtStart.value[ind]
                    })
                });
                }

                console.log("ForDIed", filesAtStart.value);
                if (filesAtStart.value) {
                    await removeFiles(filesAtStart.value)
                }

                console.log("!!FIles!!", files.value);
        
                //свеже добавленные файлы
                const needForUpload = computed(()=>
                    files.value.filter(item => {
                        if (item.file) return item
                    })
                )


                console.log("needforuploar", needForUpload.value);
                console.log("!!FIles", files.value);

                if (needForUpload.value) {
                    //загрузили то что надо
                    const filesUp = await uploadFiles(needForUpload.value)
                    console.log("!!!REsult", filesUp);
                    result.value = [...files.value, ...filesUp]
                    console.log("!!!REsult!!", result.value);
                }
                //загрузка в облако
                // //после убрали из общего списка свеже добавленные
                const toRecord = result.value.filter(x => {
                    if (!x.file) return x
                });

                // files.value = toRecord
                    console.log("toRecord", toRecord);
                
                //получили объект
                const data = {...request.value, date: dateFormator(new Date(date.value)), amount: amount.value,  id:route.params.id, status: status.value, files: toRecord, description: description.value}
                //обновили в базе
                await store.dispatch('request/update', data)

                window.location.reload()

                // router.push({name: 'PrivateCabinet', params: {localId: localId.value}})
                // //обновили локально
                // request.value.date = date.value
            }

            const choosePerformer = async(executor) => {
                console.log("LOCAL", executor);
                status.value = 'in_progress'
                executorsList.value = []

                const data = {...request.value, id:route.params.id, status: status.value, executorsList: executorsList.value, performer: executor}
                //обновили в базе
                await store.dispatch('request/update', data)

                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})

            }
            //удаление из базы данных
            //удаление из локального store
            const remove = async () => {

                const { removeFiles } = createRemover(`${localId.value}/${pathRandom.value}`)

                await removeFiles(files.value)
                await store.dispatch('request/remove', route.params.id)
                router.push({name: 'PrivateCabinet', params: {localId: localId.value}})

            }
            

            return {loading, request, currency, remove, update, status, hasChanges, date, amount, localId, executorsList, choosePerformer, onDrop, onChange, removeFile, files, message, uploadImg: `${process.env.BASE_URL}upload.png`, description
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>