<template>
  <el-select @change="optionChange" :value="mychannel" placeholder="请选择">
    <el-option
      v-for="(item, index) in channelsList"
      :key="index"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      form: {
        channelID: ''
      },
      channelsList: []
    }
  },
  props: ['mychannel'],
  methods: {
    getchannelList () {
      this.$http({
        url: 'channels',
        method: 'get'
      }).then(res => {
        this.channelsList = res.channels
      })
    },
    // 当频道改变时给父组件publish传参
    optionChange (value) {
      this.$emit('toPublish', value)
    }
  },
  created () {
    this.getchannelList()
  }
}
</script>

<style></style>
