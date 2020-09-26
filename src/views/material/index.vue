<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>图片管理</span>
    </div>
    <div class="itemsbtn">
      <div class="itemsbtn-all">
        <el-radio-group @change="allCollect" v-model="mybtn" size="mini">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="itemsbtn-upl">
        <el-button @click="uploadMat" type="primary">上传图片</el-button>
        <el-dialog title="上传图片" :visible.sync="dialogFormVisible">
          <div>
            <el-upload
              class="avatar-uploader"
              name="image"
              :headers="headers"
              :on-success="upSuccess"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :show-file-list="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closePanle">关闭</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in materialList" :key="index">
        <el-card class="mycard">
          <img class="myimg" :src="item.url" alt="" />
          <div class="mycard-icon">
            <el-button
              @click="isCollect(false, item.id)"
              v-if="item.is_collected === true"
              type="text"
            >
              <i class="el-icon-star-on"></i>
            </el-button>
            <el-button
              @click="isCollect(true, item.id)"
              v-if="item.is_collected === false"
              type="text"
            >
              <i class="el-icon-star-off"></i>
            </el-button>
            <el-button @click="delMaterial" type="text">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      mybtn: '全部',
      materialList: [],
      dialogFormVisible: false,
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
  },
  methods: {
    // 获取素材函数
    getmaterialList (collect) {
      this.$http({
        url: '/user/images',
        method: 'get',
        params: {
          collect: collect
        }
      }).then(res => {
        console.log(res)
        this.materialList = res.results
      })
    },
    // 给全部和收藏按钮绑定事件
    allCollect (params) {
      if (params === '全部') {
        this.getmaterialList(false)
      } else {
        this.getmaterialList(true)
      }
    },
    // 封装一个渲染全部或者收藏的函数
    isShowAll () {
      // 根据是否在全部按钮下面选择需要刷新全部素材
      if (this.mybtn === '全部') {
        this.getmaterialList(false)
      } else {
        this.getmaterialList(true)
      }
    },
    // 给收藏按钮注册事件
    isCollect (bool, id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'put',
        data: {
          collect: bool
        }
      }).then(res => {
        // 渲染全部或者收藏的函数
        this.isShowAll()
        // 提示是否收藏成功
        this.$message({
          message: res.collect ? '已成功收藏' : '已取消收藏',
          type: 'success'
        })
      })
    },
    // 删除素材函数
    delMaterial (id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'DELETE'
      }).then(res => {
        // 提示用户删除成功
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        // 更新数据
        this.isShowAll()
      })
    },
    // 上传图片函数
    uploadMat () {
      this.dialogFormVisible = true
    },
    // 上传成功钩子回调函数
    upSuccess (response, file, fileList) {
      this.imageUrl = response.data.url
    },
    // 关闭面板
    closePanle () {
      // 隐藏面板
      this.dialogFormVisible = false
      // 重新加载数据
      this.isShowAll()
    }
  },
  created () {
    // 页面加载获取素材
    this.getmaterialList()
  }
}
</script>

<style lang="less" scoped>
.box-card {
  .itemsbtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .myimg {
    width: 100%;
    height: 200px;
  }
  .mycard {
    .mycard-icon {
      display: flex;
      justify-content: space-around;
      i {
        font-size: 20px;
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
  text-align: center;
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
.el-upload.el-upload--text {
    border: 1px solid #ddd;
}
</style>
