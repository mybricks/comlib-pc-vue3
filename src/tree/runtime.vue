<template>
  <Tree :tree-data="treeData" :defaultExpandAll="true" :show-icon="true">
    <template v-slot:icon="{ icon, selected }">
      <!-- <template v-if="icon">
        <img :src="icon" alt="" style="width: 16px; height: 16px;">
      </template> -->
    </template>
  </Tree>
</template>
<script setup>

import { ref, reactive, computed, onMounted } from 'vue';
import { Tree } from 'ant-design-vue'
import 'ant-design-vue/lib/tree/style'
import { CarryOutOutlined, SmileTwoTone } from '@ant-design/icons-vue'

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style'])

const placeholderTreeData = [
  {
    title: '0(搭建态占位数据)',
    key: '0',
    children: [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-1',
            key: '0-0-1',
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
      },
    ],
  }
]
const treeData = ref(props?.env?.edit ? placeholderTreeData : [])



onMounted(() => {
  props.inputs['treeData'](ds => {
    treeData.value = ds
  })
});

</script>
<style scoped>
:global(.ant-btn) {
  width: 100%;
  height: 100%;
}

/* .button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1677ff;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid #1677ff;
  width: 100%;
  height: 100%;
} */
</style>
