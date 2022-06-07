import {error} from '../../utils/error'
import { collection, query, getDocs } from "firebase/firestore";
import store from '../index'
import db from '../../firebase/index'


export default {
    namespaced: true,
    state() {
        return {
            users: [],
            snapshot: {}
        }
    },
    mutations: {
        setUser(state, user) {
            state.users.push(user)
        },
        setSnapshot(state, snap) {
            state.snapshot = snap
        },
        cleanUsers(state) {
            state.users = []
        }
    },
    actions: {
        async getAllUsers({commit, dispatch}) {
            try {
                //запрос по всем
                const first = query(collection(db, "users"));
                const documentSnapshots = await getDocs(first)
                console.log("DOWNLOAD");
                commit('setSnapshot', documentSnapshots)
                // Get the last visible document
            } catch (e) {
                console.log("Error in Request",e);
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async findUsers({commit}, payload) {
            const localId = store.getters['auth/localId']
            const regex = new RegExp("^"+ payload.input, "i");
            console.log("REGEX", regex);
            //отчистим массив
            const documentSnapshots = store.getters['requestUsersModule/snapshot']
            console.log("CLEAN");
            commit('cleanUsers')
            if (!payload.isSwitch) {
                documentSnapshots.forEach((doc) => {
                    if (doc.data().userName.match(regex) && doc.data().localId !== localId) {
                        //записали новый массив
                        console.log("ADD");
                        commit('setUser', doc.data())
                    }
                    // console.log("SNAPSHOT", doc.data().userName);
                })
            } else {
                documentSnapshots.forEach((doc) => {
                    if (doc.data().email.match(regex) && doc.data().localId !== localId) {
                        //записали новый массив
                        console.log("ADD");
                        commit('setUser', doc.data())
                    }
                    // console.log("SNAPSHOT", doc.data().userName);
                })
            }
        }
    },
    getters: {
        users(store) {
            return store.users
        },
        snapshot(store) {
            return store.snapshot
        }
    }
}