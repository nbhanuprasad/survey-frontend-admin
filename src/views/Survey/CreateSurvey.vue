<template>
  <div class="register container">
    <v-form class="form register__form">
      <h2 class="heading">CREATE SURVEY</h2>
      <v-text-field
        v-model="survey.title"
        label="Survey Title"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        v-model="survey.description"
        label="Survey Description"
        :rules="[rules.required]"
      ></v-text-field>
      <button @click="createSurvey" class="button__black">
        Create Survey
      </button>
    </v-form>
  </div>
</template>
<script>
import SurveyService from "../../services/SurveyService";
export default {
  data() {
    return {
      message: "",
      survey: {
        title: "",
        description: "",
        isPublished: false,
        questions: [],
      },
      rules: {
        required: (value) => !!value || `Field Required !`,
      },
    };
  },
    methods: {
    createSurvey() {
      const surveyData = {
        title: this.survey.title,
        description: this.survey.description,
        isPublished: this.survey.isPublished,
      }
      SurveyService.createSurvey(surveyData)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "surveysList" });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    }
  },
};
</script>