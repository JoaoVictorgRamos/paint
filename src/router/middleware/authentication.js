import store from '@/store/index'
import Cookies from "js-cookie";

export function isAuthenticated(to, from, next) {
  const cookie = Cookies.get("accesss_token");
console.log('isAuthenticated')
  if (store.getters.isAuthenticated || cookie) {
    return next()
  }

  return next(`/${window.location.search}`)
}