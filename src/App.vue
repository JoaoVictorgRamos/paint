<template>
  <div id="app">
    <router-view></router-view>
    <notifications group="global" />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #d8d8e1;
  overflow: hidden;
}

.container-tool-box {
  .lv-input__append {
    position: absolute;
    top: 3px;
    left: 70px;
  }
}

.vue-notification {
  font-size: 18px !important;
}

.vue-notification-group {
  width: 350px !important;
  margin-top: 5px !important;
}

#password.lv-input__group .lv-input__field {
  padding: 0 45px 0 12px !important;
}
</style>
