import http from "../http-common"; 

class AuthService {
  login(authData) {
    return http.post(`/auth/signin`, authData);
  }
  logout(userId) {
    return http.get(`/auth/logout/${userId}`,{
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
}
export default new AuthService();
