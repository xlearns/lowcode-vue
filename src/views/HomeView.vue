<script setup>
import * as CONFIG from "@/constants/config";
import widgetCom from "@/components/WidgetList/index.vue";
import StyleSider from "@/components/StyleSider/index.vue";
import toolBox from "@/components/ToolBox/index.vue";
// 右键菜单
import ContextMenu from "@/components/ContextMenu/index.vue";
import useContextMenu from "@/hooks/useContextMenu";
import { usePanel } from "@/hooks/usePanel";
import { ref, markRaw, onMounted, onUnmounted } from "vue";
import { useContext } from "@/hooks/useContext";
import { useStyle } from "@/hooks/useStyleSider";
// 组件
import comAll from "@/components/Custom";
import { useStorage } from "@vueuse/core";
let { bgImg } = useStyle();
let { hideMenu } = useContext();
const panel = ref();
const dom = ref();
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
  scalc,
  rootStyle,
  onBlurs,
  isMenuDown,
  onBlursAll,
  drawer,
} = usePanel();
const drawerMainButton = ref({
  one: ["全部", "统计图", "信息图"],
  two: ["折线图", "柱状图", "饼图", "散点图", "面积图"],
  three: ["环状图", "K线图", "水位图", "雷达图", "热力图"],
});
const activeNames = ref(["2"]);
const ComponentList = ["组件库"];
const siderType = ref("widget");
const widgetList = CONFIG.WIDGE_LIST;
let currentId = useStorage("currentId", 0, sessionStorage);

function openContextMenu(e, item) {
  useContextMenu(e, { name: "context-menu-1" });
  onFocus(item);
}

function onDrop(event, i) {
  hideMenu();
  let { offsetX, offsetY } = event;
  let x = offsetX - widgetX.value;
  let y = offsetY - widgetY.value;
  // 放置在其他图层上时
  if (i !== undefined) {
    x += list.value[i].x;
    y += list.value[i].y;
  }

  let obj = {
    id: currentId.value++,
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
  if (target.className == "canvasBg" || target.className == "boxBg") {
    isMenuDown.value = false;
  } else {
    isMenuDown.value = true;
  }
}

onMounted(() => {
  dom.value.addEventListener("mousedown", handleKeepActive);
});
onUnmounted(() => {
  current.value = null;
  onBlursAll();
});
</script>

<template>
  <div class="tool"><toolBox /></div>
  <div class="home" @contextmenu.stop.prevent>
    <transition name="drawer">
      <div class="drawer_space" v-if="drawer"></div>
    </transition>
    <!-- 操作面板 -->
    <div class="panel" ref="panel" @dragover.prevent @drop="onDrop">
      <el-scrollbar>
        <div class="boxBg" ref="dom">
          <div
            class="canvasBg"
            :style="{
              transform: `scale(${scalc / 100})`,
              width: `${rootStyle.width}px`,
              height: `${rootStyle.height}px`,
              backgroundImage: `url(${bgImg})`,
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
  <transition name="drawer">
    <div class="drawer" v-if="drawer">
      <div class="drawer-header">
        <div class="drawer-header-title">
          <span v-for="(item, index) in ComponentList" :key="index">
            {{ item }}
          </span>
        </div>
        <div class="drawer-header-close" @click="drawer = false">
          <el-button type="danger" icon="close" circle />
        </div>
      </div>
      <div class="drawer-main">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="系统组件" name="1" class="mb-[5px]">
          </el-collapse-item>
          <el-collapse-item title="组件库" name="2">
            <el-select
              v-model="value"
              class="m-2"
              placeholder="全部"
              size="small"
            >
            </el-select>
            <div class="drawer-main-button">
              <div
                class="drawer-main-button_item m-[5px]"
                v-for="(item, index) in drawerMainButton"
                :key="index"
              >
                <el-button size="small" plain v-for="(v, i) in item" :key="i">{{
                  v
                }}</el-button>
              </div>
            </div>
            <div class="drawer-main-container">
              <widgetCom
                :list="widgetList"
                @onWidgetMouseDown="onWidgetMouseDown"
              />
            </div>
            <el-pagination layout="prev, pager, next" :total="50" />
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
::v-deep(.el-collapse-item__header) {
  padding: 5px;
}
.drawer_space {
  width: 30%;
}
.drawer {
  position: absolute;
  left: 0;
  top: 0;
  background: #efefef;
  width: 30%;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
  &-header {
    height: 40px;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    // background: #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title {
      span {
        white-space: nowrap;
        cursor: pointer;
      }
    }
  }
  &-main {
    &-button {
      &_item {
        display: flex;
      }
    }
    &-container {
      height: 230px;
    }
  }
}
.drawer-enter-active,
.drawer-leave-active {
  transition: all 300ms ease;
}

.drawer-enter-from,
.drawer-leave-to {
  width: 0px;
}

::v-deep(.el-tabs__item) {
  color: #fff;
}
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
    .boxBg {
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
