<template>
  <section>
    <nav class="nav-bar">
      <i class="light-icon-menu-2"></i>
    </nav>
    <div class="content">
      <div v-for="(item, index) in savedDrawings" :key="index">
        <canvas
          width="200"
          height="200"
          ref="canvasRef"
          @click="redirectLastPaint(index)"
        ></canvas>
      </div>
    </div>
  </section>
</template>

<script>
import ApiService from "@/services/ApiService";
import { login } from "@/services/index";

import "light-icons/dist/light-icon.css";

export default {
  data() {
    return {
      savedDrawings: [],
      email: "joaovictorgramos12@gmail.com",
      password: "123",
    };
  },
  methods: {
    async handleSubmit() {
      var data = {
        email: this.email,
        password: this.password,
      };
      const response = await ApiService.post(login.routes.create(), data);
      console.log("teste", response);
    },
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
.nav-bar {
  width: 100%;
  background-color: #fff;
  padding: 0 24px;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  // z-index: 997;
  box-shadow: 0 0 4px rgb(0 0 0 / 25%);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.nav-bar i {
  cursor: pointer;
}
.content {
  top: 60px;
  position: relative;
  padding: 15px;
}
section {
  height: 100vh;
  width: 100vw;
}
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
