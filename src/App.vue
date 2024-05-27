<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
// import LvColorpicker from "lightvue/color-picker";
// import LvRangeSlider from "../node_modules/lightvue/range-slider";

export default {
  components: {
    // LvColorpicker,
    // LvRangeSlider,
  },
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
}

.container-tool-box {
  .lv-input__append {
    position: absolute;
    top: 3px;
    left: 70px;
  }
}
</style>
