import { createStore, createLogger } from 'vuex';
import counterModule from './modules/counter'

export default createStore({
    //Logger - информация
    plugins: [createLogger()],
    modules: {
        count: counterModule
    },
    state() {
        return {
            appTitle: 'Vuex Working'
        }
    },
    mutations: {
        changeTitle(state, payload) {
            state.appTitle = payload
        }
    },
    actions: {
        changeTitle({commit}, payload) {
            commit('changeTitle', payload)
        }
    },
    getters: {
        uppercaseTitle(state) {
            return state.appTitle.toUpperCase()
        }
    }
})