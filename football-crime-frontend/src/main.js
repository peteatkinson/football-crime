import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'
import Vuesax from 'vuesax'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuesax)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  state: {
    crimes: []
  },
  mutations: {
    updateCrimes (state, payload) {
      state.crimes = payload
    }
  },
  actions: {
    updateCrimes({commit}, payload) {
      commit("updateCrimes", payload)
    }
  }
})


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
