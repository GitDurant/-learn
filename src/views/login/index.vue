<template>
  <div class="login">
    <div class="loginwarp">
      <div class="loginlog">
        <img src="./logo_index.png" alt="" />
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="12">
              <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-button class="colBtn" @click="colBtn">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-checkbox v-model="from.read">我已阅读<a href="#">客户服务条款</a>和<a href="#">安全隐私</a></el-checkbox> -->
        <el-form-item>
           <!-- :loading="loginloading" -->
          <el-button class="loginbtn" type="primary" @click="login"  >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入axios
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        mobile: '13911111111',
        code: '246810'
        // read: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11位的数字', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6位的数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitdata()
        } else {
        }
      })
    },
    submitdata () {
      // this.loginloading = true
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        metho: 'post',
        data: this.form
      }).then(res => {
        this.$message({
          message: '恭喜你,登录成功',
          type: 'success'
        })
        // this.loginloading = false
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
        this.$message.error('登录失败，请输入正确的手机号码或验证码')
      })
    },
    colBtn () {
    // 获取from表达信息
      this.$refs.form.validateField('mobile', errMsg => {
        if (errMsg.trim().length > 0) {
          // 验证不通过
          console.log(errMsg)
        } console.log('这里是通过之后的代码')
      })
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
    padding: 30px;
    .loginlog {
      text-align: center;
      padding-bottom: 20px;
      img {
        width: 160px;
      }
      .colBtn {
        width: 100%;
      }
    }
    .loginbtn {
      width: 300px;
    }
  }
}
</style>
