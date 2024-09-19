<template>
  <div v-if="!data?.asHotarea" class="button" @click="onClick" @dblClick="onDoubleClick">{{ data?.text }}</div>
  <div v-else :class="hotareaCx" @click="onClick" @dblClick="onDoubleClick"></div>
</template>
<script>

export default {
  props: ["inputs", "env", "data"], 
  data() {
    return {
      list: []
    }
  },
  created() {
    // 监听输入事件
    this.inputs['setText']((value) => {
      this.data.text = value;
    });
  },
  computed: {
    hotareaCx() {
      return {
        'hotarea': true,
        'edit': !!this.env.edit // 编辑态下显示热区
      }
    }
  },
  methods: {
    onClick() {
      if (this.env.runtime) { // 运行态下才触发输出
        this.outputs['click'](this.data.text);
      }
    },
    onDoubleClick() {
      if (this.env.runtime) {
        this.outputs['dblClick'](this.data.text);
      }
    }
  }
}

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
}

.hotarea {
  width: 100%;
  height: 100%;
  
}

.hotarea.edit {
  border: 1px dashed #ccc;
}
</style>
