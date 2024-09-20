<template>
    <Card class="mybricks-card" :title="props.data.showTitle ? props.data.cardTitle : ''">
      <slot name="body"></slot>
    </Card>
</template>
<script setup>

import { ref, reactive, computed, onMounted } from 'vue';
import { Card } from 'ant-design-vue'
import 'ant-design-vue/lib/card/style'

defineOptions({
  inheritAttrs: false,
});

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style'])

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
