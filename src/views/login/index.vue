<template>
 <div class="login">
  <div class="loginwarp">
    <div class="loginlog">
      <img src="./logo_index.png" alt="">
    </div>
  <el-form ref="form" :model="form">
    <el-form-item>
      <el-input v-model="form.name" placeholder="请输入手机号" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="form.name" placeholder="请输入验证码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="loginbtn" type="primary">登录</el-button>
      <el-button>获取验证码</el-button>
    </el-form-item>
  </el-form>
  </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  .loginwarp {
    background-color: #fff;
    padding: 40px;
    .loginlog {
      text-align: center;
      padding-bottom: 20px;
      img {
        width: 160px;
      }
    }
    .loginbtn {
      width: 300px;
    }
  }
}
</style>
