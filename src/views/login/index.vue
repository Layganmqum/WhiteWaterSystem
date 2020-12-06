<template>
  <div class="login-container">
      <!--
          el-form 表单组件
          每个表单项都必使用 el-form-item 组件包裹
       -->
    <el-form class="login-form" :model="user" :rules="rules" ref="ruleForm">
      <el-form-item>
        <div class="login-head"></div>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" :loading="loginLoading" type="primary" @click="onLogin('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request.js'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      rules: {
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '电话号码格式不对', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 0, max: 6, message: '验证码格式不对', trigger: 'blur' }
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
      const user = this.user

      // 表单验证

      // 验证通过，提交登录

      // 开启登录中 loading...
      this.loginLoading = true

      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data 用来设置 POST 请求体
        data: user
      }).then(res => {
        // 登录成功
        console.log(res)
        this.$message({ message: '登录成功', type: 'success' })
        // 关闭 loading
        this.loginLoading = false
      }).catch(err => {
        // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或者验证码错误')
        // 关闭 loading
        this.loginLoading = false
      })
      // 处理后端响应结果
      //  成功：xxx
      //  失败：xxx
    }
    // submitForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //       console.log('submit!!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // }
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
          margin: 0 auto;
          width: 216px;
          height: 54px;
          background: url("./login_head.png") no-repeat;
      }
      .login-btn {
          margin-left: 9.5%;
          width: 81%;
      }
  }
}
</style>
