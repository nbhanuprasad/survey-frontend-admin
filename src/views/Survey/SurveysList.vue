<template>
  <div class="container viewSurvey">
    <h3 class="heading">
      {{ message }}
    </h3>
    <div class="align_single_line"  v-if="userType !== 'admin'">
      <h3>
        <strong>User Name</strong> : <span>{{ userInfo.username }}</span>
      </h3>
      <h3>
        <strong>User Email</strong> :
        <span>{{ userInfo.email }}</span>
      </h3>
      <h3>
        <strong>User Status</strong> :
        <span>{{ userInfo.active ? "Active" : "InActive" }}</span>
      </h3>
    </div>
    <table>
      <h3 v-show="surveys.length <= 0" class="error__msg">NO SURVEYS FOUND</h3>
      <thead>
        <tr v-show="surveys.length > 0">
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody
        v-for="(survey, i) in surveys"
        :key="i"
        v-show="surveys.length > 0"
      >
        <tr>
          <td data-label="Survey Title">{{ survey.title }}</td>
          <td data-label="Survey Description">{{ survey.description }}</td>
          <td data-label="Status" class="published__switch">
            <v-switch
              v-model="survey.isPublished"
              @change="onPublishSurvey(survey)"
              color="indigo"
              inset
              v-if="userType === 'admin'"
            ></v-switch>
            {{ survey.isPublished ? "Published" : "UnPublished" }}
          </td>
          <td data-label="Actions">
            <span class="table__item--actions">
              <v-icon
                large
                color="blue"
                class="actions__icon"
                @click="onViewSurvey(survey.id)"
              >
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
  props: ["path", "id"],
  data() {
    return {
      surveys: [
        {
          title: "space",
          description: "study on space",
          isPublished: false,
          id: 2,
        },
      ],
      userType: "",
      userInfo: {},
      message: "Surveys List",
    };
  },
  methods: {
    onEditSurvey(surveyId) {
      this.$router.push({ name: "editSurvey", params: { surveyId } });
    },
    onViewSurvey(surveyId) {
      this.$router.push({ name: "viewSurvey", params: { id: surveyId } });
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
    onPublishSurvey(survey) {
      const surveyData = {
        id: survey.id,
        isPublished: survey.isPublished,
      };
      SurveyService.publishSurvey(surveyData)
        .then((response) => {
          if (response.status === 200) {
            this.fetchSurveys();
          }
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    fetchSurveys() {
      console.log(this.path);
      if (this.path === "adminSurveys") {
        SurveyService.getAdminSurveys(this.id)
          .then((response) => {
            this.surveys = response.data.survey;
            this.userInfo = response.data;
            this.message = `${response.data.username} SURVEYS LIST`;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      } else {
        SurveyService.getAllSurveys()
          .then((response) => {
            this.surveys = response.data;
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
  },
  mounted() {
    this.fetchSurveys();
    console.log(this.$route);
    this.userType = sessionStorage.getItem("userType");
  },
};
</script>