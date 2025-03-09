import { type RouteRecordRaw } from 'vue-router'
import { getRouterInfo } from '@/utils'

export const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    name: 'index',
    redirect: "/index/login",
    component: () => import('@/views/index/index.vue'),
    meta: {
      title: "可乐社区"
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/index/login/login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/index/register/register.vue'),
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    meta: {
      title: "可乐社区"
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import('@/views/404/404.vue'),
  }
]


export const { routerNames, routerpaths } = getRouterInfo(routes)
