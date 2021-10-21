<template>
  <el-container>
    <el-aside width="200px" style="background-color: aqua; height: 100%">
      <el-menu :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航
          </template>
          <el-menu-item index="/Index/Home">首页</el-menu-item>
          <el-menu-item index="/Index/Students">学生管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h1 align="center" style="font-size:40px">学生管理系统</h1>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Index/Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/Index/Students' }">学生管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="danger" @click="logout" style="float: right">退出登录</el-button>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
