<template>
  <section>
    <NavBar />
    <section class="section" :style="{ 'z-index': isDrawer ? '-1' : '' }">
      <div class="content" v-show="!loading">
        <div v-for="(item, index) in isDrafts" :key="index" class="draft">
          <Lvglass-card>
            <canvas
              width="200"
              height="200"
              :ref="'canvasRef' + index"
              @click="redirectLastPaint(item.id)"
            ></canvas>
            <div class="description">
              <p class="order"># {{ index + 1 }}</p>
              <div>
                <p class="avaliation">Avaliações gerais:</p>
                <Lvrating
                  :rating="item.averageRating"
                  read-only
                  :star-size="15"
                  :rounded-corners="true"
                  :border-width="1"
                  :increment="0.01"
                ></Lvrating>
              </div>
            </div>
          </Lvglass-card>
        </div>
      </div>
      <div class="content" v-show="loading">
        <Lvskeleton
          :width="200"
          :height="200"
          primaryColor="#f0f0f0"
          secondaryColor="#e0e0e0"
        />
        <Lvskeleton
          :width="200"
          :height="200"
          primaryColor="#f0f0f0"
          secondaryColor="#e0e0e0"
        />
        <Lvskeleton
          :width="200"
          :height="200"
          primaryColor="#f0f0f0"
          secondaryColor="#e0e0e0"
        />
      </div>
    </section>
  </section>
</template>

<script>
import "light-icons/dist/light-icon.css";

import { mapActions, mapGetters } from "vuex";

import NavBar from "@/components/Navbar/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      savedDrawings: [],
      loading: false,
      drawer: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isLoggedIn", "isDrafts", "isDrawer"]),
    userEmail() {
      if (this.isLoggedIn?.data?.email) {
        return this.isLoggedIn.data.email;
      }
      return "";
    },
    userName() {
      if (this.isLoggedIn?.data?.name) {
        return this.isLoggedIn.data.name;
      }
      return "";
    },
  },
  methods: {
    ...mapActions(["fecthMe", "fecthDrafts"]),
    loadPaint() {
      const canvasRefs = this.$refs;

      if (canvasRefs && Object.keys(canvasRefs).length > 0) {
        Object.keys(canvasRefs).forEach((refKey) => {
          const canvasArray = canvasRefs[refKey];

          canvasArray.forEach((canvas, index) => {
            const context = canvas.getContext("2d");
            let savedDrawings = this.isDrafts;

            if (savedDrawings.length > index) {
              const img = new Image();
              img.src = savedDrawings[index].image;
              img.onload = function () {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0);
              };
            }
          });
        });
      }
    },
    redirectLastPaint(id) {
      this.$router.push({ name: "paint-edit", params: { id: id } });
    },
    redirectPaint() {
      this.$router.push({ name: "paint" });
    },
    redirect(route) {
      console.log("redirect", route);
    },
  },
  async mounted() {
    this.loading = true;
    if (!this.isAuthenticated) {
      await this.fecthMe();
    }
    await this.fecthDrafts()
      .then(() => {
        this.loadPaint();
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.section {
  top: 60px;
  position: relative;
  display: grid;
  justify-content: center;
  overflow-y: scroll;
  height: calc(100vh - 60px);
  padding: 50px;
}
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 25px;
  height: fit-content;

  .draft {
    display: grid;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
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
  // border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.content-nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.logout {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(96, 124, 138, 0.62353);
    color: #fff;

    i {
      color: #fff;
    }
  }

  i {
    margin-right: 5px;
  }
}

.user-data {
  border-top: 1px solid black;
  padding: 10px;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.list-item {
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(96, 124, 138, 0.62353);
    color: #fff;
  }
}

.description {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .order {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 800;
  }

  .avaliation {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 600;
  }
}
</style>
