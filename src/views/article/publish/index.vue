<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input v-model="form.content"></el-input> -->
          <quill-editor v-model="form.content" />
        </el-form-item>
        <el-form-item label="封面">
          {{ form.cover.type }}
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="3">三选</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 添加一个图片选择器 -->
          <div class="imgSelectbox" v-if="form.cover.type > 0">
            <div
              class="itemimg"
              v-for="(item, index) in form.cover.type"
              :key="index">
              <span>点击选择图片</span>
              <img @click="selectImg" class="myimg" src="./cross.jpg" alt="" />
            </div>
          </div>
          <!-- 添加弹框dialog -->
          <el-dialog title="选择封面图片" :visible.sync="imgVisible">
            <el-tabs v-model="selectName" type="card">
              <el-tab-pane label="素材库" name="first">
                <el-radio-group v-model="collectItem">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="收藏"></el-radio-button>
                  <el-row>
                    <el-col v-for="(item,index) in CollectList" :key="index">
                      <img :src="item.url" alt="">
                    </el-col>
                  </el-row>
                </el-radio-group>
              </el-tab-pane>
              <el-tab-pane label="上传图片" name="fourth">这是上传图片</el-tab-pane>
            </el-tabs>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false" >确 定</el-button>
          </el-dialog>
        </el-form-item>
        <el-form-item label="频道">
          {{ form.channel_id }}
          <ChannelList @toPublish="getValue" :mychannel="form.channel_id" />
          <!-- <el-select v-model="form.channel_id" placeholder="请选择">
            <el-option
              v-for="(item,index) in channelsList"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button @click="publish(false)" type="primary">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入频道组件ChannelList
import ChannelList from '@/components/ChannelsList'
export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        channel_id: 3,
        cover: {
          type: 1,
          images: []
        }
      },
      channelsList: [],
      radio: 1,
      editId: 0,
      // 控制弹框的显示和隐藏
      imgVisible: false,
      // 设置选中的tab
      selectName: 'first',
      // 选择是否全部&收藏
      collectItem: '全部',
      // 素材数组
      CollectList: []
    }
  },
  methods: {
    // 父子组件间的交互
    getValue (value) {
      this.form.channel_id = value
      console.log(this.form.channel_id)
    },
    // 发表按钮函数
    publish (draft) {
      //  使用if判断是否是发表文章
      if (this.$route.path.indexOf('edit') !== -1) {
        this.editArticle(draft)
      } else {
        // 说明是发表文章函数
        this.publishArticle(draft)
      }
    },
    // 发表文章逻辑函数
    publishArticle (draft) {
      this.$http({
        url: `/articles?draft=${draft}`,
        method: 'post',
        data: {
          channel_id: this.form.channel_id,
          content: this.form.content,
          cover: {
            // 图片：写死的
            type: 0,
            images: []
          },
          title: this.form.title
        }
      }).then(res => {
        console.log(res)
      })
    },
    // 修改文章的逻辑函数
    editArticle (draft) {
      this.$http({
        url: `/articles/${this.editId}?draft=${draft}`,
        method: 'put',
        data: this.form
      }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        // 修改成功后使页面跳转到内容列表
        this.$router.push('/article/list')
      })
    },
    // 获取要修改对象的ID
    getEditId () {
      this.editId = this.$route.params.id
    },
    // 根据ID获取服务器的数据并渲染到修改页面
    getEditObjByid () {
      this.$http({
        url: `/articles/${this.editId}`,
        method: 'get'
      }).then(res => {
        this.form = res
      })
    },
    selectImg () {
      this.imgVisible = true
    },
    getCollectList (collect) {
      this.$http({
        url: '/user/images',
        method: 'get',
        parame: {
          collect: 'collect'
        }
      }).then(res => {
        this.CollectList = res.results
      })
    }
  },
  created () {
    // 判断是否是编辑的页面
    if (this.$route.path.indexOf('edit') !== -1) {
      // 是编辑页面时获得修改文章的id
      this.getEditId()
      // 根据ID获得服务器的数据渲染到编辑页面
      this.getEditObjByid()
    }
    // 调用加载素材函数
    this.getCollectList()
  },
  components: {
    ChannelList
  },
  // 使用侦听器carch 侦听路由的变化从而解决bug（发表文章数据清空）
  watch: {
    $route: function () {
      console.log('哎呀，路由发生改变啦')
      if (this.$route.path.indexOf('publish') !== -1) {
        this.form = {
          title: '',
          content: '',
          channel_id: ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ql-container.ql-snow {
  height: 300px;
}
.imgSelectbox {
  display: flex;
  .itemimg {
    width: 200px;
    height: 200px;
    text-align: center;
    border: 1px solid pink;
    .myimg {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
