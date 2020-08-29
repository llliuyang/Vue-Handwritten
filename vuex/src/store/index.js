import Vue from 'vue'
import Vuex from '@/vuex'

import a from './a'
import b from './b'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    age: 6
  },
  getters: {
    myAge(state) {
      return state.age + 20
    }
  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload
    }
  },
  actions: {
    changeAge({ commit }, payload) {
      setTimeout(() => {
        commit('changeAge', payload)
      }, 1000)
    }
  },
  modules:{
    a,
    b
  }
})

export default store