import { createRouter, createWebHistory } from "vue-router";
import middlewarePipeline from "./middlewarePipeline";
import guest from "../middleware/guest";
import auth from "../middleware/auth";
import AppLayout from "../layouts/AppLayout.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: DefaultLayout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          meta: { middleware: [guest] },
          component: () =>
            import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
        },
        {
          path: "/login",
          name: "login",
          meta: { middleware: [guest] },
          component: () =>
            import(
              /* webpackChunkName: "login" */ "../views/pages/LoginView.vue"
            ),
        },
        {
          path: "/about",
          name: "about",
          meta: { middleware: [guest] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
        },
      ],
    },
    {
      path: "/app",
      name: "app",
      component: AppLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { middleware: [auth] },
          component: () =>
            import(
              /* webpackChunkName: "dashboard" */ "../views/DashboardView.vue"
            ),
        },
        {
          path: "/user",
          name: "user",
          meta: { middleware: [auth] },
          component: () =>
            import(/* webpackChunkName: "user" */ "../views/UserView.vue"),
        },
        {
          path: "/authorizations",
          name: "authorizations",
          meta: { middleware: [auth] },
          component: () =>
            import(
              /* webpackChunkName: "authorizations" */ "../views/AuthorizationsView.vue"
            ),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware || [];
  const context = { to, from, next };

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
