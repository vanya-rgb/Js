<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div class="container" v-else>
            <div class="breadcrumbs">
                <router-link :to= "'/' + localId" class="text">Обратно на страницу</router-link>
            </div>
            <app-page title="Общая информация">
                <label for="file-input" class="upload-container label form-control">Выберите (перетищите) новое фото</label>
                <div class="close-icon" v-if="isUpload" @click="removeFile">&#10006;</div>
                <drop-zone class="wrapper" @files-dropped="onDrop">
                    <img id="upload-image" :src="photo.link">
                    <div>
                        <input id="file-input" type="file" name="file" @change="onChange">
                    </div>
                </drop-zone>
            
                <div class="form-control">
                    <label for="displayName">Введите новый ник</label>
                    <input type="text" id="displayName" v-model="displayName">
                </div>
            
                <div class="form-control">
                    <label for="number">Введите новый номер</label>
                    <input type="tel" v-mask="'#(###)-###-##-##'" v-model="number">
                </div>
                <button class="btn" @click="changeProfile">Сохранить</button>
            </app-page>
            

            <app-page title="Изменить Email">
                <form @submit.prevent="changeEmail">
                <div :class="['form-control', {invalid: eError}]">
                    <label for="id">Email</label>
                    <input type="Email" id="Email" v-model="email" @blur="eBlur">
                    <small v-if="eError">{{eError}}</small>
                    <span class="primary" v-else-if="email"> Обещаем не спамить!</span>
                </div>
                <button class="btn" :disabled="eError">Сохранить</button>
                </form>
            </app-page>
            <app-page title="Изменить пароль">
                <form @submit.prevent="changePassword">
                <div :class="['form-control', {invalid: pError}]">
                    <label for="password">Пароль</label>
                    <input type="password" id="password" v-model="password" @blur="pBlur">
                    <small v-if="pError">{{pError}}</small>
                    <span class="primary" v-else-if="password">Отличный пароль!</span>
                </div>
                <div :class="['form-control', {invalid: prError}]">
                    <label for="password_repit">Повторим еще разок</label>
                    <input type="password" id="password_repit" v-model="password_repit" @blur="prBlur">
                    <small v-if="prError">{{prError}}</small>
                    <small v-else-if="password_repit !== password">Пароли не совпадают</small>
                    <span class="primary" v-else-if="password_repit">Вы молодец!</span>
                </div>
                <button class="btn" :disabled="pError ||password_repit !== password || prError">Сохранить</button>
                </form>
            </app-page>
            
        </div>
    </div>
</template>

<script>
import useFileList from '../components/dragNdrop/composition/file-list'
import DropZone from '../components/dragNdrop/components/dropZone.vue'
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'
import AppPage from '../components/ui/AppPage.vue'
import { preload } from 'vue-onload'
// import { ref as stRef, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage'
// import { getDatabase, ref as dbRef, push, set} from 'firebase/database'
import createUploader from '../components/dragNdrop/composition/file-uploader'
import {useRouter, useRoute} from 'vue-router'
import {getStorage, ref as StRef, deleteObject } from "firebase/storage";
import useEmailForm from '../use/email-form'
import usePasswordForm from '../use/password-form'
import {mask} from 'vue-the-mask'



// import {useRoute} from 'vue-router'

    export default {
        components: {
            DropZone, AppLoader, AppPage
        },
        directives: {
            mask
        },
        setup() {
            const uploadPic = ref()
            const loading = ref(false)
            // const photoUrl = ref(`${process.env.BASE_URL}upload.jpg`)
            const photo = ref({
                link: `${process.env.BASE_URL}upload.jpg`,
                name: 'unnamed'
            })
            const userDb = ref({})
            const oldPhotoName = ref()
            const displayName = ref()
            const number = ref()
            const localId = ref()
            //isValid
            const isUpload = ref(false)
            //
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            localId.value = route.params.localId
            //загрузка фотки
            const {file, addFile} = useFileList()
            //заявки
            const requests = computed(()=> store.getters['request/requests']
                .filter(request => {
                    if (request.localId){
                        return localId.value === request.localId
                    }
                })
            )
            onMounted(async() => {
                loading.value = true
                const userDbData = await store.dispatch('user/getUserData', localId.value)
                userDb.value = userDbData
                //подгрузили заявки
                await store.dispatch('request/load')
    
                console.log("userDb",userDb.value);

                console.log(userDbData);
                displayName.value = userDbData.userName
                number.value = userDbData.phone
                localId.value = userDbData.localId
                oldPhotoName.value = userDbData.photo.name
                
                const sources = [
                        photo.value.link
                    ]
                    
                    preload(sources, (completed) => {
                        if (completed === true) {
                            loading.value = false
                        }
                    })
            })

            const onChange = async (e) => {
                addFile(e.target.files[0])
                console.log(file.value);
                photo.value.link = file.value.url
                photo.value.name = file.value.file.name
                isUpload.value = true
            }
            const onDrop = (e) => {
                addFile(e[0])
                photo.value.link = file.value.url
                photo.value.name = file.value.file.name
                isUpload.value = true
            }
            const removeFile = () => {
                photo.value.link = `${process.env.BASE_URL}upload.jpg`
                photo.value.name = 'unnamed'
                isUpload.value = false
            }
            const update = async(request) => {
                //получили объект
                console.log("UPDATE", request);
                const data = {...request, userName: displayName.value}
                //обновили в базе
                await store.dispatch('request/update', data)
            }
            const upload = async () => {
                if (oldPhotoName.value !== "unnamed") {
                    //изменить ник во всех заявках
                    const storage = getStorage();
                    const desertRef = StRef(storage, `files/${localId.value}/${oldPhotoName.value}`)
                    await deleteObject(desertRef).then(()=>{
                        console.log("Заебк");
                    })
                }

                const { uploadFile } = createUploader(localId.value)
                const {url} = await uploadFile(file.value)
                photo.value.link = url
            }

            const changeProfile = async() => {
                loading.value = true
                if (photo.value.name != 'unnamed'){
                    await upload()
                    await store.dispatch('update/updateUserData', {
                        photo: {
                                link: photo.value.link,
                                name: photo.value.name,
                            },
                        phone: number.value,
                        userName: displayName.value
                        }
                    )
                    requests.value.forEach(async(request) => {
                        await update(request)
                    })
                }
                else {
                    await store.dispatch('update/updateUserData', {
                        phone: number.value,
                        userName: displayName.value
                        }
                    )
                    requests.value.forEach(async(request) => {
                        await update(request)
                    })
                }

                router.push(`/${localId.value}`)
            }
            return {
                onDrop, onChange, removeFile, photo, isUpload, uploadPic, loading, number,
                displayName, localId, ...useEmailForm(), ...usePasswordForm(), changeProfile
            }
        }
    }
</script>

