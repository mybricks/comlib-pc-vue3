<template>
  <Tree></Tree>
</template>
<script setup>

import { ref, reactive, computed, onMounted } from 'vue';
import { Tree } from 'ant-design-vue'
import 'ant-design-vue/lib/tree/style'

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style'])



onMounted(() => {

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
