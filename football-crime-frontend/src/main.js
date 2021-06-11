import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuesax)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
