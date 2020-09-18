<template>
  <div id="Element">
    <h2>ElementUI的简单使用</h2>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
</template>

<script>
export default {
  data () {
  return {
    radio: '1'
    }
  }
}
</script>

<style>

</style>