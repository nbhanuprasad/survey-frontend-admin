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
        <h3 class="error__msg">{{ message }}</h3>
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
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
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
      showPassword: false,
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
        deviceId: Math.floor(Math.random() * 500000),
      };
      AuthService.login(loginData)
        .then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem("authToken", response.data.accessToken);
            sessionStorage.setItem("userId", response.data.id);
            sessionStorage.setItem("userType", response.data.userType);
            if (response.data.userType === "super-admin") {
              this.$router.push({ name: "adminsList" });
            } else if (response.data.userType === "admin") {
              this.$router.push({ name: "surveysList" });
            }
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