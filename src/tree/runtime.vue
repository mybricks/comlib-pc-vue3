<template>
  <Tree :tree-data="treeData" :defaultExpandAll="true" show-icon>
    <template #icon="item">
      <template v-if="item.iconUrl">
        <div class="icon">
          <img :src="item.iconUrl" />
        </div>
      </template>
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
    if (!Array.isArray(ds)) {
      ds = [];
    }

    ds = ds.map(item => {
      if (item.icon) {
        item.iconUrl = item.icon;
        delete item.icon;
      }

      return item;
    })

    treeData.value = ds;
  })
});

</script>
<style scoped lang="less">
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
</style>
