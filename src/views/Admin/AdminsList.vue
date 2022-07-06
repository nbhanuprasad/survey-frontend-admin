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
          <th scope="col">User Name</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="admin in admins">
        <tr>
          <td data-label="Account">{{ admin.username }}</td>
          <td data-label="Due Date">{{ admin.email }}</td>
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
import AdminService from "../../services/AdminService";
export default {
  data() {
    return {
      admins: [
        {
          username: "Tester 1",
          email: "test@test.com",
        },
      ],
      message: "Admins List",
    };
  },
  methods: {
    goView(album) {
      this.$router.push({ name: "view", params: { id: album.id } });
    },
    goDelete(album) {
      AdminService.delete(album.id)
        .then(() => {
          this.fetchAdmins();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    fetchAdmins() {
      AdminService.getAllAdmins()
        .then((response) => {
          this.admins = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.fetchAdmins();
  },
};
</script>