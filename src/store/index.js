import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    login() {
      console.log("LOGINNN")
    }
  },
  getters: {
    isLoggedIn() {
    }
  }
});

export default store;
