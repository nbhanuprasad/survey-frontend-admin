<template>
  <div class="container">
    <table>
      <caption class="heading">
        {{
          message
        }}
      </caption>

      <h3 v-show="admins.length <= 0" class="error__msg">NO ADMINS FOUND</h3>
     
      <thead>
        <tr v-show="admins.length > 0">
          <th scope="col">User Name</th>
          <th scope="col">Email</th>
          <th scope="col">Admin Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody  v-show="admins.length > 0" v-for="admin in admins">
        <tr>
          <td data-label="User Name">{{ admin.username }}</td>
          <td data-label="Email">{{ admin.email }}</td>
          <td data-label="Admin Status" class="published__switch">
            <v-switch
              v-model="admin.active"
              @change="handleAdminStatus(admin)"
              color="indigo"
              inset
            ></v-switch>
            {{ admin.active ? "Active" : "Deactivated" }}
          </td>
          <td data-label="Actions">
            <span class="table__item--actions">
              <v-icon
                large
                color="blue"
                class="actions__icon"
                @click="onViewAdmin(admin.id)"
              >
                mdi-eye-outline
              </v-icon>
              <!-- <v-icon large color="red" class="actions__icon">
                mdi-delete-outline
              </v-icon> -->
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
      admins: [],
      message: "Admins List",
    };
  },
  methods: {
    onViewAdmin(adminId) {
      this.$router.push({
        name: "viewAdmin",
        params: { path: "adminSurveys", id: adminId },
      });
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
    handleAdminStatus(admin) {
      const adminData = {
        id: admin.id,
        isActive: admin.active,
      };
      AdminService.updateAdminStatus(adminData)
        .then((response) => {
          if (response.status === 200) {
            this.fetchAdmins();
          }
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