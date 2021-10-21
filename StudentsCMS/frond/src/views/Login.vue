<template>
  <body>
  <div>
    <el-form ref="form" :model="LoginForm" label-width="80px" class="box">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="LoginForm.username" style="width: 15%"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="LoginForm.password" show-password style="width: 15%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
  </body>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      LoginForm: {
        username: 'Admin',
        password: '123456',
      }
    }
  },
  methods: {
    async login() {
      const {data: res} = await this.$ajax.post('http://localhost/', this.LoginForm)
      // 成功
      if (res.code == 1) {
        this.$msg.success(res.msg)
        // session
        window.sessionStorage.setItem('token', res.token)
        // 跳转主页
        this.$router.push('/Index')
        // 失败
      } else {
        this.$msg.error(res.msg)
      }
    },
  },
}
</script>

<style>

</style>
