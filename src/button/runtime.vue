<template>
  <Button class="button" @click="onClick">{{ props.data.text }}</Button>
</template>
<script setup>

import { ref, reactive, computed, onMounted } from 'vue';
import { Button } from 'ant-design-vue'
defineOptions({
  inheritAttrs: false,
});

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style'])

const onClick = () => {
  if (props.env.runtime) { // 运行态下才触发输出
    props.outputs['click'](props.data.text);
  }
}


onMounted(() => {

});

</script>
<style scoped>
.button {
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
}
</style>
