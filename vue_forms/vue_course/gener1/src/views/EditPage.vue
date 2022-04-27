<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div class="container" v-else>
            <app-page title="Изменить фото">
                <!-- <div class="breadcrumbs">
                    <router-link to="/" class="text-white"></router-link>
                </div> -->
                <label for="file-input" class="upload-container label form-control">Выберите (или перетищите) файл</label>
                <div class="close-icon" v-if="isUpload" @click="removeFile">&#10006;</div>
                <drop-zone class="wrapper" @files-dropped="onDrop">
                    <img id="upload-image" :src="photoUrl">
                    <div>
                        <input id="file-input" type="file" name="file" @change="onChange">
                        <!-- <label for="file-input">Выберите файл</label> -->
                        <!-- <span>или перетащите его сюда</span> -->
                    </div>
                </drop-zone>
                <button class="btn" :disabled="isUnavailable" @click="setAccountInfo">Сохранить</button>
            </app-page>

            <app-page title="Обновить ник">
                <div class="form-control">
                    <label for="displayName">Введите новый ник</label>
                    <input type="text" id="displayName" v-model="displayName">
                </div>
                <button class="btn" @click="changeDisplayName">Сохранить</button>
            </app-page>

            <app-page title="Изменить Email">
                <div class="form-control">
                    <label for="email">Введите новый email</label>
                    <input type="text" id="email" v-model="email">
                </div>
                <button class="btn" @click="changeEmail">Сохранить</button>
            </app-page>
            <app-page title="Изменить пароль">
                <div class="form-control">
                    <label for="password">Введите новый пароль</label>
                    <input type="password" id="password" v-model="password" required>
                    <label for="password_else">Введите повторите пароль</label>
                    <input type="password" id="password_else" v-model="password_else" required>
                </div>
                <button class="btn" @click="changePassword" :disabled="!isValid">Сохранить</button>
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
import { ref as stRef, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage'
import { getDatabase, ref as dbRef, push, set} from 'firebase/database'


// import {useRoute} from 'vue-router'

    export default {
        components: {
            DropZone, AppLoader, AppPage
        },
        setup() {
            const isUpload = ref(false)
            const uploadPic = ref()
            const loading = ref(false)
            const photoUrl = ref(`${process.env.BASE_URL}upload.jpg`)
            const displayName = ref()
            const email = ref()
            const password = ref()
            const password_else = ref()
            
            const isValid = computed(()=> {
                return password.value === password_else.value
            })
            

            const store = useStore()
            const isUnavailable = ref(false)

            const {file, addFile} = useFileList()
            const onChange = async (e) => {
                uploadPic.value = e.target.files[0]
                addFile(e.target.files[0])
                console.log(uploadPic.value);
                photoUrl.value = file.value.url
                isUpload.value = true
                console.log("photoUrl", photoUrl.value);
            }
            const onDrop = (e) => {
                uploadPic.value = e[0]
                addFile(e[0])
                photoUrl.value = file.value.url
                isUpload.value = true
                console.log("photoUrl", photoUrl.value);
            }
            const removeFile = () => {
                photoUrl.value = `${process.env.BASE_URL}upload.jpg`
                isUpload.value = false
            }
            const userId = computed(()=> store.getters['auth/userId'])

            const upload = async () => {
                const storage = getStorage()
                const database = getDatabase()
                const databaseReference = dbRef(database, 'files')
                const storageRef = stRef(storage, 'files/'+userId.value+'/'+ uploadPic.value.name)
                console.log('storageRef', storageRef);
                await uploadBytes(storageRef, uploadPic.value).then(() => {
                    const newFileRef = push(databaseReference)
                    set(newFileRef, {
                        "name": uploadPic.value.name
                    })
                })
            }
            const onValueLoad = async () => {
                const storage = getStorage()
                
                const storageRefDownload = stRef(storage, 'files/'+userId.value+'/'+ uploadPic.value.name)
                
                await getDownloadURL(storageRefDownload).then((url)=>{
                    photoUrl.value = url
                })
                console.log("Link pic", photoUrl.value);
            }
            const setAccountInfo = async() => {
                isUnavailable.value = true
                await upload()
                await onValueLoad()
                await store.dispatch({type:'user/changeProfile', photoUrl: photoUrl.value})
                isUnavailable.value = false
            }
            const changeEmail = async() => {
                await store.dispatch('user/changeEmail', email.value)
            }
            const changePassword = async() => {
                await store.dispatch('user/changePassword', password.value)
            }
            const changeDisplayName = async() => {
                await store.dispatch('user/changeDisplayName', displayName.value)
            }

            onMounted(async() => {
                loading.value = true
                const actualData = await store.dispatch('user/getProfile')
                email.value = actualData.users[0].email
                actualData.users[0].displayName ? displayName.value = actualData.users[0].displayName : displayName.value = ''
                
                
                const sources = [
                        photoUrl.value
                    ]
                    
                    preload(sources, (completed) => {
                        if (completed === true) {
                            loading.value = false
                        }
                    })
            })

           
            return {
                onDrop, onChange, removeFile, photoUrl, isUpload, uploadPic, loading,
                displayName, setAccountInfo, isUnavailable, email, changeEmail, password_else, password, isValid, changePassword, changeDisplayName
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>