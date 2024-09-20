<template>
  <div class="listRoot">
    <div v-for="(row, index) in listData">
      <slot name="item" :inputValues="{ itemData: row, index: index }" :key="`row_${index}`"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps(['data', 'inputs', 'outputs', 'slots', 'env', 'style']);

const listData = ref(props?.env?.edit ? [1, 2, 3] : []);

onMounted(() => {
  props.inputs['dataSource'](ds => {
    props.data.dataSource = ds
    listData.value = ds
  })
});

</script>

<style scoped>
.listRoot {
  min-height: 60px;
  height: inherit;
  width: inherit;
}
</style>