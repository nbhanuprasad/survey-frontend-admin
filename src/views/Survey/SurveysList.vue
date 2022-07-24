<template>
  <div class="container">
    <table>
      <caption class="heading">
        {{
          message
        }}
      </caption>
      <thead>
        <tr v-show="surveys.length > 0">
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
        <tr v-show="surveys.length <= 0">
          <th scope="col" class="error__msg">NO SURVEYS FOUND</th>
        </tr>
      </thead>
      <tbody v-for="survey in surveys" v-show="surveys.length > 0">
        <tr>
          <td data-label="Survey Title">{{ survey.title }}</td>
          <td data-label="Survey Description">{{ survey.description }}</td>
          <td data-label="Status">
            {{ survey.isPublished ? "Published" : "UnPublished" }}
          </td>
          <td data-label="Actions">
            <span class="table__item--actions">
              <v-icon large color="blue" class="actions__icon">
                mdi-eye-outline
              </v-icon>
              <v-icon
                large
                color="orange"
                class="actions__icon"
                @click="onEditSurvey(survey.id)"
                v-if="userType === 'admin'"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                large
                color="red"
                class="actions__icon"
                @click="onDeleteSurvey(survey.id)"
              >
                mdi-delete-outline
              </v-icon>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import SurveyService from "../../services/SurveyService";
export default {
  data() {
    return {
      surveys: [
        {
          title: "space",
          description: "study on space",
          isPublished: false,
        },
      ],
      userType: "",
      message: "Surveys List",
    };
  },
  methods: {
    onEditSurvey(surveyId) {
      this.$router.push({ name: "editSurvey", params: { id: surveyId } });
    },
    onDeleteSurvey(id) {
      SurveyService.deleteSurvey(id)
        .then(() => {
          this.fetchSurveys();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    fetchSurveys() {
      SurveyService.getAllSurveys()
        .then((response) => {
          this.surveys = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.fetchSurveys();
    this.userType = sessionStorage.getItem("userType");
  },
};
</script>