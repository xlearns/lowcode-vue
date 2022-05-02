<script setup>
import * as CONFIG from "@/constants/config";
import widgetCom from "@/components/widgetList/index.vue";
import StyleSider from "@/components/styleSider/index.vue";
// 右键菜单
import ContextMenu from "@/components/contextMenu/index.vue";
import useContextMenu from "@/hooks/useContextMenu";

import { ref, markRaw, computed } from "vue";
// 组件
import comAll from "@/components/custom";

const siderType = ref("widget");
const widgetList = CONFIG.WIDGE_LIST;
let list = ref([]);
let currentId = 0;
let widgetX = 0;
let widgetY = 0;
let currentWidget = null;
// 当前组件
let current = computed(() => {
  return list.value.find((item) => item.focused);
});
// 当前组件的样式
let currentForm = computed(() => {
  return CONFIG.WIDGE_LIST.find((item) => current.value?.type === item.type)
    ?.styleForm;
});

function contextmenu(event) {
  return event.preventDefault();
}
function openContextMenu(e, item) {
  useContextMenu(e, { name: "context-menu-1" });
  onFocus(item);
}
function onWidgetMouseDown(event, widget) {
  let { offsetX, offsetY } = event;
  widgetX = offsetX;
  widgetY = offsetY;
  currentWidget = widget;
}
function LayerTop() {
  const currentItem = list.value.find((item) => item.focused);
  const maxZ = findTopLayerZ(currentItem);
  currentItem.z = maxZ + 1;
}
function findTopLayerZ(currentItem) {
  const maxZ = Math.max(...list.value.map((item) => item.z)) || 0;
  return maxZ;
}
function onDrop(event, i) {
  let { offsetX, offsetY } = event;
  let x = offsetX - widgetX;
  let y = offsetY - widgetY;
  // 放置在其他图层上时
  if (i !== undefined) {
    x += list.value[i].x;
    y += list.value[i].y;
  }
  // 关闭右键菜单

  let obj = {
    id: currentId++,
    x,
    y,
    z: 0,
    ...currentWidget,
    ...currentWidget.default,
    component: markRaw(comAll[currentWidget.component]),
  };
  list.value.push(obj);
  onFocus(obj);
}

function sortList() {
  list.value.sort((a, b) => b.z - a.z);
}
// 获取焦点
function onFocus(currentItem) {
  list.value = list.value.map((item) => {
    item.focused = item.id === currentItem.id;
    return item;
  });
}
function deleteFn() {
  list.value = list.value.filter((item) => !item.focused);
}
function contextMenuFn(type) {
  switch (type) {
    case "置顶":
      //   LayerTop();
      break;
    case "置底":
      break;
    case "上移图层":
      break;
    case "下移图层":
      break;
    case "删除":
      deleteFn();
      break;
  }
}
</script>

<template>
  <div class="home" @contextmenu="contextmenu">
    <el-tabs v-model="siderType" class="sider">
      <el-tab-pane label="图层" name="layer"></el-tab-pane>
      <el-tab-pane label="组件" name="widget">
        <!-- 组件列表 -->
        <widgetCom :list="widgetList" @onWidgetMouseDown="onWidgetMouseDown"
      /></el-tab-pane>
    </el-tabs>
    <!-- 操作面板 -->
    <div class="panel" ref="panel" @dragover.prevent @drop="onDrop">
      <Dragger
        @contextmenu="openContextMenu($event, item)"
        :w="item.w"
        :h="item.h"
        :x="item.x"
        :y="item.y"
        :z="item.z"
        :isActive="item.focused"
        v-for="(item, index) in list"
        :key="item.id"
        @clicked="onFocus(item)"
      >
        <!-- @drop.native.stop="onDrop($event, index)" -->
        <component
          class="inner-widget"
          :is="item.component"
          :value="item.value"
          :styles="item.styles"
          @drop.native.stop="onDrop($event, index)"
        />
      </Dragger>
    </div>
    <!-- 样式 -->
    <StyleSider class="sider right" :current="current" :form="currentForm" />
    <ContextMenu @contextMenuFn="contextMenuFn" />
  </div>
</template>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  .sider {
    width: 200px;
    background: #e9e9e9;
  }

  .sider.right {
    width: 320px;
  }
  .panel {
    flex: 1;
    background: #f6f6f6;
    position: relative;
  }
  .inner-widget {
    height: 100%;
    width: 100%;
  }
}
</style>
