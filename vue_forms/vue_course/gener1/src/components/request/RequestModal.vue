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

        <div class="form-checkbox">
            <div class="checkbox">
                <label for=""><input v-model="auction" type="radio" value="true" name="auction">Создать в формате аукциона</label>
            </div>
            <div class="checkbox">
                <label for=""><input v-model="auction" type="radio" value="false" name="auction">Стандартная заявка</label>
            </div>
        </div>

        <div class="form-control" v-if="auction == 'true'">
            <input type="time" v-model='timeForBidding'>
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
            const auction = ref('false')
            const timeForBidding = ref()
            const path = Math.floor(Math.random() * 99999)
            const { uploadFiles } = createUploader(path)
            
            const {files, addFiles, removeFile} = useFileList()

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
            const isTimeForBidding = async() => {
                if (timeForBidding.value) {
                    const mass = timeForBidding.value.split(':')
                    const hours = Math.floor(mass[0])+(23 - new Date().getHours())
                    const minutes = Math.floor(mass[1])+(60 - new Date().getMinutes())
                    timeForBidding.value = (hours*60+minutes)*60
                    console.log(timeForBidding.value);
                }
            }

            onMounted(async()=>{
                console.log("AUCTION", auction.value);
                const data = await store.dispatch('user/getProfile')
                const userInfo = data.users[0]
                console.log("data", userInfo);
                userName.value = userInfo.displayName
                localId.value = userInfo.localId
                photoUrl.value = userInfo.photoUrl
            })

            const submit = async values => {
                console.log("VALUES", values);
                const file = await uploadFiles(files.value)
                // const target_copy = Object.assign({}, files.value);
                await isTimeForBidding()
                console.log("!!!REsult", file);
                ///Заливка файлов
                //функция ниже
                await store.dispatch('request/create', {amount: values.amount, subject: subject.value, date: values.date, dateCreate: new Date(), description: description.value, status: values.status, userName: userName.value, localId: localId.value, photoUrl: photoUrl.value, file, path, isAuction: auction.value, timeForBidding: timeForBidding.value})
                emit('created')
            }

            return {
                ...useRequestForm(submit), onChange, onDrop, files, removeFile, subject, auction, timeForBidding, description
            }   
        }
    }
</script>

<style lang="scss" scoped>

</style>
