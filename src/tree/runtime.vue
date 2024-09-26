<template>
  <div className="tree">
    <Empty v-if="treeData.length === 0" :description="data.description || '无内容'" :image="data.image || 'http://assets.mybricks.world/files/609850921054277/Rehd917p3qxem6FFOdKq0NGG78mNQ864-1727335648897.png'" />
    <Tree 
      v-if="treeData.length !== 0" 
      :tree-data="treeData" 
      :defaultExpandAll="data.defaultExpandAll" 
      :showLine="data.showLine"
      :show-icon
      @Select="onSelect"
      :autoExpandParent="data.autoExpandParent"
      :checkable="data.checkable"
      :disabled="data.disabled"
      :draggable="data.draggable"
      >
      <template #icon="item">
        <template v-if="item.iconUrl">
          <div class="icon">
            <img :src="item.iconUrl" />
          </div>
        </template>
      </template>
    </Tree>
  </div>
</template>
<script setup>

import { ref, reactive, computed, onMounted, watch, toRef } from 'vue';
import { Empty, Tree } from 'ant-design-vue'
import 'ant-design-vue/lib/tree/style'
import { CarryOutOutlined, SmileTwoTone } from '@ant-design/icons-vue'

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style'])

const placeholderTreeData = [
  {
    title: '0(搭建态占位数据)',
    key: '0',
    iconUrl: "http://assets.mybricks.world/files/609813000904773/uMwh3xuQDcfoV4h17x69zFpuFV2ywmgO-1726798460278.png",
    children: [
      {
        title: '0-0',
        key: '0-0',
        iconUrl: "http://assets.mybricks.world/files/609813000904773/uMwh3xuQDcfoV4h17x69zFpuFV2ywmgO-1726798460278.png",
        children: [
          {
            title: '0-0-1',
            key: '0-0-1',
            iconUrl: "http://assets.mybricks.world/files/609813000904773/uMwh3xuQDcfoV4h17x69zFpuFV2ywmgO-1726798460278.png"
          },
          {
            title: '0-0-2',
            key: '0-0-2',
            iconUrl: "http://assets.mybricks.world/files/609813000904773/uMwh3xuQDcfoV4h17x69zFpuFV2ywmgO-1726798460278.png"
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        iconUrl: "http://assets.mybricks.world/files/609813000904773/uMwh3xuQDcfoV4h17x69zFpuFV2ywmgO-1726798460278.png"
      },
    ],
  }
]

const treeData = ref(props?.env?.edit ? placeholderTreeData : [])
const data = ref(props?.data)
//监听props.data,同步到ref的data（不然编辑器的变更不会实时同步到画布上）
watch(() => props.data, (newVal) => {
  data.value = newVal;
})

const env = ref(props?.env)
watch(() => props.env, (newVal) => {
  console.log("env watch",newVal)
  env.value = newVal;
})


const onSelect = (keys, { node, selected }) => {
  console.log("env",props.env)
  if(env.edit) return
  console.log("onSelect",keys,node,selected)
  props.outputs['click']({keys,node});
}

onMounted(() => {
  props.inputs['treeData'](ds => {
    if (!Array.isArray(ds)) {
      ds = [];
    }
    // 递归 ds，将 icon 字段转换为 iconUrl
    const recursive = (data) => {
      data.forEach(item => {
        if (item.icon) {
          item.iconUrl = item.icon;
          delete item.icon;
        }
        if (item.children) {
          recursive(item.children);
        }
      });
    }

    recursive(ds);
    treeData.value = ds;

    props.outputs?.['onChange'](ds)
  })
});

</script>
<style scoped lang="less">
.tree {
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: 16px;
      height: 16px;
    }
  }

  :global(.ant-empty-description) {
    text-align: center;
    font-size: 15px;
  }
}
</style>
