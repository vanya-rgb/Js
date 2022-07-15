import {error} from '../../utils/error'
import store from '../index'
import axios from '../../axios/request'
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from '../../firebase/index'
import router from '../../router'




export default {
    namespaced: true,

    actions: {
        async setUserData({dispatch}, payload) {
            try {
                const localId = store.getters['auth/localId']
                console.log(localId);
                const docRef = doc(db, "users", `${localId}`);
                await setDoc(docRef, payload);
            } catch (e) {
                console.log(e.code);
                dispatch('setMessage', {
                      value: error(e.response.data.error.message),
                      type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async getUserData({dispatch}, payload) {
            try {
                // console.log('getUserData', payload);
                const docRef = doc(db, "users", `${payload}`);
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    return docSnap.data()
                } else {
                    console.log("No such document!");
                    return null
                }
            } catch(e) {
                console.log(e.response.data.error.message);
                dispatch('setMessage', {
                      value: error(e.response.data.error.message),
                      type: 'danger'
                }, {root: true})
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
                if (e.response.data.error.code == 400) {
                    router.push('/auth?message=auth')
                }
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                console.log(e.response.data.error.message);
               
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
    }
}
