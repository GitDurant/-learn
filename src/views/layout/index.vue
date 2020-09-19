<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
  .el-header, .el-footer {
    background-color: #fff;
    color: #333
  }
  .el-aside {
    background-color: #aaa;
    color: #333
  }
  .el-main {
    background-color: #eee;
    color: #333
  }
</style>
