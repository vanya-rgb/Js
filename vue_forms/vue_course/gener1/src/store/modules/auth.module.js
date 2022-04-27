// import axios from 'axios'
// import process from 'process';
const TOKEN_KEY = 'jwt-token'
import {error} from '../../utils/error'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"



export default {
    namespaced: true,
    state() {
        return {
            //автризован ли человек
            token: localStorage.getItem(TOKEN_KEY),
            userId: localStorage.getItem('userId')
        }
    },
    mutations: {
        //синхронный код изменяющий state
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setUserId(state, userId) {
            state.userId = userId
            localStorage.setItem('userId', userId)
        },
        logout(state){
            const auth = getAuth()
            signOut(auth)
            state.token = null
            state.localId = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem('userId')
            console.log('Выход');
        },
    },
    actions: {
        async login({commit, dispatch}, payload) {
            console.log(payload)
            
                // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`

                // const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                const auth = getAuth();
                    await signInWithEmailAndPassword(auth, payload.email, payload.password)
                    .then((userCredential) => {
                        // Signed in 
                        const data = userCredential.user;
                        console.log("вход",data);
                        commit('setToken', data.accessToken)
                        commit('setUserId', data.uid)
                        commit('clearMessage', null, {root: true})
                        // ...
                    })
                    .catch((e) => {
                        // const errorCode = error.code
                        console.log("error!!", e.code)
                        const errorCode = e.code.split('/')[1].replaceAll('-', '_')
                        console.log("error!!", errorCode);
                        dispatch('setMessage', {
                            value: error(errorCode),
                            type: 'danger'
                        }, {root: true})
                        //root true обращаемся к глобальному экшену
                        throw new Error()
                });

                
                
                
            
        },
    },
    getters: {
        token(state){
            return state.token
        },
        userId(state) {
            return state.userId
        },
        isAuthenticated(state){
            //состояние в зависимотси от token
            return state.token != null
        },
    }
}