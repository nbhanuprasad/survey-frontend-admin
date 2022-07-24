<template>
  <div class="register container">
    <v-form class="form register__form" @submit="updateSurvey">
      <h2 class="heading">UPDATE SURVEY</h2>
      <h3 class="error__msg">{{ message }}</h3>
      <v-text-field
        v-model="formData.title"
        label="Enter Survey Title"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="formData.description"
        label="Enter Survey Description"
        :rules="[rules.required]"
        type="text"
      ></v-text-field>
      <button class="button__black">Update Survey</button>
    </v-form>
  </div>
</template>
<script>
import SurveyService from "../../services/SurveyService";
export default {
  props: ["id"],
  data() {
    return {
      message: "",
      formData: {
        title: "",
        description: "",
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
      },
    };
  },
  methods: {
    updateSurvey() {
      const data = {
        title: this.formData.title,
        description: this.formData.description,
      };
      SurveyService.updateSurvey(this.id, data)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "surveysList" });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    fetchSurvey() {
      SurveyService.getSurvey(this.id)
        .then((response) => {
          this.title = response.title;
          this.description = response.description;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.fetchSurvey();
  },
};
</script>