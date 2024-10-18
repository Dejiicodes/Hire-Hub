import { createRouter, createWebHistory } from "vue-router";
import { h, resolveComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout"; // CoreUI layout
import HomePage from "../views/HomePage.vue"; // Your custom view
import UserLogin from "../views/UserLogin.vue"; // Your custom view
import SignUpView from "../views/SignUp.vue"; // Your custom view
import JobListings from "../views/JobListings.vue"; // Your custom view
import UserProfile from "../views/UserProfile.vue"; // Your custom view

const routes = [
  // Custom HireHub routes
  { path: "/", component: HomePage },
  { path: "/login", component: UserLogin },
  { path: "/jobs", component: JobListings },
  { path: "/profile", component: UserProfile },
  { path: "/signup", component: SignUpView },

  // CoreUI routes
  {
    path: "/",
    name: "Home",
    component: DefaultLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/DashBoard.vue"
          ),
      },
      {
        path: "/theme",
        name: "Theme",
        redirect: "/theme/typography",
      },
      {
        path: "/theme/colors",
        name: "AllColors",
        component: () => import("@/views/theme/AllColors.vue"),
      },
      {
        path: "/theme/typography",
        name: "ThemeTypography",
        component: () => import("@/views/theme/ThemeTypography.vue"),
      },
      // More CoreUI routes here...
    ],
  },
  {
    path: "/pages",
    redirect: "/pages/404",
    name: "Pages",
    component: {
      render() {
        return h(resolveComponent("router-view"));
      },
    },
    children: [
      {
        path: "404",
        name: "ThePage404",
        component: () => import("@/views/pages/ThePage404.vue"),
      },
      {
        path: "500",
        name: "ThePage500",
        component: () => import("@/views/pages/ThePage500.vue"),
      },
      {
        path: "login",
        name: "CoreLogin",
        component: () => import("@/views/pages/PageLogin.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/pages/PageRegister.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next({ path: "/login" });
  } else if (
    to.matched.some((record) => record.meta.requiresAdmin) &&
    !isAdmin(token)
  ) {
    next({ path: "/" });
  } else {
    next();
  }
});

// Add a helper function to check if a user is admin
function isAdmin() {
  // Add logic here to decode token and check if the user has admin privileges
  return true; // Temporary placeholder; replace with actual admin check
}

export default router;
