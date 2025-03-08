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
      path: "/admin/login",
      name: "Adminlogin",
      component: () => import("@/views/Admin.Login.vue"),
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
    {
      path: "/admin/profile",
      name: "profile",
      component: () => import("@/views/Admin.Profile.vue"),
    },
    {
      path: "/admin/book-category",
      name: "book-category",
      component: () => import("@/views/Admin.Book.vue"),
    },
    {
      path: "/admin/book/:id",
      name: "book-detail",
      component: () => import("@/views/Admin.Detail.vue"),
      props: true,
    },
    {
      path: "/admin/book/create",
      name: "book-create",
      component: () => import("@/views/Admin.Create.vue"),
    },
    {
      path: "/admin/borrow-category",
      name: "borrow-category",
      component: () => import("@/views/Admin.Borrow.vue"),
    },
  ],
})

export default router
