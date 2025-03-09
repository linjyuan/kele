import { type RouteRecordRaw } from "vue-router"

export function getRouterInfo(router: RouteRecordRaw[]) {
  const routerpaths: Array<RouteRecordRaw["path"]> = [];
  const routerNames: Array<RouteRecordRaw["name"]> = [];
  router.forEach((item) => {
    if (item.hasOwnProperty('path') && item.path) {
      routerpaths.push(item.path)
    }
    if (item.hasOwnProperty('name') && item.name) {
      routerNames.push(item.name)
    }
  })
  return { routerpaths, routerNames }
}
