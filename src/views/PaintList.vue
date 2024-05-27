<template>
  <div>
    <div v-for="(item, index) in savedDrawings" :key="index">
      <canvas
        width="200"
        height="200"
        ref="canvasRef"
        @click="redirectLastPaint(index)"
      ></canvas>
    </div>
    <Lvbutton
      @click="redirectPaint"
      class="button__tool"
      label="This is a Button"
      type="button"
      size="md"
      :outlined="false"
    >
      Quero Desenhar +
    </Lvbutton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      savedDrawings: [],
    };
  },
  methods: {
    redirectLastPaint(index) {
      this.$router.push({ name: "paint-edit", params: { id: index + 1 } });
    },
    redirectPaint() {
      this.$router.push({ name: "paint" });
    },
    loadPaint() {
      let savedDrawings =
        JSON.parse(localStorage.getItem("savedDrawings")) || [];
      if (savedDrawings.length) {
        this.savedDrawings = savedDrawings;
        this.$nextTick(() => {
          this.savedDrawings.forEach((savedDrawing, index) => {
            const canvas = this.$refs.canvasRef[index];
            const context = canvas.getContext("2d");
            const img = new Image();
            img.src = savedDrawing;
            img.onload = function () {
              context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
              context.drawImage(img, 0, 0, canvas.width, canvas.height); // Desenha a imagem no canvas
            };
          });
        });
      } else {
        alert("Nenhum desenho salvo encontrado.");
      }
    },
  },
  mounted() {
    this.loadPaint();
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid black;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

canvas {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
