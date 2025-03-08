import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LogIn.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUp.vue"),
    },
    {
      path: "/borrow",
      name: "borrow",
      component: () => import("@/views/BookBorrow.vue"),
    },
    {
      path: "/book/:id",
      name: "detail",
      component: () => import("@/views/DetailBook.vue"),
      props: true,
    },
  ],
})

export default router
