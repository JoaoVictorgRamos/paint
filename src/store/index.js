import Vue from "vue";
import Vuex from "vuex";

import Cookies from "js-cookie";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    authenticated: false,
  },
  mutations: {
    setAuthenticate(state, user) {
      console.log("setAuthenticate");
      state.user = user;
      state.authenticated = true;
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        try {
          console.log("login", user);
          commit("setAuthenticate", user);
          const expiresInDays = parseInt(user.token.expires);
          Cookies.set(
            "access_token",
            `${user.token.type} ${user.token.access_token}`,
            { expires: expiresInDays }
          );
          resolve(user);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },
    isLoggedIn() {},
  },
});

export default store;
