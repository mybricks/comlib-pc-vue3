<template>
  <Card :title="props.data.title" style="height: 100%">
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
    props.outputs['click'](props.data.text);
  }
}


onMounted(() => {

});

</script>
<style scoped>
.slotStyle {
  height: 100%;
}
</style>
