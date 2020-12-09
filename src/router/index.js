import Vue from 'vue'
import VueRouter from 'vue-router'
// 在 VueCli 创建的项目中 @ 表示 src 目录
// 它是 src 目录的路径别名
// 好处：它不受当前文件路径影响
// 注意：@ 就是 src 路径，后面别忘了写斜杠
// 建议：如果加载的资源路径在当前目录下，就正常写
//      如果需要进行父级路径查找的都是用 @
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路由 layout 有一个默认子路由，这个名字没有意义，所以警告
    // 正确的做法是：如果有默认子路由，就不用给父路由设置name(默认子路由只有1个)
    component: Layout,
    children: [
      {
        // 我们通常会把根路径 / 设置为网页的首页
        // 因为我们在手动输入网址访问网站的时候，可以省略 /
        // 如果是别的名称，则必须加上 /
        path: '', // path 为空，会默认作子路由渲染
        // 路由的名字：更方便传递动态参数
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫：所有页面的导航都会经过这里
// 守卫页面的导航
// to：要去的路由路由信息
// from：来自哪儿的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login ，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过:next()

  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录界面，正常允许通过
    next()
  }
})

export default router
