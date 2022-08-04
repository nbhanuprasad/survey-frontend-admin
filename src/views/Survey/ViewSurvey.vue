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
      <ExportReport :fileData="fileData" :fileName="fileName" />
    </div>
    <h3 v-show="survey.question.length <= 0" class="error__msg">
      NO QUESTIONS FOUND
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
                <span v-for="(item, i) in question.choice" :key="i">
                  {{
                    `${
                      item.count ? item.count : 0
                    } members have selected this option : ${item.choice}`
                  }}</span
                >
              </div>
              <div class="options" v-show="question.questionType === 'rating'">
                <span v-for="(item, i) in question?.userRatings" :key="i">
                  {{ `RATING ${item.key} -  COUNT ${item.count}` }}</span
                >
              </div>
              <section
                v-if="
                  question.response &&
                  question.response.length > 0 &&
                  question.questionType !== 'multiple-choice' &&
                  question.questionType !== 'rating'
                "
              >
                <h3>Question Responses</h3>
                <div v-for="item in question.response" :key="item.id">
                  <span class="viewSurvey__choice response">{{
                    `${item.enduser.email} - SUBMITTED - ${item.response}`
                  }}</span>
                </div>
              </section>
              <span
                v-if="question.response && question.response.length <= 0"
                class="viewSurvey__choice response login_error"
                >NO RESPONSES FOUND FOR THIS QUESTION</span
              >
            </div>
          </template>
        </vue-collapsible-panel>
      </vue-collapsible-panel-group>
    </div>
  </div>
</template>
<script>
import SurveyService from "../../services/SurveyService";
import ExportReport from "./ExportReport.vue";
export default {
  name: "view-survey",
  components: {
    ExportReport,
  },
  props: ["id"],
  data() {
    return {
      survey: {
        question: [],
      },
      fileData: [],
      fileName: "",
      message: "",
    };
  },
  methods: {
    retrieveSurvey() {
      SurveyService.getSurvey(this.id)
        .then((response) => {
          this.survey = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    fetchReportData() {
      SurveyService.getReportDetails(this.id)
        .then((response) => {
          this.fileData = response.data;
          this.fileName = this.survey.title;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveSurvey();
    this.fetchReportData();
  },
};
</script>
<style>
.viewSurvey__choice {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
}

.response {
  width: 100%;
  margin: 5px 0;
  display: inline-block;
}
.login_error {
  padding: 1px 20px;
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  background: #d3d3d3;
  margin: 10px 0;
  border-radius: 10px;
  color: var(--redColor);
  transition: all 0.4s ease-in-out;
}
</style>