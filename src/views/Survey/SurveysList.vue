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
          <th scope="col">Account</th>
          <th scope="col">Due Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items">
        <tr>
          <td data-label="Account">{{ item.name }}</td>
          <td data-label="Due Date">{{ item.calories }}</td>
          <td data-label="Amount">{{ item.name }}</td>
          <td data-label="Actions">
            <span class="table__item--actions">
              <v-icon large color="blue" class="actions__icon">
                mdi-eye-outline
              </v-icon>
              <v-icon
                large
                color="red"
                class="actions__icon"
                @click="onDeleteSurvey(item.id)"
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
      items: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
      ],
      message: "Surveys List",
    };
  },
  methods: {
    onDeleteSurvey(id) {
      SurveyService.deleteSurvey(id)
        .then(() => {
          console.log("deletea??");
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
};
</script>