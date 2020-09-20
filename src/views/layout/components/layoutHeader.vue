<template>
  <div class="header">
    <el-row>
      <el-col :span="14">
        <span>广州科技职业技术大学</span>
      </el-col>
      <el-col :offset="6" :span="4">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link suerinof">
            <img class="pik" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3970647844,1653451223&fm=26&gp=0.jpg" alt="">
            <span class="suerName">小帅</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header {
}
.suerinof {
  display: flex;
  align-content: center;
  .pik {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
}
</style>
