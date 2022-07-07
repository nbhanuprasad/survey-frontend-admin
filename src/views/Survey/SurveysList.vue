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
          <th scope="col">SurveyList</th>
          <th scope="col">Due Date</th>
          <th scope="col">SurveyOwner</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items"  :key="item.id">
        <tr>
          <td data-label="SurveyList">{{ item.name }}</td>
          <td data-label="Due Date">{{ item.calories }}</td>
          <td data-label="SurveyOwner">{{ item.name }}</td>
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
export default {
  data() {
    return {
      items: [
        {
          name: " null ",
          calories: null,
        },
      ],
      message: "Surveys List",
    };
  },
};
</script>