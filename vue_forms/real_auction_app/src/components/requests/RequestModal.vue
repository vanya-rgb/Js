<template>
    <div>
        <app-loader v-if="loading"></app-loader>
    
    <form @submit.prevent="onSubmit" v-else>
        <h3>Создать заявку</h3>
        <div class="form-control" :class="{invalid: aError}">
            <label for="amount">Сумма</label>
            <input type="number" id="amount" v-model.number="amount" @blur="aBlur">
            <small v-if="aError">{{aError}}</small>
        </div>

        <div class="form-control" :class="{invalid: dError}">
            <label for="date">Deadline</label>
            <input type="date" :min="new Date().toISOString().split('T')[0]" id="date" v-model="date"
            @blur="dBlur">
            <small v-if="dError">{{dError}}</small>
        </div>

        <div class="form-control">
            <label for="subject">Предмет</label>
            <select id="subject" required v-model="subject">
                <option value="mathematics">Матан</option>
                <option value="programming">Программирование</option>
                <option value="physics">Физика</option>
                <option value="modeling">Моделирование</option>
            </select>
        </div>

        <div class="form-control">
            <label for="file-input" class="upload-container label form-control">Выберите (или перетищите) файл</label>
            <span>.jpg, .jpeg, .png, .docx, .doc, .pdf, .xlsx, .pptx</span><br>
            <span>размер файла не должен превышать 3 МБ</span>
            <small v-if="message">{{message}}</small>
            <drop-zone class="wrapperList uploadBorder" @files-dropped="onDrop">
                <input
                    id="file-input"
                    type="file"
                    name="file"
                    multiple
                    @change="onChange"
                    >
                <div v-if="files.length > 0">
                    <file-preview v-for="(file, idx) of files" :key="file.id"
                    :file="file"
                    :idx = "idx"
                    tag="ul" @remove="removeFile"></file-preview>
                </div>
                <div v-else>
                    <img class="uploadImg" src="upload.png" alt="">
                </div>
            </drop-zone>
        </div>

        <div class="form-control">
            <label for="description">Описание</label>
            <textarea name="textarea" id="description"
            v-model="description" required></textarea>
        </div><br>

        <button class="btn primary" style="margin-bottom: 2rem;"
        :disabled="files.length == 0">Создать</button>
    </form>
    </div>
</template>

<script>
import {useRequestForm} from '../../use/request-form'
import {useStore} from 'vuex'
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import useFileList from '../dragNdrop/composition/file-list'
import DropZone from '../dragNdrop/components/dropZone.vue'
import FilePreview from '../dragNdrop/components/filePreview.vue'
import createUploader from '../dragNdrop/composition/file-uploader'
import AppLoader from '../ui/AppLoader.vue'
import {dateFormator} from '../../utils/date-formator'

    export default {
        emits: ['created'],
        components: {
            DropZone, FilePreview, AppLoader
        },
        setup(_, {emit}) {
            const store = useStore()
            const userName = ref()
            const localId = ref()
            const photoUrl = ref()
            const description = ref()
            const subject = ref()
            const loading = ref(false)

            const {files, addFiles, removeFile, message} = useFileList()

            console.log("MES", message);
            const route = useRoute()

            const onChange = async (e) => {
                const filesLocal = e.target.files
                addFiles(filesLocal)
                e.target.files = null
            }

            const onDrop = async(e) => {
                console.log("FILES", e);
                addFiles(e)
                e = null
            }

            onMounted(async()=>{
                localId.value = route.params.localId
                const data = await store.dispatch('user/getUserData', localId.value)
                console.log("dataMount", data);
                userName.value = data.userName
                photoUrl.value = data.photo
            })

            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            const submit = async values => {
                loading.value = true
                const pathRandom = getRandomInt(999999)
                const { uploadFiles } = createUploader(`${localId.value}/${pathRandom}`)
                console.log("Start", files.value);
                const filesUp = await uploadFiles(files.value)
                // console.log("!!!REsult", );
                ///Заливка файлов
                //функция ниже
                await store.dispatch('request/create', {amount: values.amount, subject: subject.value, date: dateFormator(new Date(values.date)), dateSort: values.date, dateCreate: new Date(), description: description.value, status: values.status, userName: userName.value, localId: localId.value, photo: photoUrl.value, files: filesUp, pathRandom})

                loading.value = false
                emit('created')
            }

            return {
                ...useRequestForm(submit), onChange, onDrop, files, removeFile, subject, description, message, loading
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
