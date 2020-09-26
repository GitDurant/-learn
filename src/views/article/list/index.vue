<template>
  <div>
    <el-card class="box-card " >
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          {{status}}
          <el-radio v-model="status" label="">全部</el-radio>
          <el-radio v-model="status" label="0">草稿</el-radio>
          <el-radio v-model="status" label="1">待审核</el-radio>
          <el-radio v-model="status" label="2">审核通过</el-radio>
          <el-radio v-model="status" label="3">审核失败</el-radio>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- el-select：选择器 v-model：当前选择的选项的 value 属性  -->
           {{ form.channelID }}
          <el-select clearable v-model="form.channelID" placeholder="请选择活动区域">
            <!-- el-option：下拉选项 label：显示的文本 value="对应的值" -->
            <el-option v-for="(item,index) in channelsList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <!-- v-model:绑定的数据源  -->
            <el-date-picker value-format="yyyy-MM-dd" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <!-- 添加一个搜搜按钮 -->
        <el-form-item>
          <el-button @click="searchList" icon="el-icon-search" circle></el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card mycard">
      <div slot="header" class="clearfix">
        <span>发表文章共{{total_count}}条</span>
      </div>
      <el-table
        :data="dataList"
        v-loading="tableloading"
        stripe
        border
        height="500"
        style="width: 100%">
        <el-table-column
          label="图片"
          width="180"
          align="center">
          <template slot-scope="scope">
            <img class="myimg" :src="scope.row.cover.images[0]" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章主题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="发表状态"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">待审核</span>
            <span v-if="scope.row.status === 1">审核失败</span>
            <span v-if="scope.row.status === 2">审核通过</span>
            <span v-if="scope.row.status === 3">已删除</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          align="center">
           <template slot-scope="scope">
            <el-button type="info" round @click="update(scope.row)" ><i class="el-icon-edit"></i>修改</el-button>
            <el-button type="danger" round @click="delArticle(scope.row.id)"><i class="el-icon-delete"></i>删除</el-button>
          </template>
        </el-table-column>
       </el-table>
       <el-pagination
          :disabled="tableloading"
          @prev-click="prevClick"
          @next-click="nextClick"
          @current-change="currentChange"
          layout="prev, pager, next"
          :total="total_count">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
// const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      form: {
        channelID: '',
        resource: ''
      },
      // 开始&结束时间
      dateTime: [],
      // 文章数组
      dataList: [],
      // 文章总条数
      total_count: 0,
      // 页数
      page: 1,
      // 每页显示的数量
      per_page: 15,
      // 定义加载动画初始值为false
      tableloading: false,
      // 第一多选框初始数组
      channelsList: [],
      // 筛选状态属性：0 1 2 3
      status: ''
    }
  },
  methods: {
    // 打开页面时，需要去请求文章列表的数据
    getarticlelist () {
      this.tableloading = true
      setTimeout(() => {
        // 这个请求如果不带 token 放回401状态码
      // 携带 token
        this.$http({
          url: '/articles',
          method: 'get',
          params: {
            page: this.page,
            per_page: this.per_page
            // status: 2, // 文章状态
            // channelID: 2,
            // // 时间段筛选
            // begin_pubdate: this.dateTime[0],
            // end_pubdate: this.dateTime[1]
          }
        // headers: {
        //   Authorization: `Bearer ${userInfo.token} `
        // }
        }).then(res => {
          this.dataList = res.results
          this.total_count = res.total_count
          // 定时器执行完毕后清除加载动画tableloading
          this.tableloading = false
        })
      }, 876)
    },
    prevClick () {
      this.page--
      this.getarticlelist()
    },
    nextClick () {
      this.per_page--
      this.getarticlelist()
    },
    currentChange (page) {
      // 获取页码
      this.page = page
      this.getarticlelist()
    },
    // 删除数据
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$http({
          url: `/articles/${id}`,
          method: 'DELETE'
        }).then(res => {
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改文章内容 跳转到发表文章
    update (row) {
      this.$router.push(`/article/edit/${row.id}`)
    },
    // 获取频道信息
    getchannels () {
      this.$http({
        url: '/channels',
        method: 'get'
      }).then(res => {
        this.channelsList = res.channels
      })
    },
    // 筛选数据
    searchList () {
      // 点击搜索按钮显示加载页面
      this.tableloading = true
      setTimeout(() => {
        // 创建一个参数对象
      // 如果参数存在就添加到对象里
        const paramsObj = {}
        // 判断是否存在状态
        if (this.status) {
          paramsObj.status = this.status
        }
        // 判断是否存在频道
        if (this.channelID) {
          paramsObj.channe_id = this.form.channelID
        }
        // 判断是否存在时间
        if (this.dateTime !== null && this.dateTime.length !== 0) {
          paramsObj.begin_pubdate = this.dateTime[0]
          paramsObj.end_pubdate = this.dateTime[1]
        }
        this.$http({
          url: '/articles',
          method: 'get',
          params: {
            page: this.page,
            per_page: this.per_page,
            // ... 自展开
            ...paramsObj
          }
        }).then(res => {
        // 保存数据
          this.dataList = res.results
          this.total_count = res.total_count
          console.log('点击搜索按钮时显示')
          console.log(res)
          this.tableloading = false
        })
      }, 1000)
    }
  },
  created () {
    // 得到文章列表
    this.getarticlelist()
    // 得到频道数据
    this.getchannels()
  }
}
</script>
<style lang="less" scoped>
.mycard {
    margin-top: 20px;
}
.mypagination {
    text-align: center;
}
.myimg {
  width: 150px;
  height: 100px;
}
</style>
