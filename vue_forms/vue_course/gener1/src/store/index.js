import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import request from './modules/request.module'
import registrate from './modules/registrate.module'
import cabinet from './modules/cabinet.module'
import user from './modules/user.module'


const plagins = []
//проверка на режим разработки
// if (process.env.NODE_ENV === 'development') {
  plagins.push(createLogger())
// }

export default createStore({
  plagins,
  state() {
    return {
      message: null
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 10000)
    }
  },
  modules: {
    auth, request, registrate, cabinet, user
  }
})
