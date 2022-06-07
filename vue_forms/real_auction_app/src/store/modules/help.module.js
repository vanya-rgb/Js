import axios from '../../axios/request'
import store from '../index'
import {useRouter} from 'vue-router'
const router = useRouter()

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        // addRequest(state, req) {
        //     state.requests.push(req)
        // }
    },
    actions: {
        async create({dispatch}, payload) {
            try {
                console.log("PAYLOAD", payload);
                const token = store.getters['auth/token']
                await axios.post(`/help.json?auth=${token}`, payload)
                dispatch('setMessage', {
                    value: 'Учту это:)',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async load({commit, dispatch}) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/help.json?auth=${token}`)
                console.log('DATA_Load',data);
                //Формирование нового массива
                commit('setRequests', data)
                }

             catch (e) {
                console.log("ERROR IN RESPONSE DATA",e);
                if (e.response.data.error.code == 400) {
                    router.push('/auth?message=auth')
                }
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        
        async remove({dispatch}, id) {
            try {
                const token = store.getters['auth/token']
                //Поиск по конкретному id
                await axios.delete(`/requests/${id}.json?auth=${token}`)
                dispatch('setMessage', {
                    value: 'Заявка удалена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
    },
    getters: {
        requests(state) {
            return state.requests
        }
    }
}