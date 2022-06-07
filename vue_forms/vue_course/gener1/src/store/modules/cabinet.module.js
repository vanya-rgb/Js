import axios from 'axios';
import store from '../index'
import { getStorage, ref as stRef, getDownloadURL} from 'firebase/storage'
const storage = getStorage()

export default {
    namespaced: true,
    state() {
        return {
            //автризован ли человек
            picLink: localStorage.getItem('picLink')
        }
    },
    mutations: {
        //синхронный код изменяющий state
        setPicLink(state, link) {
            state.picLinc = link
            localStorage.setItem('picLink', link)
        },
    },
    actions: {

        async loadUserById({dispatch}, id) {
            try {
                const token = store.getters['auth/token']
                //Поиск по конкретному id

                console.log('id в лоаде', id);
                const {data} = await axios.get(`/users/${id}.json?auth=${token}`)
                console.log('по iD', data)
                //будет обрабатывать в самом компоненте
                return data

            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async getPic({commit, dispatch}, localId) {
            try {
                
                console.log('localId', localId.value);
                const fileName = localStorage.getItem('fileName')
                console.log('file name', fileName);
                const storageRefDownload = stRef(storage, `files/${localId.value}/${fileName}`)

                await getDownloadURL(storageRefDownload).then((url)=>{
                    console.log("LInk", url);
                    commit('setPicLink', url)
                })
                
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
        
    },
    getters: {
        token(state){
            return state.token
        },
        isAuthenticated(state){
            //состояние в зависимотси от token
            return !!state.token
        },
        localId(state) {
            return state.localId
        },
        picLinc(state) {
            return state.picLinc
        }
    }
}