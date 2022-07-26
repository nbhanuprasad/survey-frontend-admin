<template>
  <div class="register container">
    <v-form class="form survey__form" @submit="createSurvey">
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
            </div>
            <v-text-field
              v-model="question.title"
              label="Enter your question"
              :rules="[rules.required]"
            >
            </v-text-field>
            <!-- MULTIPLE CHOICE QUESTION-->
            <div v-if="question.question_type === 'multiple-choice'">
              <h5>
                ADD OPTION
                <v-icon
                  large
                  color="blue"
                  @click="handleAddOption(index)"
                  class="icon survey__icon"
                  >mdi-plus</v-icon
                >
              </h5>
              <div
                class="survey__question--options"
                v-for="(item, optionIndex) in question.options"
                :key="optionIndex"
              >
                <div class="survey__question--option">
                  <v-text-field
                    v-model="item.option"
                    :label="`Option ${optionIndex + 1}`"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                  <v-icon
                    large
                    color="red"
                    @click="handleDeleteOption(index, optionIndex)"
                    v-show="optionIndex !== 0"
                    class="icon survey__icon del__icon"
                  >
                    mdi-minus</v-icon
                  >
                </div>
              </div>
            </div>
            <div class="survey__question--bottom">
              <v-switch
                label="Required"
                v-model="question.required"
                color="indigo"
                inset
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
      <button class="button__black">Create Survey</button>
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
        questionOptions: ["text-box", "multiple-choice", "rating"],
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
        case "rating":
          questions = [...questions, new FormTextBoxObj("rating")];
          break;
        case "multiple-choice":
          questions = [
            ...questions,
            {
              ...new FormTextBoxObj("multiple-choice"),
              options: [
                {
                  option: "",
                },
              ],
            },
          ];
          break;
      }
      this.survey.questions = questions;
    },
    handleDeleteQuestion(id) {
      this.survey.questions = this.survey.questions.filter((_, i) => i !== id);
    },
    handleAddOption(id) {
      let questions = [...this.survey.questions];
      let currentQuestionOptions = questions[id].options;
      currentQuestionOptions = [
        ...currentQuestionOptions,
        {
          option: "",
        },
      ];
      this.survey.questions[id].options = currentQuestionOptions;
    },
    handleDeleteOption(questionId, optionId) {
      let questions = [...this.survey.questions];
      let currentQuestionOptions = questions[questionId].options;
      this.survey.questions[questionId].options = currentQuestionOptions.filter(
        (_, i) => i !== optionId
      );
    },
    createSurvey(e) {
      e.preventDefault();
      const surveyData = {
        title: this.survey.title,
        description: this.survey.description,
        isPublished: this.survey.isPublished,
        questions: this.survey.questions,
      };
      // console.log("surveyData??", surveyData);
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