import { createRouter, createWebHistory } from 'vue-router'
import { getTokenFromCookie } from "@/stores/user.store"
import { ElMessage } from "element-plus";

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
      children: [
        {
          path: "",
          name: "book-index",
          component: () => import("@/components/Book-Admin/index.vue"),
        },
        {
          path: ":id",
          name: "book-detail",
          component: () => import("@/components/Book-Admin/BookDetail.vue"),
          props: true,
        },
        {
          path: "create",
          name: "book-create",
          component: () => import("@/components/Book-Admin/BookCreate.vue"),
        },
        {
          path: "edit/:id",
          name: "book-edit",
          component: () => import("@/components/Book-Admin/BookEdit.vue"),
          props: true,
        },
      ]
    },
    {
      path: "/admin/borrow-category",
      name: "borrow-category",
      component: () => import("@/views/Admin.Borrow.vue"),
      children: [
        {
          path: "",
          name: "borrow-index",
          component: () => import("@/components/Borrow-Admin/index.vue"),
        }
      ]
    },
    {
      path: "/admin/publisher-category",
      name: "publisher-category",
      component: () => import("@/views/Admin.Publisher.vue"),
      children: [
        {
          path: '',
          name: "publisher-index",
          component: () => import("@/components/Publisher/index.vue"),
        },
        {
          path: 'create',
          name: "publisher-create",
          component: () => import("@/components/Publisher/Publisher-Create.vue"),
        },
        {
          path: 'edit/:id',
          name: "publisher-edit",
          component: () => import("@/components/Publisher/Publisher-Edit.vue"),
          props: true,
        },
      ]
    },
    {
      path: "/error-login",
      name: "auth-login",
      component: () => import("@/views/Authen.Login.vue"),
    },
    {
      path: "/error-authen",
      name: "auth-admin",
      component: () => import("@/views/Admin.Authen.Login.vue"),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = getTokenFromCookie();
  if (to.path === "/borrow" || to.name === "detail") {
    if (!token) {
      ElMessage.error("Vui lòng đăng nhập !");
      next({ name: 'auth-login', query: { redirect: to.fullPath } })
    } else {
      next();
    }
  } else if (to.path.startsWith("/admin") && to.path != "/admin/login") {
    if (!token) {
      ElMessage.error("Bạn không có quyền truy cập!");
      console.log('chay vao day ' + token);
      next({ name: 'auth-admin' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
