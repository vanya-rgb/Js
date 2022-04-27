import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import process from 'process'

const plagins = []
if (process.env.NODE_ENV === 'development') {
  plagins.push(createLogger())
}

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
      setTimeout(()=> {
        commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    auth
  }
})
