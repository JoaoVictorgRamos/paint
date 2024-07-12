import store from "@/store/index";
import Cookies from "js-cookie";

export function isAuthenticated(to, from, next) {
  const cookie = Cookies.get("access_token");

  if (store.getters.isAuthenticated || cookie) {
    if (
      to.name === "paint" &&
      store.state.drafts.length >= store.state.drafts_limit
    ) {
      store.dispatch("fetchMessageDrafts");
      return;
    }
    return next();
  }

  return next(`/${window.location.search}`);
}

export function notAuthenticated(to, from, next) {
  const cookie = Cookies.get("access_token");

  if (store.getters.isAuthenticated || cookie) {
    return next("/dashboard");
  }

  return next();
}
