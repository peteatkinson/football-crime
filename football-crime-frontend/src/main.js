import Vue from "vue";
import App from "./App.vue";

import Vuex from "vuex";
import Vuesax from "vuesax";

import axios from "axios";
import VueAxios from "vue-axios";

import "vuesax/dist/vuesax.css";

import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    sm: 450,
    sm2: 760,
    md: 1250,
    lg: Infinity,
  },
  defaultBreakpoint: "sm", // customize this for SSR
});

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Vuesax);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
  state: {
    stadiumCrimes: [],
    selectedStadium: null,
    loading: false,
  },
  mutations: {
    updateStadiumCrimes(state, payload) {
      state.stadiumCrimes = payload;
    },
    updateLoading(state, payload) {
      state.loading = payload;
    },
    updateSelectedStadium(state, payload) {
      state.selectedStadium = payload
    }
  },
  actions: {
    updateStadiumCrimes({ commit }, payload) {
      commit("updateStadiumCrimes", payload);
    },
    updateLoading({ commit }, payload) {
      commit("updateLoading", payload);
    },
    updateSelectedStadium({commit}, payload) {
      commit("updateSelectedStadium", payload)
    }
  },
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
