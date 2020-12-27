<template>
  <div>
    <el-container class="layout-container">
      <el-aside class="aside" width="auto">
        <app-aside
        class="aside-menu"
        :is-collapse="isCollapse"
        />
      </el-aside>
      <el-container>
        <el-header class="header">
          <div>
            <!--
              class 样式处理
                {
                  css 类名：布尔值
                }
                true：作用类名
                false：不作用类名
             -->
            <i
            :class="{
              'el-icon-s-fold': isCollapse,
              'el-icon-s-unfold': !isCollapse
            }"
            @click="isCollapse = !isCollapse"
            ></i>
            <span>白水-啥都有系统</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap">
              <img class="avatar" src="./no-cover.jpg" alt="">
              <span>{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <!-- <span>
              个人设置<i class="el-icon-arrow-down el-icon--right"></i>
            </span> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <!--
                组件默认不识别原生事件的，除非做了内部处理
                当对某组件进行监听不到的时候，可以添加v-bing.native进行原生绑定
               -->
              <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="main">
          <!-- 子路由出口 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from './components/aside'
// import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边菜单栏的展示状态
    }
  },
  computed: {},
  created () {
    // 组件初始化，请求获取用户资料
    this.loadUserProfile()
  },
  mounted () {},
  watch: {},
  methods: {
    // 除了登录接口，其他所有接口都需要授权才能请求使用
    // 即除了登录接口，其他接口都需要提供身份令牌才能获取数据
    loadUserProfile () {
      // getUserProfile().then(res => {
      //   // this.user = res.data.data
      //   // this.user = JSON.parse(window.localStorage.getItem('user'))
      //   this.user = JSON.parse(window.sessionStorage.getItem('user'))
      // })
      this.user = JSON.parse(window.localStorage.getItem('user'))
    },
    onLogout () {
      // 弹出弹框：确认是否关闭
      this.$confirm('退出登录, 是否继续?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')
        // 跳转至登录界面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '退出已取消'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside{
  background-color: #d3dce6;
  .aside-menu{
    height: 100%;
    }
}
.header{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  // background-color: #b3c0d1;
}
.main{
  background-color: #e9eef3;
}

.avatar-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
