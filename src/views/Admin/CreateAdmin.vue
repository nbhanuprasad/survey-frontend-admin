<template>
  <div class="register container">
    <v-form class="form register__form">
      <h2 class="heading">CREATE ADMIN</h2>
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
        v-model="formData.organisation"
        label="Organisation"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="formData.password"
        label="Password"
        type="password"
        :rules="[rules.required]"
      ></v-text-field>
      <button @click="handleregister" class="button__black">
        Create Admin
      </button>
    </v-form>
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
        username: "",
        organisation: "",
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
};
</script>