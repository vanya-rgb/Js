export default {
    //закрыли модуль чтобы указать на принадлежность
    namespaced: true,
    state() {
        return {
            counter: 1
        }
    },
    //мутации всегда синхронны
    mutations: {
        increment(state) {
            state.counter++;
        },
        add(state, payload) {
            state.counter += payload.value;
        },

        // incrementAcync() {
        //     setTimeout(() => {
        //         state.counter += 10
        //     })
        // }
    },
    actions: {
        incrementAsync({commit}, payload) {
            // console.log(context);
            setTimeout(() => {
                commit('add', payload)
            }, payload.delay)
        }
    },
    getters: {
        counter(state) {
            if(state.counter > 30) {
                return 0
            }
            return state.counter
        },
        //доступ к глобальным параметрам
        // rootState, rootGetters
        doubleCounter(state, getters) {
            // console.log('state', state)
            // console.log('gettres', getters)
            // console.log('rootState', rootState)
            // console.log('rootGetters', rootGetters)
            return getters.counter * 2
        }
    },
}