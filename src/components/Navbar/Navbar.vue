<template>
  <div class="navbar">
    <div class="navbar__left">
      <router-link
        class="navbar__logo"
        :to="role === 'super-admin' ? '/' : '/surveys'"
        >SURVEY</router-link
      >
    </div>
    <div class="navbar__right" v-if="role === 'super-admin'">
      <router-link class="navbar__right--link" to="/">ADMINS</router-link>
      <router-link class="navbar__right--link" to="/create-admin"
        >CREATE ADMIN</router-link
      >
      <button class="button__black logout__button" @click="onLogout">
        Logout
      </button>
    </div>
    <div class="navbar__right" v-if="role === 'admin'">
      <router-link class="navbar__right--link" to="/surveys"
        >SURVEYS</router-link
      >
      <router-link class="navbar__right--link" to="/create-survey"
        >Create Survey</router-link
      >
      <button class="button__black logout__button" @click="onLogout">
        Logout
      </button>
    </div>
  </div>
</template>
<script>
import AuthService from "../../services/AuthService";
export default {
  props: {
    role: String,
  },
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