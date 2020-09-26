<template>
  <el-card>
    <el-table :data="commentList" stripe style="width: 100%">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="comment_status" label="评论状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.comment_status === true">启用</el-tag>
          <el-tag v-if="scope.row.comment_status === false" type="warning">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"> </el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"> </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope" >
            <el-button @click="isCloseComment(scope.row)" type="text">
                {{scope.row.comment_status ? '关闭评论': '开启评论' }}
            </el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      commentList: []
    }
  },
  methods: {
    getcommentList () {
      this.$http({
        url: '/articles',
        method: 'get',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        this.commentList = res.results
      })
    },
    // 开启/关闭评论
    isCloseComment (row) {
      this.$http({
        url: `/comments/status?article_id=${row.id}`,
        method: 'PUT',
        data: {
          // 将状态取反：如果状态为开启，就关闭。反之则开启
          allow_comment: !row.comment_status
        }
      }).then(res => {
        // 重新 刷新页面
        this.getcommentList()
        // 提示信息
        this.$message({
          message: res.allow_comment ? '关闭成功' : '开启成功',
          type: 'success'
        })
      })
    }
  },
  created () {
    // 页面加载显示
    this.getcommentList()
  }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
}
</style>
