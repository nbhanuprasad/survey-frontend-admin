<template>
  <div class="register container">
    <v-form class="form register__form" @submit="createAdmin">
      <h2 class="heading">CREATE ADMIN</h2>
      <h3 class="error__msg">{{ message }}</h3>
      <v-text-field
        v-model="formData.email"
        label="Email"
        :rules="[rules.required, rules.email]"
      ></v-text-field>
      <v-text-field
        v-model="formData.username"
        label="User Name"
        :rules="[rules.required, rules.counter]"
      ></v-text-field>
      <v-text-field
        v-model="formData.password"
        label="Password"
        :rules="[rules.required]"
        @click:append="showPassword = !showPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
      ></v-text-field>
      <v-text-field
        v-model="formData.confirmPassword"
        label="Confirm Password"
        :rules="[rules.required]"
        @click:append="showConfirmPassword = !showConfirmPassword"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConfirmPassword ? 'text' : 'password'"
      ></v-text-field>
      <button class="button__black">Create Admin</button>
    </v-form>
  </div>
</template>
<script>
import AdminService from "../../services/AdminService";
export default {
  data() {
    return {
      message: "",
      formData: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      showPassword: false,
      showConfirmPassword: false,
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
    createAdmin() {
      const data = {
        email: this.formData.email,
        username: this.formData.username,
        password: this.formData.password,
      };
      if (this.formData.password !== this.formData.confirmPassword) {
        this.message = "Password not match !";
        return;
      }
      AdminService.createAdmin(data)
        .then((response) => {
          if (response.status === 200) {
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