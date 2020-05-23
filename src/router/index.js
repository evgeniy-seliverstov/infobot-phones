import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
    meta: {
      title: "Главная страница",
      breadcrumb: [
        { name: "Главная" }
      ]
    }
  },
  {
    path: "/stoplist",
    name: "Stoplist",
    component: () => import("@/views/Stoplist/Stoplist"),
    meta: {
      title: "Стоп-лист",
      breadcrumb: [
        { name: "Главная", link: "/" },
        { name: "Стоп-лист" }
      ]
    },
  },
  {
    path: "/stoplist/page/:page",
    component: () => import("@/views/Stoplist/Stoplist"),
    meta: {
      title: "Стоп-лист",
      breadcrumb: [
        { name: "Главная", link: "/" },
        { name: "Стоп-лист" }
      ]
    },
  },
  {
    path: '/stoplist/add',
    component: () => import("@/views/Stoplist/StoplistAdd"),
    meta: {
      title: "Стоп-лист",
      breadcrumb: [
        { name: "Главная", link: "/" },
        { name: "Стоп-лист" }
      ]
    },
  },
  {
    path: '/stoplist/edit/:id',
    component: () => import("@/views/Stoplist/StoplistEdit"),
    meta: {
      title: "Стоп-лист",
      breadcrumb: [
        { name: "Главная", link: "/" },
        { name: "Стоп-лист" }
      ]
    },
  },
  {
    path: '*',
    redirect: "/"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
