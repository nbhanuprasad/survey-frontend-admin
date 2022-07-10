import http from "../http-common";

class SurveyService {
  getAllSurveys() {
    return http.get("/survey/list", {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  createSurvey(surveyData) {
    return http.post("/survey/create/", surveyData, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  deleteSurvey(id) {
    return http.delete(`/survey/${id}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
}
export default new SurveyService();