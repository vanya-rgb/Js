<template>
    <form @submit.prevent="onSubmit">
        
        <div class="form-control" :class="{invalid: aError}">
            <label for="amount">Сумма</label>
            <input type="number" id="amount" v-model.number="amount" @blur="aBlur">
            <small v-if="aError">{{aError}}</small>
        </div>

        <div class="form-control" :class="{invalid: aError}">
            <label for="date">Deadline</label>
            <input type="date" :min="new Date().toISOString().split('T')[0]" id="date" v-model="date" @blur="dateBlur">
            <small v-if="dateError">{{dateError}}</small>
        </div>

        <div class="form-control">
            <label for="subject">Предмет</label>
            <select id="subject" v-model="subject">
                <option value="mathematics">Матан</option>
                <option value="programming">Программирование</option>
                <option value="physics">Физика</option>
                <option value="modeling">Моделирование</option>
            </select>
        </div>

        <div class="form-control">
            <label for="file-input" class="upload-container label form-control">Выберите (или перетищите) файл</label>
            <drop-zone class="wrapper" @files-dropped="onDrop">
                <input id="file-input" type="file" name="file" multiple @change="onChange">
                <div class="card">
                    <file-preview v-for="file of files" :key="file.id" :file="file" tag="li" @remove="removeFile"></file-preview>
                </div>
            </drop-zone>
        </div>

        <div class="form-control">
            <label for="description">Описание</label>
            <input type="text" id="description" v-model="description">
        </div>

        <button class="btn primary" :disabled="isSubmitting">Создать</button>
    </form>
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

    export default {
        emits: ['created'],
        components: {
            DropZone, FilePreview
        },
        setup(_, {emit}) {
            const store = useStore()
            const userName = ref()
            const localId = ref()
            const photoUrl = ref()
            const description = ref()
            const subject = ref()
            
            const {files, addFiles, removeFile} = useFileList()
            const route = useRoute()

            const onChange = async (e) => {
                console.log("FILES", e.target.files);
                addFiles(e.target.files)
                e.target.value = null
            }

            const onDrop = async(e) => {
                console.log("FILES", e);
                addFiles(e)
                e.target.value = null
            }

            onMounted(async()=>{
                localId.value = route.params.localId
                const data = await store.dispatch('user/getUserData', localId.value)
                console.log("dataMount", data);
                userName.value = data.userName
                photoUrl.value = data.photo
            })

            const submit = async values => {
                console.log("VALUES", values);
                const { uploadFiles } = createUploader(`${localId.value}/forWork`)
                const file = await uploadFiles(files.value)
                console.log("!!!REsult", file);
                ///Заливка файлов
                //функция ниже
                await store.dispatch('request/create', {amount: values.amount, subject: subject.value, date: values.date, dateCreate: new Date(), description: description.value, status: values.status, userName: userName.value, localId: localId.value, photo: photoUrl.value, files: file})
                emit('created')
            }

            return {
                ...useRequestForm(submit), onChange, onDrop, files, removeFile, subject, description
            }   
        }
    }
</script>

<style lang="scss" scoped>

</style>
