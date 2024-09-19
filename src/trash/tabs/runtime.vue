<template>
  <div class="listRoot">
    <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTabs,ElTabPane } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

</script>

<style>
.listRoot {
  min-height: 60px;
  height: inherit;
  width: inherit;
}

.hor {
  display: inline-flex;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>