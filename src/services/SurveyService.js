import http from "../http-common";

class SurveyService {
  getAllSurveys() {
    return http.get("/survey/list", {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  getAdminSurveys(adminId) {
    return http.get(`/superadmin/${adminId}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  createSurvey(surveyData) {
    return http.post("/createsurvey", surveyData, {
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
  updateSurvey(id, surveyData) {
    return http.put(`/survey/${id}`, surveyData, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  getSurvey(id) {
    return http.get(`/survey/${id}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
  publishSurvey(surveyData) {
    return http.put(`/survey/${surveyData.id}?isPublished=${surveyData.isPublished}`, {}, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
}
export default new SurveyService();