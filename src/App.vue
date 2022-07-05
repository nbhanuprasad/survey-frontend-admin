<template>
  <v-app>
    <v-main>
      <Navbar v-if="currentPath !== '/login'" />
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import Navbar from "./components/Navbar/Navbar.vue";
import "./styles/index.css";
import "./styles/ResponsiveTable.css";
export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    currentPath: "",
  }),
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentPath = this.$route.path;
      }
    );
  },
};
</script>
<style>
.container {
  padding: 40px 0px;
  background: var(--lightGreen);
  min-height: 100vh;
  max-height: auto;
}

.button__black {
  background: var(--black);
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  color: var(--white);
}

.button__black:hover {
  box-shadow: 0px 10px 30px #504e4e6c;
}

.logout__button {
  padding: 8px 10px;
  font-size: 16px;
}
</style>