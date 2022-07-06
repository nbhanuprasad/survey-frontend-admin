import http from "../http-common";

class AdminService {
  getAllAdminSurveys() {
    return http.get("/survey/list", {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  createSurvey(surveyData) {
    return http.post("/create/survey", surveyData, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
  deleteSurvey(id) {
    return http.delete(`/survey/${id}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("token")
      }
    });
  }
}
export default new AdminService();