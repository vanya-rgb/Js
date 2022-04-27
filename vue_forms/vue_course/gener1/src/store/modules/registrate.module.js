import axios from 'axios'
import process from 'process';
const TOKEN_KEY = 'jwt-token'
import {error} from '../../utils/error'



export default {
    namespaced: true,
    state() {
        return {
            //автризован ли человек
            token: localStorage.getItem(TOKEN_KEY),
            localId: localStorage.getItem('localId')
        }
    },
    mutations: {
        //синхронный код изменяющий state
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        setLocalId(state, localId) {
            state.localId = localId
            localStorage.setItem('localId', localId)
        },
    },
    actions: {
        async registrate({commit, dispatch}, payload) {
            console.log(payload)
            try{
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`

                const {data} = await axios.post(url, {...payload, returnSecureToken: true})

                console.log("регистрация",data);
                commit('setToken', data.idToken)
                commit('setLocalId', data.localId)
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
        token(state){
            return state.token
        },
        localId(state) {
            return state.localId
        },
        
    }
}