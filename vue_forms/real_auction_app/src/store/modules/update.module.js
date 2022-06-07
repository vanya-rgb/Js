import {error} from '../../utils/error'
import { doc, updateDoc } from "firebase/firestore";
import store from '../index'
import db from '../../firebase/index'
import axios from 'axios'
import router from '../../router'


export default {
    namespaced: true,
    actions: {
        async updateUserData({dispatch}, payload) {
            try {

                const localId = store.getters['auth/localId']
                const washingtonRef = doc(db, "users", `${localId}`);
                await updateDoc(washingtonRef, payload
                );
                dispatch('setMessage', {
                    value: "Страница обновлена",
                    type: 'primary'
                }, {root: true})
            } catch(e) {
                console.log(e.response.data.error.message);
                dispatch('setMessage', {
                      value: error(e.response.data.error.message),
                      type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async updateExeData({dispatch}, payload) {
            try {
                console.log("PAYLOAD", payload.сomplited);
                const washingtonRef = doc(db, "users", `${payload.localId}`);
                await updateDoc(washingtonRef, {
                    toComplite: payload.toComplite,
                    сomplited: payload.сomplited,
                    status: payload.status
                }
                );
                dispatch('setMessage', {
                    value: "Страница обновлена",
                    type: 'primary'
                }, {root: true})
            } catch(e) {
                console.log(e);
                dispatch('setMessage', {
                      value: error(e.response.data.error.message),
                      type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async changeEmail({dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {idToken: token, email: payload, returnSecureToken: true})
                console.log("Change_email", data);
                dispatch('setMessage', {
                    value: "Email обновлен (подтвердиет новый Email)",
                    type: 'primary'
                }, {root: true})
                store.commit('auth/logout')
    
            } catch (e) {
                console.log(e);
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
                router.push('/auth?message=auth')
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

    },
    
}