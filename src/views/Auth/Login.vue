<template>
  <div class="login">
    <div class="login__left">
      <div class="login__left--topHeadings">
        <h1>SURVEY</h1>
        <h5>Manage surveys</h5>
      </div>
    </div>
    <div class="login__right">
      <v-form class="form">
        <h2 class="heading">LOGIN</h2>
        <v-text-field
          v-model="formData.email"
          label="Email"
          :rules="[rules.required, rules.email]"
          outlined
          shaped
        ></v-text-field>
        <v-text-field
          v-model="formData.password"
          label="Password"
          type="password"
          :rules="[rules.required]"
          outlined
        ></v-text-field>
        <button @click="handlelogin" class="button__black">LOGIN</button>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      formData: {
        email: "",
        password: "",
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
};
</script>
<style>
</style>