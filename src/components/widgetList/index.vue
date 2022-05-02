<script setup>
let props = defineProps({
  list: Array,
});

let emit = defineEmits();
function onWidgetMouseDown(e, widget) {
  emit("onWidgetMouseDown", e, widget);
}
</script>

<template>
  <!-- 组件列表 -->
  <div class="widget-list">
    <div
      v-for="widget in list"
      :key="widget.type"
      class="widget"
      draggable="true"
      @mousedown="onWidgetMouseDown($event, widget)"
    >
      {{ widget.label }}
    </div>
  </div>
</template>

<style scoped>
.widget {
  width: 100%;
  height: 102px;
  background: #191b23;
  display: inline-block;
  position: relative;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  line-height: 102px;
  color: #fff;
}
</style>
