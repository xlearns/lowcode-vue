<script setup>
import * as CONFIG from "@/constants/config";
import widgetCom from "@/components/widgetList/index.vue";
import StyleSider from "@/components/styleSider/index.vue";
// 右键菜单
import ContextMenu from "@/components/contextMenu/index.vue";
import useContextMenu from "@/hooks/useContextMenu";
import { usePanel } from "@/hooks/usePanel";
import { ref, markRaw, onMounted, onUnmounted } from "vue";
// 组件
import comAll from "@/components/custom";
const panel = ref();
const {
  onWidgetMouseDown,
  onFocus,
  current,
  list,
  onWidgetDrag,
  layerUp,
  layerDn,
  deleteFn,
  layerTop,
  layerBottom,
  widgetX,
  widgetY,
  currentWidget,
  contextmenu,
  scalc,
  rootStyle,
  onBlurs,
  isMenuDown,
} = usePanel();

const siderType = ref("widget");
const widgetList = CONFIG.WIDGE_LIST;
let currentId = 0;

function openContextMenu(e, item) {
  useContextMenu(e, { name: "context-menu-1" });
  onFocus(item);
}

function onDrop(event, i) {
  let { offsetX, offsetY } = event;
  let x = offsetX - widgetX.value;
  let y = offsetY - widgetY.value;
  // 放置在其他图层上时
  if (i !== undefined) {
    x += list.value[i].x;
    y += list.value[i].y;
  }

  let obj = {
    id: currentId++,
    x,
    y,
    z: !list.value.length
      ? 0
      : Math.max(...list.value.map((item) => item.z)) + 1,
    ...currentWidget.value,
    ...currentWidget.value.default,
    component: markRaw(comAll[currentWidget.value.component]),
  };
  list.value.push(obj);
  onFocus(obj);
}

function contextMenuFn(type) {
  switch (type) {
    case "置顶":
      layerTop();
      break;
    case "置底":
      layerBottom();
      break;
    case "上移图层":
      layerUp();
      break;
    case "下移图层":
      layerDn();
      break;
    case "删除":
      deleteFn();
      break;
  }
}

function onResizing(e) {
  let { width, height } = e;
  current.value.w = width;
  current.value.h = height;
}
function handleKeepActive(e) {
  const target = e.target || e.srcElement;
  if (target.className == "canvasBg") {
    isMenuDown.value = false;
  } else {
    isMenuDown.value = true;
  }
}

onMounted(() => {
  document.documentElement.addEventListener("mousedown", handleKeepActive);
});
onUnmounted(() => {
  document.documentElement.removeEventListener("mousedown", handleKeepActive);
});
</script>

<template>
  <div class="tool">工具栏</div>
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
      <el-scrollbar>
        <div class="box">
          <div
            class="canvasBg"
            :style="{
              transform: `scale(${scalc / 100})`,
              width: `${rootStyle.width}px`,
              height: `${rootStyle.height}px`,
            }"
          >
            <Dragger
              :w="item.w"
              :h="item.h"
              :x="item.x"
              :y="item.y"
              :z="item.z"
              :isActive="item.focused"
              @dragging="(info) => onWidgetDrag(info, item.id)"
              v-for="(item, index) in list"
              :key="item.id"
              @clicked="onFocus(item)"
              @contextmenu="openContextMenu($event, item)"
              @resizing="onResizing"
              @deactivated="onBlurs(item)"
            >
              <div v-show="item.focused">
                <div class="line-top"></div>
                <div class="coords">{{ item.x }},{{ item.y }}</div>
                <div class="line-left"></div>
              </div>
              <component
                class="inner-widget"
                :is="item.component"
                :value="item.value"
                :styles="item.styles"
                @drop.native.stop="onDrop($event, index)"
              />
            </Dragger>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <!-- 样式 -->
    <StyleSider class="sider right" />
    <ContextMenu @contextMenuFn="contextMenuFn" />
  </div>
</template>
<style scoped lang="scss">
.tool {
  background: #212c3d;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: #fff;
  border-bottom: 2px solid rgb(0, 0, 0);
  display: flex;
  box-sizing: border-box;
}
.home {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  .sider {
    width: 200px;
    background: #212c3d;
  }

  .sider.right {
    width: 320px;
  }
  .panel {
    flex: 1 1 0%;
    overflow: hidden;
    position: relative;
    .box {
      position: relative;
      height: 3000px;
      width: 5000px;
      background: url(https://img.alicdn.com/tfs/TB184VLcPfguuRjSspkXXXchpXa-14-14.png)
        repeat;
      .canvasBg {
        transform-origin: 0 0;
        // width: 1920px;
        // height: 1160px;
        background-image: url("https://api.boot.jeecg.com/bigscreen/img/bg/bg1.png");
        background-position: 0% 0%;
        background-size: 100% 100%;
        background-repeat: initial;
        background-attachment: initial;
        background-origin: initial;
        background-clip: initial;
      }
    }
  }
  .inner-widget {
    height: 100%;
    width: 100%;
  }
  .coords {
    position: absolute;
    left: -68px;
    top: -25px;
    color: #09f;
  }
  .line-top {
    position: absolute;
    border-left: 1px dashed #09f;
    width: 0;
    height: 10000px;
    left: 0;
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  .line-left {
    position: absolute;
    border-top: 1px dashed #09f;
    width: 10000px;
    height: 0;
    top: 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
</style>
