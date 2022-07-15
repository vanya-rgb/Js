<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <!-- back как параметр который описан в app page -->
        <div v-else>
        <div class="breadcrumbs">
            <router-link :to="{name: 'PrivateCabinet', params: {localId}}">Обратно на страницу</router-link>
        </div>
        <app-page title="Заявка" v-if="request">
            <p><app-status :type="status"></app-status></p>

            <p><strong>Файлы заказчика:</strong></p>
            <div v-if="files.length > 0" class="highlight">
                <file-preview v-for="(file, idx) of files"
                    :key="file.id"
                    :file="file"
                    :idx = "idx"
                    :hide = "true"
                    tag="ul"
                    ></file-preview>
            </div>
            <p v-if="description">
                <strong>Описание заказчика:&nbsp;</strong>{{description}}
            </p>
            <hr>
            <p><strong>Файлы исполнителя:</strong></p>
            <div v-if="filesExe.length > 0" class="highlight">
                <file-preview v-for="(file, idx) of filesExe"
                    :key="file.id"
                    :file="file"
                    :idx = "idx"
                    :hide = "true"
                    tag="ul"
                    ></file-preview>
            </div>
            <p v-if="descriptionExe">
                <strong>Описание исполнителя:&nbsp;</strong>{{descriptionExe}}
            </p>

        </app-page>
        <h3 v-else class="text-center text-white">
            Заявки с ID = {{$route.params.id}} нет.
        </h3>

        </div>
    </div>
</template>

<script>
// useRouter
import {useRoute} from 'vue-router'
import AppPage from '../components/ui/AppPage.vue'
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus.vue'
// import {currency} from '../utils/currency-formator'
import filePreview from '@/components/dragNdrop/components/filePreview.vue'

 
    export default {
        components: {
            AppPage, AppLoader, AppStatus, filePreview
        },

        setup() {
            const loading = ref(true)
            const route = useRoute()
            // const router = useRouter()
            const store = useStore()
            // const router = useRouter()
            //request
            const request = ref({})
            //executor
            
            //application
            const status = ref()
        
            const userLocalId = ref()
            const localId = ref()
            
            const description = ref()
            const descriptionExe = ref()
            const files = ref([])
            const filesExe = ref([])

            onMounted(async()=> {
                loading.value = true
                //localId
                localId.value = store.getters['auth/localId']
                request.value = await store.dispatch('request/loadById', route.params.id)

                status.value = request.value.status

                files.value = request.value.files
                filesExe.value = request.value.filesExe

                description.value = request.value.description
                descriptionExe.value = request.value.descriptionExe

                console.log("Завка", request.value);
                // executorsList.value = user.value?.executorsList
                loading.value = false
            })

            // const detele = async() => {
            //     const newExList = executorsList.value.filter(item => {
            //         if(item.localId != localId.value) return item
            //     })
            //     //обновили в базе
            //     const data = {...request.value, executorsList: newExList, id: route.params.id}
            //     await store.dispatch('request/update', data)
            //     //локально
            //     executorsList.value = newExList
               
            // }



            return {loading, status, request, files, filesExe, userLocalId, localId, description, descriptionExe
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>