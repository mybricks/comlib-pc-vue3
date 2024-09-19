<template>
    <el-tabs v-model="activeKey" :type="props.data.type" :tabPosition="props.data.tabPosition" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane class="slotStyle" v-for="(tab, index) in props.data.tabList" :label="tab.name" :name="tab.id" :key="tab.key">
        <slot :name="tab.id" :inputValues="{ itemData: tab, index: index }">
        </slot>
      </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineComponent, watch } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style'])
const activeKey = ref(props.data.defaultActiveKey);


onMounted(() => {
  console.log("props.data.tabList",props.data.tabList)
});

const handleClick = (tab: any, event: Event) => {
  console.log(tab, event);
  props.outputs["tabClick"]({
    name:tab.props.name,
    index:tab.index,
  })
};

</script>

<style>
.demo-tabs{
  height: 100%;
}

.slotStyle{
  height: 100%;
}

.demo-tabs>.el-tabs__content {
  padding: 0px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>