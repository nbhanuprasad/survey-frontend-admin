<template>
  <div class="register container">
    <v-form class="form register__form" @submit="changePassword">
      <h2 class="heading">CHANGE PASSWORD</h2>
      <h3 class="error__msg">{{ message }}</h3>
      <v-text-field
        v-model="formData.oldPassword"
        label="Enter your old password"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="formData.password"
        label="Enter your new password"
        :rules="[rules.required]"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="formData.confirmPassword"
        label="Confirm Password"
        :rules="[rules.required]"
        type="text"
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
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
      },
    };
  },
  methods: {
    changePassword() {
      const data = {
        oldPassword: this.formData.oldPassword,
        newPassword: this.formData.password,
      };
      if (this.formData.password !== this.formData.confirmPassword) {
        this.message = "Password not match !";
        return;
      }
      AdminService.changePassword(data) 
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