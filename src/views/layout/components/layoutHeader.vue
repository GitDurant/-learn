<template>
  <div class="header">
    <el-row>
      <el-col :span="14">
        <span>广州科技职业技术大学</span>
      </el-col>
      <el-col :offset="6" :span="4">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link suerinof">
            <img class="pik" :src="userName.photo">
            <span class="suerName">{{userName.name}}</span>
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
export default {
  data () {
    return {
      userName: {}
    }
  },
  created () {
    this.userName = JSON.parse(window.localStorage.getItem('userInfo'))
    console.log(this.userName)
  }
}
</script>

<style lang="less" scoped>
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
