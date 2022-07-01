import { createStore } from 'vuex'
import auth from './modules/auth.module'
import user from './modules/user.module'
import update from './modules/update.module'
import requestUsersModule from './modules/request-users.module'
import request from './modules/request.module'
import help from './modules/help.module'


export default createStore({
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
    auth, user, update, requestUsersModule, request, help
  }
})
