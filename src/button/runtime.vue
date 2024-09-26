<template>
  <Button :type="props.data.type" :size="props.data.size" @click="onClick">{{ text }}</Button>
</template>
<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue';
import { Button } from 'ant-design-vue'
import 'ant-design-vue/lib/button/style'
defineOptions({
  inheritAttrs: false,
});

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style'])

const text = ref(props.data.text)

watch(() => props.data.text, (newVal) => {
  text.value = newVal;
})

const onClick = () => {
  if (props.env.runtime) { // 运行态下才触发输出
    props.outputs['click'](props.data.text);
  }
}


onMounted(() => {
  props.inputs['setText']((data)=>{
    text.value = data;
  });
});

</script>
<style scoped>
:global(.ant-btn) {
  width: 100%;
  height: 100%;
}
</style>
