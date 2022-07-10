<template>
  <div class="container">
    <table>
      <caption class="heading">
        {{
          message
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="survey in surveys">
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
              <v-icon large color="red" class="actions__icon">
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
      message: "Surveys List",
    };
  },
  methods: {
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
  },
};
</script>