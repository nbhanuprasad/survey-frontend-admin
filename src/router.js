import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    name: "adminsList",
    component: () => import("./views/Admin/AdminsList.vue"),
  },
  {
    path: "/surveys",
    name: "surveysList",
    component: () => import("./views/Survey/SurveysList.vue")
  },
  {
    path: "/view-admin/:path/:id",
    name: "viewAdmin",
    component: () => import("./views/Survey/SurveysList.vue"),
    props:true
  },
  {
    path: "/create-survey",
    name: "createSurvey",
    component: () => import("./views/Survey/CreateSurvey.vue"),
  },
  {
    path: "/edit-survey/:surveyId",
    name: "editSurvey",
    component: () => import("./views/Survey/CreateSurvey.vue"),
    props:true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Auth/Login.vue"),
  },
  {
    path: "/create-admin",
    name: "createAdmin",
    component: () => import("./views/Admin/CreateAdmin.vue"),
  },
  {
    path: "/change-password",
    name: "changePassword",
    component: () => import("./views/Admin/ChangePassword.vue"),
  },
  {
    path: "/view-survey/:id",
    name: "viewSurvey",
    component: () => import("./views/Survey/ViewSurvey.vue"),
    props:true
  },
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend-admin/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
