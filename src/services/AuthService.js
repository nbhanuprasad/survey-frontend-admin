import http from "../http-common";

class AuthService {
  login(authData) {
    return http.post(`/auth/signin`, authData);
  }
  logout() {
    return http.put(`/auth/logout`, {}, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
}
export default new AuthService();
