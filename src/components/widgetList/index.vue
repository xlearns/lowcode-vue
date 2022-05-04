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
      class="widget m-[5px]"
      draggable="true"
      :style="{ backgroundImage: `url(${widget.url})` }"
      @mousedown="onWidgetMouseDown($event, widget)"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.widget-list {
  display: flex;
  // justify-content: space-between;
  .widget {
    width: 25%;
    height: 50px;
    background: no-repeat center center/100%;
  }
}
</style>
