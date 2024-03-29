import http from "../http-common";

class AdminService {
  createAdmin(adminData) {
    return http.post(`/auth/signup`, adminData, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  getAllAdmins() {
    return http.get("/superadmin/alladmins", {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  changePassword(data) {
    return http.put(`/auth/changepassword`, data, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  updateAdminStatus(adminData) {
    return http.put(`/superadmin/${adminData.id}?active=${adminData.isActive}`, {}, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
}
export default new AdminService();