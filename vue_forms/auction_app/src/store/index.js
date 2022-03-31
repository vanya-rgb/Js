import { createStore } from 'vuex'


export default createStore({
  state() {
      return{
          isAuth: false,
          tasks: JSON.parse(localStorage.getItem('my-tasks')) ?? []
      }
  },
  mutations: {
      changeStatus(state){
          state.isAuth = !state.isAuth
      },
      createTask(state, task) {
          state.tasks.push(task)
          //переписали все содержимое tasks
          localStorage.setItem('my-tasks', JSON.stringify(state.tasks))
      },
      changeTask(state, task) {
          const idx = state.tasks.findIndex(t=> t.id == task.id)
          state.tasks[idx] = task
          localStorage.setItem('my-tasks', JSON.stringify(state.tasks))
      }
  },
  actions: {
      changeAuthStatus({commit}){
          commit('changeStatus')
      },
      createTask({commit}, task){
          if (task.date < new Date()) {
              task.status = 'canseled'
          }
          commit('createTask', task)
      },
      changeTask({commit}, task) {
          commit('changeTask', task)
      }
  },
  getters:{
    isAuth(state) {
        return state.isAuth
    },
    tasks(state){
        return state.tasks
    },
    activeTasksCount(state){
        return state.tasks.filter(t => t.status == 'active').length
    },
    taskbyId(_, getters){
        return id => getters.tasks.find(t=> t.id == id)
    }
  }
})