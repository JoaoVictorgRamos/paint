import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import Notifications from "vue-notification";

function importAndRegisterLightVueComponents() {
  var all_path_name = [];
  const requireComponent = require.context(
    "../node_modules/lightvue",
    true,
    /^\.\/(?!.*\.md$).*\/$/
  );
  requireComponent.keys().forEach((folderName) => {
    const pathName = folderName.replace(/^\.\/(.*)\/$/, "$1");

    // Registre as pastas como você desejar
    if (pathName != "utils") {
      all_path_name.push({ pathName });
      Vue.component("Lv" + pathName, () =>
        import(`../node_modules/lightvue/${pathName}`)
      );
    }
  });
}

importAndRegisterLightVueComponents();

Vue.config.productionTip = false;

Vue.use(Notifications);

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
