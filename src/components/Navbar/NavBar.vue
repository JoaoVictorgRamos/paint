<template>
  <nav class="drawer-container nav-bar">
    <div class="drawer-container__wrapper --absolute" id="menu-mobile-id">
      <div class="wrapper__card">
        <div class="card__header">
          <div class="header__icon --left" @click="fetchDrawer">
            <i class="light-icon-menu-2"></i>
          </div>
        </div>
        <div class="card__drawer">
          <Lvdrawer
            v-model="drawer"
            left
            headerTitle="Navegação"
            headerColor="#607c8a"
            close
            shadow
            background="#fff"
          >
            <div class="content-nav">
              <div>
                <div class="list">
                  <div
                    class="list-item"
                    v-for="(item, index) in routes"
                    :key="index"
                    @click="redirect(item.route)"
                  >
                    <div>
                      {{ item.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="logout" @click="logout">
                  <p>Sair</p>
                  <i class="light-icon-logout"></i>
                </div>
                <div class="user-data">
                  <p>{{ userName }}</p>
                  <p>{{ userEmail }}</p>
                </div>
              </div>
            </div>
          </Lvdrawer>
        </div>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 14 14"
    >
      <g
        id="paint"
        fill="none"
        stroke="#38b2ac"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M8.5 5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4 5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m0-3.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
        />
        <path
          d="M9.52 12.28a1 1 0 0 0-.65-.88a2 2 0 0 1 .63-3.9h1.87a2 2 0 0 0 1.89-2.67a6.5 6.5 0 1 0-6.13 8.67a6.3 6.3 0 0 0 1.74-.24a.9.9 0 0 0 .65-.98"
        />
      </g>
    </svg>
    <div class="star-avatar">
      <div class="lv-demo_layout">
        <p class="general-media">Média geral:</p>
        <Lvrating
          :rating="userRating"
          read-only
          :star-size="25"
          :rounded-corners="true"
          :border-width="2"
          :increment="0.01"
        ></Lvrating>
      </div>
      <Avatar :placeholder="userName" />
    </div>
  </nav>
</template>

<script>
import "light-icons/dist/light-icon.css";

import { mapActions, mapGetters } from "vuex";

import Avatar from "@/components/Navbar/Avatar.vue";

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      drawer: false,
    };
  },
  watch: {
    drawer(newVAlue) {
      if (!newVAlue) {
        this.fetchDrawer();
      }
    },
    isDrawer(newVAlue) {
      this.drawer = newVAlue;
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn", "isDrawer", "isDrafts", "isDraftsLimit"]),
    routes() {
      const routes = [
        { name: "Desenhar", route: "paint" },
        { name: "Meus Desenhos", route: "dashboard" },
        { name: "Comunidade", route: "community" },
      ];

      // if (this.isDrafts.length <= this.isDraftsLimit) {
      //   routes.splice(0, 0, { name: "Desenhar", route: "paint" });
      // }

      return routes;
    },
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
    userRating() {
      if (this.isLoggedIn?.data?.averageRating) {
        return this.isLoggedIn.data.averageRating;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions(["fetchDrawer", "logout"]),
    redirect(route) {
      if (this.$route.name !== route) {
        this.$router.push({ name: route });
      }
    },
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
  box-shadow: 0 0 4px rgb(0 0 0 / 25%);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-bar i {
  cursor: pointer;
}
.content-nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    justify-content: inherit;
  }
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
.star-avatar {
  display: flex;
  align-items: center;
  gap: 20px;
}

.general-media {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}

#paint {
  animation: dash 4s ease-in-out infinite alternate;
}
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
}
</style>
