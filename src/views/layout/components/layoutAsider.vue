<template>
  <div class="asider">
    <div class="logo">
      <img src="./logo_admin.png" alt="" />
    </div>
    <div class="">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#444"
        text-color="#fff"
        active-text-color="#aaa"
        :unique-opened="true"
        :router="true"
      >
        <el-menu-item index="/home">
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/article/publish">发布文章</el-menu-item>
            <el-menu-item index="/article/list">内容列表</el-menu-item>
            <el-menu-item index="/comment">评论列表</el-menu-item>
            <el-menu-item index="/material">素材管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>粉丝管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">图文数据</el-menu-item>
            <el-menu-item index="3-2">粉丝概况</el-menu-item>
            <el-menu-item index="3-3">粉丝图像</el-menu-item>
            <el-menu-item index="3-4">粉丝列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/user/index">
          <span slot="title">账号信息</span>
        </el-menu-item>
      </el-menu>
  </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  img {
    width: 120px;
  }
}
</style>
