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
import "./App.css";
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