<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <form @submit.prevent="onSubmit" v-else>
          <p v-if="firstStep" class="center" style="margin-bottom: 1rem;">Выберете область на фото которая будет вашей аватаркой. Подойдет любой image/* формат.</p>
          <p v-else class="center" style="margin-bottom: 1rem;">Выберете миниатюру, которая будет отображаться в ваших комментариях и заявках. Также любой image/* формат.</p>
          <vue-avatar class="center border"
            :width= 256
            :height= 256
            :color = '[255, 255, 255, 0.5]'
            :rotation= "rotation"
            :scale= "scale"
            :borderRadius = "borderRadius"
            ref="vueavatar"
            @vue-avatar-editor:image-ready="onImageReady"
            >
          </vue-avatar><br>
          <label class="center text-center">
            Zoom : {{scale}}x
            <br>
            <input
              type="range"
              min=1
              max=3
              step=0.02
              v-model='scale'
          /></label><br>
          <button v-if="firstStep" class="btn primary center" :disabled ="isReady" @click="saveClicked">Продолжить</button>
          <tr v-else class="center">
            <button class="btn primary" @click="()=> {
            firstStep = true
            borderRadius = 0
            }">Назад</button>
            <button class="btn primary" @click="saveClickedUpload">Cохранить</button>
          </tr>
          
        </form>
    </div>
</template>

<script>


import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {VueAvatar} from 'vue-avatar-editor-improved'
import {ref as stRef, getDownloadURL, getStorage, uploadString  } from 'firebase/storage'
import AppLoader from '../ui/AppLoader.vue'

    export default {
        emits: ['created', 'forceRerender'],
        components: {
            VueAvatar, AppLoader
        },

        setup(_, {emit}) {
            const mainId = ref()
            const loading = ref(false)
            const rotation = ref(0)
            const scale = ref(1)
            const vueavatar = ref()
            const src = ref()
            const srcMin = ref()
            const localId = ref()
            const loadPhotoUrl = ref()
            const loadPhotoMinUrl = ref()
            const route = useRoute()
            const store = useStore()
            const isReady = ref(true)
            const borderRadius = ref(0)
            const firstStep = ref(true)
            const secondStep = ref(false)

            onMounted(async() => {
                mainId.value = process.env.BASE_URL
                localId.value = route.params.localId
            })
            
            const onImageReady = () => {
                scale.value = 1
                rotation.value = 0
                isReady.value = false
            }

            const saveClicked = async() => {
                loading.value = true
                console.log(vueavatar.value);
                borderRadius.value = 200
                firstStep.value = false
                secondStep.value = true
                var img = vueavatar.value.getImageScaled()
                //avatar
                src.value = img.toDataURL()
                loading.value = false
                console.log("IMG", src.value);
            }
            const saveClickedUpload = async() => {
                loading.value = true
                var img = vueavatar.value.getImageScaled()
                console.log("IMG", img);
                srcMin.value = img.toDataURL()
                await uploadFiles()
                emit('forceRerender', src.value)
                emit('created')
                loading.value = false
            }

            const uploadFiles = async () => {
                const storage = getStorage()

                const storageRef = stRef(storage, 'files/'+ localId.value +'/avatar')
                const snapshot = await uploadString(storageRef, src.value, 'data_url')
                loadPhotoUrl.value = await getDownloadURL(snapshot.ref)
                console.log("Загрузка");

                const storageMinRef = stRef(storage, 'files/'+ localId.value +'/miniature')
                const snapshotMin = await uploadString(storageMinRef, srcMin.value, 'data_url')
                loadPhotoMinUrl.value = await getDownloadURL(snapshotMin.ref)
                console.log("Загрузка");

                await store.dispatch('update/updateUserData', {
                    photo: {
                        link: loadPhotoUrl.value,
                        miniature: loadPhotoMinUrl.value
                    },
                })
            }

            // const removeFile = () => {
            //     photo.value.link = `${process.env.BASE_URL}upload.png`
            //     photo.value.name = 'unnamed'
            //     isUpload.value = false
            // }

            return {
                onImageReady, saveClicked, saveClickedUpload, rotation, scale, vueavatar, loading, isReady, borderRadius, src, firstStep, secondStep
            }
        }
        
    }
</script>

<style>

</style>
