/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
==========================================================================================*/

import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";
// import auth from "@/auth/authService";

// import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      meta: {
        authRequired: true
      },
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          redirect: "/dashboard/orders"
        },
        {
          path: "/dashboard/analytics",
          name: "dashboard-analytics",
          component: () => import("./views/DashboardAnalytics.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/dashboard/orders",
          name: "data-list-list-view",
          component: () =>
            import("@/views/ui-elements/orders/list-view/DataListListView.vue"),
          meta: {
            rule: "admin"
          }
        },
        {
          path: "/dashboard/settings",
          name: "settings",
          component: () => import("@/views/ui-elements/Settings.vue"),
          meta: {
            rule: "admin"
          }
        },
        {
          path: "/dashboard/catalog/",
          redirect: "/dashboard/catalog/categories"
        },
        {
          path: "/dashboard/catalog/categories",
          name: "categories",
          component: () =>
            import(
              "@/views/ui-elements/catalog/categories/list-view/DataListListView.vue"
            ),
          meta: {
            rule: "admin"
          }
        },
        {
          path: "/dashboard/catalog/items",
          name: "items",
          component: () =>
            import(
              "@/views/ui-elements/catalog/items/list-view/DataListListView.vue"
            ),
          meta: {
            rule: "admin"
          }
        },
        {
          path: "/dashboard/catalog/editor",
          name: "Editor",
          component: () =>
            import(
              "@/views/ui-elements/catalog/KnowledgeBase/KnowledgeBase.vue"
            ),
          meta: {
            rule: "admin"
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "/callback",
          name: "auth-callback",
          component: () => import("@/views/Callback.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/login",
          redirect: "/pages/login"
        },
        {
          path: "/pages/login",
          name: "page-login",
          component: () => import("@/views/pages/login/Login.vue"),
          meta: {
            rule: "editor",
            authRequired: false
          }
        },
        {
          path: "/pages/register",
          name: "page-register",
          component: () => import("@/views/pages/register/Register.vue"),
          meta: {
            rule: "editor",
            authRequired: false
          }
        },
        {
          path: "/pages/forgot-password",
          name: "page-forgot-password",
          component: () => import("@/views/pages/ForgotPassword.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/reset-password",
          name: "page-reset-password",
          component: () => import("@/views/pages/ResetPassword.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/lock-screen",
          name: "page-lock-screen",
          component: () => import("@/views/pages/LockScreen.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/comingsoon",
          name: "page-coming-soon",
          component: () => import("@/views/pages/ComingSoon.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/error-500",
          name: "page-error-500",
          component: () => import("@/views/pages/Error500.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/not-authorized",
          name: "page-not-authorized",
          component: () => import("@/views/pages/NotAuthorized.vue"),
          meta: {
            rule: "editor"
          }
        },
        {
          path: "/pages/maintenance",
          name: "page-maintenance",
          component: () => import("@/views/pages/Maintenance.vue"),
          meta: {
            rule: "editor"
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/error-404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

router.beforeEach((to, from, next) => {
  //   console.log(to.matched.some(record => record.meta.authRequired));
  if (to.matched.some(record => record.meta.authRequired)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.AppActiveUser.isLoggedIn) {
      next({ name: "page-login" });
    } else {
      next(); // go to wherever I'm going
    }

    // if (!auth.isAuthenticated()) {
    //   next({ name: "page-login" });
    // }
  }
  return next(); // does not require auth, make sure to always Return next()
});

export default router;
