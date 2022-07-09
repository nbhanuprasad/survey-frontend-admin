<template>
  <div class="navbar">
    <div class="navbar__left">
      <router-link class="navbar__logo" to="/">SURVEY</router-link>
    </div>
    <div class="navbar__right">
      <router-link class="navbar__right--link" to="/">ADMINS</router-link>
      <router-link class="navbar__right--link" to="/create-admin"
        >CREATE ADMIN</router-link
      >
      <router-link class="navbar__right--link" to="/surveys"
        >SURVEYS</router-link
      >
      <router-link class="navbar__right--link" to="/create-survey"
        >Create Survey</router-link
      >
      <button class="button__black logout__button" @click="onLogout">Logout</button>
    </div>
  </div>
</template>
<script>
import AuthService from "../../services/AuthService";
export default {
  methods: {
    onLogout() {
      const userId = sessionStorage.getItem("userId");
      AuthService.logout(userId).then(() => {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userType");
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>