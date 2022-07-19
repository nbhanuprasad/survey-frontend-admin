<template>
  <div class="register container">
    <v-form class="form survey__form">
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
      <v-switch
        :label="`${survey.isPublished ? 'UnPublish Survey' : 'Publish Survey'}`"
        v-model="survey.isPublished"
        inset
        color="indigo darken-3"
      ></v-switch>
      <h1>ADD QUESTIONS TO SURVEY</h1>
      <div class="survey__questions--wrapper">
        <div class="add__question">
          <v-select
            :items="survey.questionOptions"
            v-model="survey.questionType"
            :rules="[rules.required]"
            label="Select Question Type"
          ></v-select>
          <v-icon
            large
            color="blue"
            @click="handleAddQuestion"
            class="survey__icon align__icon icon"
            >mdi-plus</v-icon
          >
        </div>
        <div class="survey__question--wrapper">
          <div
            class="survey__question"
            v-for="(question, index) in survey.questions"
            :key="index"
          >
            <div class="survey__question--heading">
              <h3>
                Question Type - {{ question.question_type.toUpperCase() }}
              </h3>
              <h4>Question No - {{ index + 1 }}</h4>
            </div>
            <v-text-field
              v-model="question.title"
              label="Enter your question"
              :rules="[rules.required]"
            >
            </v-text-field>
            <div class="survey__question--bottom">
              <v-switch
                label="Required"
                v-model="question.required"
                color="success"
                class="required__switch"
              >
              </v-switch>
              <v-icon
                large
                color="red"
                class="icon actions__icon"
                @click="handleDeleteQuestion(index)"
              >
                mdi-delete-outline
              </v-icon>
            </div>
          </div>
        </div>
      </div>
      <button @click="createSurvey" class="button__black">Create Survey</button>
    </v-form>
  </div>
</template>
<script>
import SurveyService from "../../services/SurveyService";
import { FormTextBoxObj } from "./SurveyHelper";
export default {
  name: "create-survey",
  data() {
    return {
      survey: {
        title: "",
        description: "",
        questions: [],
        isPublished: false,
        questionType: "",
        questionOptions: ["text-box"],
      },
      message: "Create Survey , Add Questions",
      rules: {
        required: (value) => !!value || "Field Required.",
      },
    };
  },
  methods: {
    handleAddQuestion() {
      let questions = [...this.survey.questions];
      switch (this.survey.questionType) {
        case "text-box":
          questions = [...questions, new FormTextBoxObj("text-box")];
          break;
      }
      this.survey.questions = questions;
    },
    handleDeleteQuestion(id) {
      this.survey.questions = this.survey.questions.filter((_, i) => i !== id);
    },
    createSurvey() {
      const surveyData = {
        title: this.survey.title,
        description: this.survey.description,
        isPublished: this.survey.isPublished,
        questions: this.survey.questions,
      };
      SurveyService.createSurvey(surveyData)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "surveysList" });
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>