<template>
  <div class="mouse-circle" :style="circleStyle"></div>
</template>

<script>
export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      circleRadius: 25,
    };
  },
  computed: {
    circleStyle() {
      return {
        position: "fixed",
        top: `${this.mouseY - this.circleRadius}px`,
        left: `${this.mouseX - this.circleRadius}px`,
        width: `${this.circleRadius * 2}px`,
        height: `${this.circleRadius * 2}px`,
        borderRadius: "50%",
        border: "2px solid blue",
        pointerEvents: "none",
      };
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.updateMousePosition);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.updateMousePosition);
  },
  methods: {
    updateMousePosition(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    },
  },
};
</script>

<style>
.mouse-circle {
  z-index: 9999;
}
</style>
