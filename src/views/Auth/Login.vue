<template>
  <div class="login">
    <div class="login__left">
      <div class="login__left--topHeadings">
        <h1>SURVEY</h1>
        <h5>Manage Surveys</h5>
      </div>
    </div>
    <div class="login__right">
      <v-form class="form">
        <h2 class="heading">LOGIN</h2>
        <h3>{{ message }}</h3>
        <v-text-field
          v-model="loginData.email"
          label="Email"
          :rules="[rules.required, rules.email]"
          outlined
          shaped
        ></v-text-field>
        <v-text-field
          v-model="loginData.password"
          label="Password"
          type="password"
          :rules="[rules.required]"
          outlined
        ></v-text-field>
        <button @click="onLogin" class="button__black">LOGIN</button>
      </v-form>
    </div>
  </div>
</template>
<script>
import AuthService from "../../services/AuthService";
export default {
  data() {
    return {
      message: "",
      loginData: {
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    onLogin() {
      const loginData = {
        email: this.loginData.email,
        password: this.loginData.password,
      };
      AuthService.login(loginData)
        .then((response) => {
          if (
            response.status === 200 &&
            response.data.userType === "super-admin"
          ) {
            sessionStorage.setItem("authToken", response.data.accessToken);
            sessionStorage.setItem("userId", response.data.id);
            sessionStorage.setItem("userType", response.data.userType);
            this.$router.push({ name: "adminsList" });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
<style>
</style>