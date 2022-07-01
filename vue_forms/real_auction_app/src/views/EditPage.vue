<template>
    <div>
        <app-loader v-if="loading"></app-loader>
        <div class="container" v-else>
            
            <app-page title="Общая информация">
                <div class="breadcrumbs">
                    <router-link :to= "'/' + localId" class="text"><img :src="mainId+'arrow.png'" alt=""></router-link>
                </div><br>
            
                <div class="form-control">
                    <label for="displayName">Введите новый ник</label>
                    <input type="text" id="displayName" v-model="displayName">
                </div>
            
                <div class="form-control">
                    <label for="number">Введите новый номер</label>
                    <input type="tel" v-mask="'#(###)-###-##-##'" v-model="number">
                </div>
                <button class="btn" @click="changeProfile">Сохранить</button><br><br><br>
            
                <form @submit.prevent="changeEmail">
                <div :class="['form-control', {invalid: eError}]">
                    <label for="id">Изменить Email</label>
                    <input type="Email" id="Email" v-model="email" placeholder="Введите новый email" @blur="eBlur">
                    <small v-if="eError">{{eError}}</small>
                    <span class="primary" v-else-if="email"> Обещаем не спамить!</span>
                </div>
                <button class="btn" :disabled="eError">Сохранить</button>
                </form><br><br>

                <form @submit.prevent="changePassword">
                <div :class="['form-control', {invalid: pError}]">
                    <label for="password">Изменить пароль</label>
                    <input type="password" id="password" v-model="password" @blur="pBlur" placeholder="мин 6 символов верхний и нижний регистр">
                    <small v-if="pError">{{pError}}</small>
                    <span class="primary" v-else-if="password">Отличный пароль!</span>
                </div>
                <div :class="['form-control', {invalid: prError}]">
                    <label for="password_repit">Повторить новый пароль</label>
                    <input type="password" id="password_repit" v-model="password_repit" @blur="prBlur">
                    <small v-if="prError">{{prError}}</small>
                    <small v-else-if="password_repit !== password">Пароли не совпадают</small>
                    <span class="primary" v-else-if="password_repit">Вы молодец!</span>
                </div>
                <button class="btn" :disabled="pError ||password_repit !== password || prError">Сохранить</button>
                </form>
            </app-page>
            <button class="btn danger" @click="isModal = true">Удалить аккаунт</button>
            <app-modal-min v-if="isModal" title="вы точно хотите удалить аккаунт?" @close = "isModal = false">
            <div>
                <tr><img :src="mainId+'sadIcon.png'" alt=""></tr><br>
            <tr><button class="btn primary" @click="isModal = false">Остаться</button>
                <button class="btn danger" @click="deleteApp">Удалить</button></tr>
            </div>
            </app-modal-min>
        </div>
    </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'
import AppPage from '../components/ui/AppPage.vue'
// import { preload } from 'vue-onload'
import {useRouter, useRoute} from 'vue-router'
import useEmailForm from '../use/email-form'
import usePasswordForm from '../use/password-form'
import {mask} from 'vue-the-mask'
import AppModalMin from '../components/ui/AppModalMin'

    export default {
        components: {
            AppLoader, AppPage, AppModalMin
        },
        directives: {
            mask
        },
        setup() {
            const mainId = ref()
            const isModal = ref()
            const uploadPic = ref()
            const loading = ref(false)
            const userDb = ref({})
            const displayName = ref()
            const number = ref()
            const localId = ref()
            //isValid
            const isUpload = ref(false)
            //
            const store = useStore()
            const router = useRouter()
            const route = useRoute()

            mainId.value = process.env.BASE_URL
            localId.value = route.params.localId
            //загрузка фотки
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

                loading.value = false
                
                // const sources = [
                //         photo.value.link
                //     ]
                    
                //     preload(sources, (completed) => {
                //         if (completed === true) {
                //             loading.value = false
                //         }
                //     })
            })

            const update = async(request) => {
                //получили объект
                console.log("UPDATE", request);
                const data = {...request, userName: displayName.value}
                //обновили в базе
                await store.dispatch('request/update', data)
            }

            const changeProfile = async() => {
                loading.value = true

                await store.dispatch('update/updateUserData', {
                    phone: number.value,
                    userName: displayName.value
                })

                requests.value.forEach(async(request) => {
                    await update(request)
                })

                router.push(`/${localId.value}`)
            }

            const deleteApp = async() => {
                await store.dispatch('update/deleteAccount')
            }

            return {
                isUpload, uploadPic, loading, number,
                displayName, localId, ...useEmailForm(), ...usePasswordForm(), changeProfile, mainId, deleteApp, isModal
            }
        }
    }
</script>

