<template>
  <Card class="mybricks-card" :title="123123"  @click="onClick">
    <div class="slotStyle">
      <slot name="body"></slot>
    </div>
  </Card>
</template>
<script setup>

import { ref, reactive, computed, onMounted } from 'vue';
import { Card } from 'ant-design-vue'
import 'ant-design-vue/lib/card/style'

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style'])

const onClick = () => {
  if (props.env.runtime) { // 运行态下才触发输出
    props.outputs?.['click'](props.data.title);
  }
}

onMounted(() => {

});

</script>
<style scoped>
.mybricks-card {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.ant-card-body {
  flex: 1
}

.slotStyle {
  height: 100%;
}
</style>
