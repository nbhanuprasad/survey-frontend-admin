import http from "../http-common";

class AdminService {
  createAdmin(adminData) {
    return http.post(`/auth/signup`, adminData, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  getAllAdmins() {
    return http.get("/superadmin/alladmins", {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
}
export default new AdminService();