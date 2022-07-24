<template>
  <div class="container viewSurvey">
    <div class="heading__wrapper">
      <h1 class="heading">SURVEY DETAILS</h1>
      <h4>{{ message }}</h4>
      <div class="align_single_line">
        <h3>
          <strong>SURVEY TITLE</strong> : <span>{{ survey.title }}</span>
        </h3>
        <h3>
          <strong>SURVEY DESCRIPTION</strong> :
          <span>{{ survey.description }}</span>
        </h3>
        <h3>
          <strong>SURVEY STATUS</strong> :
          <span>{{ survey.isPublished ? "PUBLISHED" : "UNPUBLISHED" }}</span>
        </h3>
        <h3>
          <strong>SURVEYY CREATED AT</strong> :
          <span>{{ new Date(survey.createdAt).toLocaleString() }}</span>
        </h3>
      </div>
    </div>
    <h3 v-show="survey.question.length <= 0" class="error__msg">
      NO SURVEYS FOUND
    </h3>
    <div class="form" v-show="survey.question && survey.question.length > 0">
      <vue-collapsible-panel-group
        base-color="#000"
        accordion
        v-for="(question, index) in survey.question"
        :key="index"
      >
        <vue-collapsible-panel :expanded="false">
          <template #title>{{ question.title }}</template>
          <template #content>
            <div>
              <div class="options" v-show="question.choice.length > 0">
                <span v-for="(item, i) in question.choice" :key="i">{{
                  item.choice
                }}</span>
              </div>
              <h3>Survey Question Response</h3>
            </div>
          </template>
        </vue-collapsible-panel>
      </vue-collapsible-panel-group>
    </div>
  </div>
</template>
<script>
import SurveyService from "../../services/SurveyService";
export default {
  name: "view-survey",
  props: ["id"],
  data() {
    return {
      survey: {
        question: [],
      },
      message: "",
    };
  },
  methods: {
    retrieveSurvey() {
      SurveyService.getSurvey(this.id)
        .then((response) => {
          this.survey = response.data;
          console.log(this.survey);
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveSurvey();
  },
};
</script>
<style>
</style>