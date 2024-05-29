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
  caret-color: #38b2ac;
  ::selection {
    background: #38b2ac;
  }
  ::-moz-selection {
    background: #38b2ac;
  }
}

body {
  background: #d8d8e1;
  overflow: hidden;
}

:root {
  --primary: #38b2ac;
  --secondary: hsl(173, 20%, 90%);
  --primary-text-color: var(--primary);
  --secondary-text-color: hsl(173, 15%, 30%);
  --gradient-color-1: #38b2ac;
  --gradient-color-2: #2a8f8a;

  --input-border-color: var(--secondary);
  --input-border-color-hover: hsl(173, 55%, 67%);
  --input-border-color-focus: var(--primary);

  --button-text-color: #fff;
  --button-color: var(--primary);
  --button-color-hover: hsl(173, 55%, 63%);
  --button-color-focus: hsl(173, 55%, 39%);

  --bg-color: hsl(0, 0%, 98%);
  --placeholder-color: rgba(0, 0, 0, 0.3);
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
