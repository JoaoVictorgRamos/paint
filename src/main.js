import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ApiService from "./services/ApiService";

function importAndRegisterLightVueComponents() {
  var all_path_name = [];
  const requireComponent = require.context(
    "../node_modules/lightvue",
    true,
    /^\.\/(?!.*\.md$).*\/$/
  );
  requireComponent.keys().forEach((folderName) => {
    const pathName = folderName.replace(/^\.\/(.*)\/$/, "$1");

    // const componentName = pathName.replace(/\.\/(.*)\/$/, (_, name) => {
    //   // Transforma apenas a primeira letra de cada palavra para maiúscula
    //   return name
    //     .split("-")
    //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    //     .join("-");
    // });

    // Registre as pastas como você desejar
    if (pathName != "utils") {
      all_path_name.push({ pathName });
      Vue.component("Lv" + pathName, () =>
        import(`../node_modules/lightvue/${pathName}`)
      );
    }
  });
  console.log("lightvue components name", all_path_name);
}

importAndRegisterLightVueComponents();

Vue.config.productionTip = false;

Vue.use(ApiService);

new Vue({
  router,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
