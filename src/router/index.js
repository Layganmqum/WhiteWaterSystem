import Vue from 'vue'
import VueRouter from 'vue-router'
// 在 VueCli 创建的项目中 @ 表示 src 目录
// 它是 src 目录的路径别名
// 好处：它不受当前文件路径影响
// 注意：@ 就是 src 路径，后面别忘了写斜杠
// 建议：如果加载的资源路径在当前目录下，就正常写
//      如果需要进行父级路径查找的都是用 @
import Login from '@/views/login/'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
