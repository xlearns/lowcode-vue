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
  width: 100px;
  height: 100px;
  outline: 1px solid red;
  font-size: 24px;
  text-align: center;
  line-height: 100px;
  margin: 24px;
  color: #fff;
}
</style>
