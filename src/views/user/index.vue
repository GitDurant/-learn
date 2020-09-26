<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户信息</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="form" :model="user" label-width="80px">
          <el-form-item label="用户名">
            <el-input type="text" v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="text" v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条账号">
            <el-input disabled type="text" v-model="user.id"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input disabled type="text" v-model="user.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input type="text" v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="updateUser">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload
          :http-request="updateImage"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false">
          <img :src="user.photo" class="avatar" />
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    getUserInfo () {
      this.$http({
        url: '/user/profile',
        method: 'get'
      }).then(res => {
        console.log('账号信息页面加载')
        console.log(res)
        this.user = res
      })
    },
    // 修改按钮函数
    updateUser () {
      this.$http({
        url: '/user/profile',
        method: 'patch',
        data: {
          name: this.user.name,
          intro: this.user.intro,
          email: this.user.email
        }
      }).then(res => {
        this.$message({
          message: '信息修改成功',
          type: 'success'
        })
        // 修改成功后调用vueX里的函数
        this.$store.commit('changeuserInfo', res)
      })
    },
    // 跟换头像函数
    updateImage (params) {
      console.log(params)
      // axios ------->XMLHttpRequest ---------> $ajax
      // 默认是不支持图片的上传的
      // 如果需要支持图片的上传，需要将参数通过formDate
      // 将参数转为 formDate 对象
      const FD = new FormData()
      FD.append('photo', params.file)
      this.$http({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/photo',
        method: 'patch',
        data: FD
      }).then(res => {
        console.log(res)// id photo
        this.user.photo = res.photo
        this.$store.commit('changeUserInfoImg', res.photo)
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
