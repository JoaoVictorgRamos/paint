<template>
  <section class="container">
    <canvas
      width="900"
      height="600"
      @mouseleave="isPainting = false"
      :style="cursorCanvas"
    ></canvas>
    <div class="mouse-circle" v-if="cursorCircle" :style="circleStyle"></div>
    <div class="container-tool-box">
      <section class="tool-box">
        <Lvbutton
          @click="typeTool('brush')"
          class="button__tool"
          label="This is a Button"
          type="button"
          size="md"
          :outlined="activeTool && activeTool === 'brush' ? false : true"
        >
          <span class="material-symbols-outlined"> brush </span>
        </Lvbutton>
        <Lvbutton
          @click="typeTool('eraser')"
          class="button__tool"
          label="This is a Button"
          type="button"
          size="md"
          :outlined="activeTool && activeTool === 'eraser' ? false : true"
        >
          <span class="material-symbols-outlined"> ink_eraser </span>
        </Lvbutton>
        <Lvbutton
          @click="typeTool('fill')"
          class="button__tool"
          label="This is a Button"
          type="button"
          size="md"
          :outlined="activeTool && activeTool === 'fill' ? false : true"
        >
          <span class="material-symbols-outlined"> format_color_fill </span>
        </Lvbutton>
        <Lvbutton
          @click="typeTool('eyedropper')"
          class="button__tool"
          label="This is a Button"
          type="button"
          size="md"
          :outlined="activeTool && activeTool === 'eyedropper' ? false : true"
        >
          <span class="material-symbols-outlined"> colorize </span>
        </Lvbutton>
        <Lvcolor-picker
          class="button__tool"
          v-model="brushColor"
          :colors="[
            '#F44336',
            '#E91E63',
            '#9C27B0',
            '#673AB7',
            '#3F51B5',
            '#2196F3',
            '#03A9F4',
            '#00BCD4',
            '#009688',
            '#4CAF50',
            '#8BC34A',
            '#CDDC39',
            '#FFEB3B',
            '#FFC107',
            '#FF9800',
            '#795548',
          ]"
        ></Lvcolor-picker>
      </section>
      <section class="tool-box">
        <Lvrange-slider
          :step="1"
          v-model="brushsize"
          :min="1"
          :max="activeTool === 'brush' ? 30 : 100"
          :showValue="true"
        />
      </section>
      <section class="tool-box">
        <Lvbutton
          class="button__tool lv--danger"
          label="This is a Button"
          type="button"
          size="md"
          @click="deletePaint"
          :outlined="true"
        >
          <span class="material-symbols-outlined"> delete </span>
        </Lvbutton>
      </section>
      <section class="tool-box">
        <Lvbutton
          class="button__tool lv--info"
          label="This is a Button"
          type="button"
          size="md"
          @click="savePaint"
          :outlined="true"
        >
          <span class="material-symbols-outlined"> check </span>
        </Lvbutton>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeTool: null,
      isPainting: false,
      brushsize: 10,
      brushColor: "#000",
      canvas: null,
      ctx: null,
      lastMousePosition: { x: 0, y: 0 },
      cursorCircle: false,
      mouseX: 0,
      mouseY: 0,
    };
  },
  computed: {
    cursorCanvas() {
      if (this.activeTool == "brush") {
        return "cursor:none;";
      }
    },
    circleStyle() {
      const circleSize = this.brushsize; // Adjust the size of the circle here
      return {
        position: "fixed",
        top: `${this.mouseY - circleSize / 2}px`,
        left: `${this.mouseX - circleSize / 2}px`,
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        borderRadius: "50%",
        border: "2px solid black",
        pointerEvents: "none",
      };
    },
  },
  methods: {
    pickColor({ clientX, clientY }) {
      const x = clientX - this.canvas.offsetLeft;
      const y = clientY - this.canvas.offsetTop;
      const pixelData = this.ctx.getImageData(x, y, 1, 1).data;
      const rgbaColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${
        pixelData[2]
      }, ${pixelData[3] / 255})`;
      this.brushColor = rgbaColor;
      console.log(`Picked Color: ${rgbaColor}`);
    },
    floodFill(x, y, fillColor) {
      const canvas = this.canvas;
      const ctx = this.ctx;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const targetColor = this.getPixelColor(data, x, y);
      const fillColorArr = this.hexToRgb(fillColor);

      if (this.colorsMatch(targetColor, fillColorArr)) {
        return; // Same color, no need to fill
      }

      const stack = [[x, y]];

      while (stack.length) {
        const [currentX, currentY] = stack.pop();
        const currentPos = (currentY * canvas.width + currentX) * 4;

        if (
          this.colorsMatch(
            this.getPixelColor(data, currentX, currentY),
            targetColor
          )
        ) {
          this.setPixelColor(data, currentPos, fillColorArr);

          stack.push([currentX + 1, currentY]);
          stack.push([currentX - 1, currentY]);
          stack.push([currentX, currentY + 1]);
          stack.push([currentX, currentY - 1]);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    },

    getPixelColor(data, x, y) {
      const pos = (y * this.canvas.width + x) * 4;
      return [data[pos], data[pos + 1], data[pos + 2], data[pos + 3]];
    },

    setPixelColor(data, pos, color) {
      data[pos] = color[0];
      data[pos + 1] = color[1];
      data[pos + 2] = color[2];
      data[pos + 3] = 255; // Set alpha to 100% (opaque)
    },

    colorsMatch(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    },

    hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    },

    mouseFill({ clientX, clientY }) {
      const x = clientX - this.canvas.offsetLeft;
      const y = clientY - this.canvas.offsetTop;
      this.floodFill(x, y, this.brushColor);
    },
    loadPaint(id) {
      const canvas = document.querySelector("canvas");
      var context = canvas.getContext("2d");
      let savedDrawings =
        JSON.parse(localStorage.getItem("savedDrawings")) || [];
      if (savedDrawings.length) {
        this.$nextTick(() => {
          savedDrawings.forEach((savedDrawing, index) => {
            if (index + 1 === id) {
              const img = new Image();
              img.src = savedDrawing;
              img.onload = function () {
                context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
                context.drawImage(img, 0, 0); // Desenha a imagem no canvas
              };
            }
          });
        });
      } else {
        alert("Nenhum desenho salvo encontrado.");
      }
    },
    savePaint() {
      const canvas = document.querySelector("canvas");
      const imageData = canvas.toDataURL();
      // localStorage.setItem("savedDrawing", imageData);
      let savedDrawings =
        JSON.parse(localStorage.getItem("savedDrawings")) || [];

      // Add the new image data to the array
      savedDrawings.push(imageData);

      // Save the updated array back to localStorage
      localStorage.setItem("savedDrawings", JSON.stringify(savedDrawings));
      // this.$router.push({ name: "home" });
    },
    deletePaint() {
      const canvas = document.querySelector("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    typeTool(tool) {
      if (this.activeTool === tool) {
        this.activeTool = null;
      } else {
        this.activeTool = tool;
      }
      if (this.activeTool == "eraser" || this.activeTool == "brush") {
        this.cursorCircle = true;
      } else {
        this.cursorCircle = false;
      }
    },
    erase(x, y) {
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.beginPath();
      this.ctx.arc(
        x - this.canvas.offsetLeft,
        y - this.canvas.offsetTop,
        this.brushsize / 2,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    },
    draw(x, y) {
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.fillStyle = this.brushColor;
      this.ctx.beginPath();
      this.ctx.arc(
        x - this.canvas.offsetLeft,
        y - this.canvas.offsetTop,
        this.brushsize / 2,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    },
    mouseMoveDraw({ clientX, clientY }) {
      if (this.isPainting && this.activeTool && this.activeTool === "brush") {
        const distance = Math.sqrt(
          (clientX - this.lastMousePosition.x) ** 2 +
            (clientY - this.lastMousePosition.y) ** 2
        );

        const step = 1; // Ajuste este valor para controlar a densidade dos pontos intermediários
        for (let i = 0; i < distance; i += step) {
          const interpolationFactor = i / distance;
          const interpX =
            this.lastMousePosition.x +
            (clientX - this.lastMousePosition.x) * interpolationFactor;
          const interpY =
            this.lastMousePosition.y +
            (clientY - this.lastMousePosition.y) * interpolationFactor;
          if (this.isPainting) {
            this.draw(interpX, interpY);
          }
        }

        this.lastMousePosition.x = clientX;
        this.lastMousePosition.y = clientY;
      } else if (
        this.isPainting &&
        this.activeTool &&
        this.activeTool === "eraser"
      ) {
        const distance = Math.sqrt(
          (clientX - this.lastMousePosition.x) ** 2 +
            (clientY - this.lastMousePosition.y) ** 2
        );

        const step = 1; // Ajuste este valor para controlar a densidade dos pontos intermediários
        for (let i = 0; i < distance; i += step) {
          const interpolationFactor = i / distance;
          const interpX =
            this.lastMousePosition.x +
            (clientX - this.lastMousePosition.x) * interpolationFactor;
          const interpY =
            this.lastMousePosition.y +
            (clientY - this.lastMousePosition.y) * interpolationFactor;
          if (this.isPainting) {
            this.erase(interpX, interpY);
          }
        }

        this.lastMousePosition.x = clientX;
        this.lastMousePosition.y = clientY;
      } else {
        // Atualize a posição do mouse mesmo quando não estiver pintando
        this.lastMousePosition.x = clientX;
        this.lastMousePosition.y = clientY;
      }
      this.mouseX = clientX;
      this.mouseY = clientY;
    },
    mouseDraw({ clientX, clientY }) {
      if (this.activeTool && this.activeTool === "brush") {
        this.draw(clientX, clientY);
        this.isPainting = true;
      }
      if (this.activeTool && this.activeTool === "eraser") {
        this.erase(clientX, clientY);
        this.isPainting = true;
      }
      if (this.activeTool === "fill") {
        this.mouseFill({ clientX, clientY });
      }
      if (this.activeTool === "eyedropper") {
        this.pickColor({ clientX, clientY });
      }
    },
  },
  mounted() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.ctx = ctx;
    canvas.addEventListener("mousedown", this.mouseDraw);
    canvas.addEventListener("mousemove", this.mouseMoveDraw);
    canvas.addEventListener("mouseup", () => {
      this.isPainting = false;
      this.lastMousePosition = { x: 0, y: 0 };
    });
    if (this.$route.params.id) {
      this.loadPaint(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss" scoped>
canvas {
  background: #fff;
  border-radius: 8x;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.container-tool-box {
  display: grid;
  gap: 20px;
}
.tool-box {
  width: 135px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button__tool {
  width: 100%;
}
.active__tool {
  transform: scale(1.2);
  background: red !important;
}
</style>
