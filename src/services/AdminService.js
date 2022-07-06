import http from "../http-common";

class AdminService {
  createUser(userData) {
    return http.post(`/auth/register`, userData);
  }
  getAllAdmins() {
    return http.get("/superadmin/alladmins",{
      headers: {
        'x-access-token':  sessionStorage.getItem("token")
      }
    });
  }
}
export default new AdminService();