import Vue from 'vue';
import Vuex from 'vuex';

import Cookies from "js-cookie";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    setAuthenticate(state, user) {
      state.user = user;
      state.authenticated = true;
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setAuthenticate', user);
      Cookies.set('accesss_token', `${user.token.type }${' '}${user.token.access_token}`, { expires:`${user.token.expires}` })
    }
  },
  getters: {
    isAuthenticated(state){
      return state.authenticated;
    },
    isLoggedIn() {
    }
  }
});

export default store;
