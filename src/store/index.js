import Vue from "vue";
import Vuex from "vuex";

import Cookies from "js-cookie";

Vue.use(Vuex);

import ApiService from "@/services/ApiService";
import { drafts, user } from "@/services/index";
import { validateMessage } from "@/utils/validateMessage";

const store = new Vuex.Store({
  state: {
    user: {},
    authenticated: false,
    drafts: [],
    drafts_limit: 3,
    draft_selected: {},
    drawer: false,
  },
  mutations: {
    setAuthenticate(state, user) {
      state.user = user;
      state.authenticated = true;
    },
    setDrafts(state, drafts) {
      state.drafts = drafts;
    },
    setLogout(state) {
      state.user = {};
      state.authenticated = false;
      state.drafts = [];
      Cookies.remove("access_token");
      let url = window.location.protocol + "//" + window.location.host;
      window.location.href = url;
    },
    setDraftSelected(state, draft) {
      state.draft_selected = draft;
    },
    setchDrawer(state) {
      state.drawer = !state.drawer;
    },
  },
  actions: {
    async login({ commit, dispatch }, user) {
      return new Promise(async (resolve, reject) => {
        try {
          commit("setAuthenticate", user);
          const expiresInDays = parseInt(user.token.expires);
          Cookies.set(
            "access_token",
            `${user.token.type}${user.token.access_token}`,
            { expires: expiresInDays }
          );
          await dispatch("fecthMe");
          resolve(user);
        } catch (error) {
          reject(error);
        }
      });
    },
    async logout({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          commit("setLogout");
          resolve(response);
        } catch (error) {
          validateMessage(error, "top left");
          reject(error);
        }
      });
    },
    async fecthMe({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await ApiService.get(user.routes.me());

          validateMessage(response, "top left");
          commit("setAuthenticate", response);
          resolve(response);
        } catch (error) {
          validateMessage(error, "top left");
          reject(error);
        }
      });
    },
    async fecthDrafts({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          const data = {
            user_id: 10,
          };
          const response = await ApiService.get(drafts.routes.getDraft(data));

          validateMessage(response, "top left");

          commit("setDrafts", response.data);
          resolve(response.data);
        } catch (error) {
          validateMessage(error, "top left");
          reject(error);
        }
      });
    },
    draftSelected({ commit }, draft) {
      commit("setDraftSelected", draft);
    },
    fetchDrawer({ commit }) {
      commit("setchDrawer");
    },
    fetchMessageDrafts() {
      Vue.notify({
        group: "global",
        type: "error",
        title: "Paint",
        text: "Limite de desenhos atingido!",
        position: "top left",
        duration: 5000,
        width: 500,
      });
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },
    isLoggedIn(state) {
      return state.user;
    },
    isDrafts(state) {
      return state.drafts;
    },
    isDraftsLimit(state) {
      return state.drafts_limit;
    },
    isDraftSelected(state) {
      return state.draft_selected;
    },
    isDrawer(state) {
      return state.drawer;
    },
  },
});

export default store;
