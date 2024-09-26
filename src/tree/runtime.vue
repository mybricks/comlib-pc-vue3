<template>
  <div className="tree">
    <!-- 空状态 -->
    <template v-if="treeData.length === 0">
      <Empty v-bind="placeholder" />
    </template>

    <!-- 非空状态 -->
    <template v-if="treeData.length !== 0">
      <Tree :tree-data="treeData" :defaultExpandAll="props.data.defaultExpandAll" :showIcon="props.data.showIcon"
        :showLine="props.data.showLine" :selectable="props.data.selectable" @select="onSelect"
        :fieldNames="props.data.fieldNames">
        <template #icon="item">
          <template v-if="item.iconUrl">
            <div class="icon">
              <img :src="item.iconUrl" />
            </div>
          </template>
        </template>
      </Tree>
    </template>
  </div>
</template>
<script setup>

import { ref, reactive, computed, onMounted, watch, toRef } from 'vue';
import { Empty, Tree } from 'ant-design-vue'
import 'ant-design-vue/lib/tree/style'
import { mockTreeData } from './mock.ts';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env']);

// value 
const treeData = ref(props.env.edit ? mockTreeData : []);

// computed
const placeholder = computed(() => {
  let result = {};

  if (props.data.placeholder.description) {
    result.description = props.data.placeholder.description;
  }

  if (props.data.placeholder.image) {
    result.image = props.data.placeholder.image;
  }

  return result;
});


onMounted(() => {
  // 输入数据
  props.inputs['treeData'](val => {
    if (!Array.isArray(val)) {
      val = [];
    }
    // 递归 val，将 icon 字段转换为 iconUrl
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

    recursive(val);

    treeData.value = val;
  })
});

const onSelect = (keys, { node, selected }) => {
  if (props.env.edit) {
    return;
  }

  if (!props.data.selectable) {
    return;
  }

  props.outputs['onSelect'](keys);
}


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
