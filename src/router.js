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
    path: "/create-survey",
    name: "createSurvey",
    component: () => import("./views/Survey/CreateSurvey.vue"),
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
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend-admin/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
