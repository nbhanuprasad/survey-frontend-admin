<template>
  <v-app>
    <v-main>
      <Navbar 
      v-if="currentPath !== '/login'"
      :role="userType"
      />
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
    userType: "",
  }),
  created() {
    const authToken = sessionStorage.getItem("authToken");
    const userType = sessionStorage.getItem("userType");
    if (authToken && userType === "super-admin") {
      this.$router.push({ name: "adminsList" });
    } else if (authToken && userType === "admin") {
      this.$router.push({ name: "surveysList" });
    } else {
      this.$router.push({ name: "login" });
    }
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentPath = this.$route.path;
        this.userType = sessionStorage.getItem("userType");
      }
    );
  },
};
</script>
<style>
/* common */

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
.error__msg{
  color: var(--red);
  text-align: center;
  padding: 5px 0;
  margin: 10px 0;
  background: var(--white);
  padding: 5px 0;
  border-radius: 10px;
}
</style>