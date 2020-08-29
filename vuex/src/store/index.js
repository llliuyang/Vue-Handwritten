import Vue from 'vue'
import Vuex from '@/vuex'

import a from './a'
import b from './b'

import logger from 'vuex/dist/logger'
Vue.use(Vuex)

function persists(){
  return function(store) {
    let data = localStorage.getItem('VUEX:STATE')
    if(data){
      store.replaceState(JSON.parse(data))
    }

    store.subscribe((mutation,state) => {
      localStorage.setItem('VUEX:STATE',JSON.stringify(state))
    })

  }
}

const store = new Vuex.Store({
  plugins: [
    // logger(),
    persists()
  ],
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