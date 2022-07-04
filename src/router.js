import { createWebHistory, createRouter } from "vue-router";
const routes =  [
  {
    path: "/",
    alias: "/surveys",
    name: "surveys",
    component: () => import("./views/Survey/SurveysList.vue")
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
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;