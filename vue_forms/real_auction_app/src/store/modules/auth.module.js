import axios from 'axios'
import process from 'process'
import {error} from '../../utils/error'
const TOKEN_KEY = 'jws-token'
import { getAuth, signOut } from "firebase/auth"
import router from '../../router'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
            localId: localStorage.getItem('localId')
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setLocalId(state, localId) {
            state.localId = localId
            localStorage.setItem('localId', localId)
        },
        logout(state) {
            const auth = getAuth()
            signOut(auth)
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
            router.push('/auth')
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`

                const {data} = await axios.post(url, {...payload, returnSecureToken: true})

                console.log("Sigh in", data);
                commit('setToken', data.idToken)
                commit('setLocalId', data.localId)
                commit('clearMessage', null, {root: true})
            } catch (e) {
                console.log(e.response.data.error.message);
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async registrate({commit, dispatch}, payload) {
            console.log(payload)
            try{
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`

                const {data} = await axios.post(url, {...payload, returnSecureToken: true})

                console.log("регистрация",data);
                commit('setToken', data.idToken)
                commit('setLocalId', data.localId)

                const dataReq = {
                    userName: 'Имя не выбрано',
                    email: data.email,
                    isVerifiedEmail: false,
                    localId: data.localId,
                    photo: {
                        link: 'upload.jpg',
                        name: 'unnamed'
                    },
                    rating: {
                        count: 0,
                        value: 0
                    },
                    comments: [],
                    phone: ''
                }
                store.dispatch('user/setUserData', dataReq)
                dispatch('setMessage', {
                    value: "Вы успешно зарегестрировались",
                    type: 'primary'
                }, {root: true})
                
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                //root true обращаемся к глобальному экшену
                throw new Error()
            }
            
        },
    },
    getters: {
        token(state) {
            return state.token
        },
        localId(state) {
            return state.localId
        },
        isAuthentificated(state) {
            return !!state.token
        }
    }
}