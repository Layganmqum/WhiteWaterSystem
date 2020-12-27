<template>
  <div class="login-container">
      <!--
          el-form 表单组件
          每个表单项都必使用 el-form-item 组件包裹
       -->
       <!--
          配置 Form 表单验证：
          1、必须给 el-form 组件绑定 :model="uesr" 为表单数据对象
          2、给需要验证的表单项 el-form-item 绑定 prop属性(例如：prop="mobile")
            注意：prop 属性需要制定表单对象中的数据名称
          3、通过 el-form 组件的 rules 属性配置验证规则
            具体的验证规则参考官网
            如果内置的验证规则不满足，也可以自定义验证规则(例如协议验证)

          手动触发表单验证：
          1、给 el-form 设置 ref ，起个名字(随便起名，不重复即可)
          2、通过 ref 获取 el-form 组件，调用组件的 validate 进行验证
        -->
    <el-form class="login-form" :model="user" :rules="formRules" ref="login-form">
      <el-form-item>
        <div class="login-head">白水看世界</div>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" :loading="loginLoading" type="primary" @click="onLogin('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13966666666', // 手机号
        code: '246810', // 验证码
        agree: false, // 是否同意协议
        name: 'test1',
        photo: '@/views/layout/no-cover.jpg'
      },
      formRules: { // 表单验证配置
      // 要验证的数据名称，规则列表[]
        mobile: [
          // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发生变化时， blue 当失去焦点时
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { min: 6, max: 6, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            // validator 验证函数不是自己来调用的,而是当 element 表单触发验证的时候他会自己内部调用
            // 所以字需要提供校验函数处理逻辑就可以了
            //  通过:callback()
            validator: (rule, value, callback) => {
              if (value) {
                // 验证通过
                callback()
              } else {
                // 验证失败
                return callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      },
      checked: false, // 是否选择同意协议
      loginLoading: false // 登录按钮点击加载
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据
      // const user = this.user

      // 表单验证，validate 方法是异步的
      // this.$refs['login-form'].validate((valid, err) => {
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }

        // 验证通过，提交登录
        this.login()
      })
    },
    login () {
      // 开启登录中 loading...
      this.loginLoading = true

      // 对于代码中的请求操作
      // 1、接口请求可能需要重用
      // 2、实际工作中，接口非常容易变动，改起来麻烦
      // 建议的做法：把所有的请求都封装成函数然后统一的组织到模块中进行调用
      // 好处：方便管理维护、更改重用
      // login(this.user).then(res => {
      //   // 登录成功
      //   console.log(res)
      //   this.$message({ message: '登录成功', type: 'success' })

      //   // 关闭 loading
      //   this.loginLoading = false

      //   // 将接口返回的用户相关数据放到本地存储,方便应用数据共享
      //   // 本地存储只能存储字符串
      //   // 如果需要存储对象、数组类型的数据，需要将其转换成 JSON 格式字符串进行存储
      //   window.localStorage.setItem('user', JSON.stringify(res.data.data))

      //   // 跳转到首页:这个不能放在 user 定义之前，不然路由守卫查询不到，需要二次登录
      //   // this.$router.push('/')
      //   this.$router.push({
      //     name: 'home'
      //   })
      //   // 跳转到首页
      //   // this.$router.push('/')
      // }).catch(err => {
      //   // 登录失败
      //   console.log('登录失败', err)
      //   this.$message.error('登录失败，手机号或者验证码错误')
      //   // 关闭 loading
      //   this.loginLoading = false
      // })
      // 处理后端响应结果
      //  成功：xxx
      //  失败：xxx

      this.$message({ message: '登录成功', type: 'success' })
      this.loginLoading = false
      window.localStorage.setItem('user', JSON.stringify(this.user))
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped lang="less">
* {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
}
.login-container {
  position: fixed;;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.png") no-repeat;
  background-size: cover;
  .login-form {
      padding: 50px;
      min-width: 240px;
      .login-head {
          text-align: center;
          font-size: 3rem;
          line-height: 3rem;
          color: #fff;
      }
      .login-btn {
          margin-left: 9.5%;
          width: 81%;
      }
  }
}
</style>
