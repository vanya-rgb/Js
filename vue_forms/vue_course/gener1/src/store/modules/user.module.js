import store from '../index'
import axios from 'axios'
import process from 'process';
import {error} from '../../utils/error'
import {useRouter} from 'vue-router';

const router= useRouter()


export default {
    namespaced: true,
    state() {

    },
    mutations: {
       
    },
    actions: {
        
        async changeProfile({dispatch}, payload) {
            const token = store.getters['auth/token']
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_FB_KEY}`
            try {
                const {data} = await axios.post(url, {idToken: token, photoUrl: payload.photoUrl, returnSecureToken: false})
                // commit('auth/setToken', data)
                console.log("Update photo", data);

                dispatch('setMessage', {
                    value: "Фото успешно обнолено",
                    type: 'primary'
                }, {root: true})
                
            } catch (e) {
                console.log(e);
                dispatch('setMessage', {
                    value: 'Ошибка с обновлении Ник/фото',
                    type: 'danger'
                }, {root: true})
                //root true обращаемся к глобальному экшену
                throw new Error()
            }

        },
        async changeDisplayName({dispatch}, payload) {
            const token = store.getters['auth/token']
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_FB_KEY}`
            try {
                const {data} = await axios.post(url, {idToken: token, displayName: payload, returnSecureToken: false})
                // commit('auth/setToken', data)
                console.log("Update nik", data);

                dispatch('setMessage', {
                    value: "Ник успешно обнолен",
                    type: 'primary'
                }, {root: true})
                
            } catch (e) {
                console.log(e);
                dispatch('setMessage', {
                    value: 'Ошибка с обновлением Ник',
                    type: 'danger'
                }, {root: true})
                //root true обращаемся к глобальному экшену
                throw new Error()
            }

        },
        async getProfile({dispatch}) {
            try {
                const token = store.getters['auth/token']
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {idToken: token})
                return data
            } catch (e) {
                if( e.response.data.error.message == 'INVALID_ID_TOKEN') {
                    router.push('/auth')
                }
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                //root true обращаемся к глобальному экшену
                throw new Error()
            }
            
        },
        async changeEmail({dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {idToken: token, email: payload, returnSecureToken: true})
                console.log("Change_email", data);
                router.push('/auth')
                dispatch('setMessage', {
                    value: "Email обновлен (подтвердиет новый Email)",
                    type: 'primary'
                }, {root: true})

            } catch (e) {
                console.log(e.response.data.error.message);
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                //root true обращаемся к глобальному экшену
                throw new Error()
            }
            
        },
        async changePassword({dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {idToken: token, password: payload, returnSecureToken: true})
                console.log("Change_password", data);
                router.push('/auth')
                dispatch('setMessage', {
                    value: "Пароль обновлен",
                    type: 'primary'
                }, {root: true})

            } catch (e) {
                console.log(e.response.data.error.message);
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                //root true обращаемся к глобальному экшену
                throw new Error()
            }
            
        },
        async verifyEmail({dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {idToken: token, requestType: 'VERIFY_EMAIL'})
                console.log("Verify_email", data);
                dispatch('setMessage', {
                    value: `Ссылка с подтверждением отправлена на ${payload}`,
                    type: 'primary'
                }, {root: true})

            } catch (e) {
                console.log(e.response.data.error.message);
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                //root true обращаемся к глобальному экшену
                throw new Error()
            }
        }

    },
    getters: {
        
    }
}