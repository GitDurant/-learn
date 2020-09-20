<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px"><LayoutAsider /></el-aside>
      <el-container>
        <el-header><LayoutHeader /></el-header>
        <el-main>
            <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import LayoutAsider from '@/views/layout/components/layoutAsider'
import LayoutHeader from '@/views/layout/components/layoutHeader'
export default {
  components: {
    LayoutAsider,
    LayoutHeader
  }
}
</script>
<style lang="less" scoped>
.layout {
    height: 100%;
    &>.el-container{
        height: 100%;
    }
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333
}
.el-main {
  background-color: #eee;
  color: #333
}
.el-aside {
  background-color: #aaa;
  color: #333
}
</style>
