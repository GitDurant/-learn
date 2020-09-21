<template>
  <div>
    <el-card class="box-card " >
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
            <el-date-picker
              label="频道列表"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card mycard">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
       </el-table>
       <el-pagination
          class="mypagination"
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      form: {
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dataList: [],
      total_count: 0
    }
  },
  methods: {
    // 打开页面时，需要去请求文章列表的数据
    getarticlelist () {
      // 这个请求如果不带 token 放回401状态码
      // 携带 token
      this.$http({
        url: 'articles',
        method: 'get',
        headers: {
          Authorization: `Bearer ${userInfo.token} `
        }
      }).then(res => {
        console.log(res)
        this.dataList = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    }
  },
  created () {
    this.getarticlelist()
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
</style>
