import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
//  createWebHistory,
import { routes, routerpaths } from "./router"
// import { getRouterInfo } from "@/utils"
import NProgress from "nprogress"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})


// 动态设置标题
router.beforeEach((to, from, next) => {
  // if (!to.path || !routerpaths.includes(to.path) && to.path !== "/404") {
  //   next({
  //     path: "/404",
  //     replace: true,
  //   });
  // }
  NProgress.start();
  if (to.meta && to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title; // 修改标题
  }
  next()
});

router.afterEach((_to) => {
  NProgress.done();
})

export default router
