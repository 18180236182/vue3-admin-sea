let firstMenu = null

/**
 * 动态筛选路由
 * @param userMenus
 * @returns {*[]}
 */
export function mapMenusToRoutes (userMenus) {
  const routes = []
  /**
   * 1.先去加载默认所有的routes
   */
  const allRoutes = []
  // 引入router/main文件夹解析成对象
  const routeFiles = require.context('../router/main', true, /\.js/)
  // 遍历每一个模块 --- 拿到解析并且拿到每一个路由模块
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    // 每一个模块的path、name、component、children
    allRoutes.push(route.default)
  })
  const recurseGetRoute = (menus) => {
    for (const menu of menus) {
      const route = allRoutes.find((route) => route.path === menu.path)
      if (route) routes.push(route)
      if (!firstMenu) {
        firstMenu = menu
      }
    }
  }
  recurseGetRoute(userMenus)
  return routes
}

export { firstMenu }

/**
 * 刷新界面---左侧菜单可以对应右面内容 防止丢失左侧菜单的值
 * @param userMenus 角色拥有的路由菜单
 * @param currentPath 当前点击选择的菜单url
 */
export function pathMapToMenu (userMenus, currentPath) {
  for (const menu of userMenus) {
    if (menu.path === currentPath) {
      return menu
    }
  }
}
