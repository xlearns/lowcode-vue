<script setup>
import StyleSider from "@/components/styleSider/index.vue";
// 右键菜单
import ContextMenu from "@/components/ContextMenu/index.vue";
import useContextMenu from "@/hooks/useContextMenu";
import { ref } from "vue";
const siderType = ref("widget");
function contextmenu(event) {
  return event.preventDefault();
}
function openContextMenu(e) {
  useContextMenu(e, { name: "context-menu-1" });
}
</script>

<template>
  <div class="home" @contextmenu="contextmenu">
    <el-tabs v-model="siderType" class="sider">
      <el-tab-pane label="图层" name="layer"></el-tab-pane>
      <el-tab-pane label="组件" name="widget"></el-tab-pane>
    </el-tabs>
    <!-- 操作面板 -->
    <div class="panel" ref="panel" @contextmenu="openContextMenu"></div>
    <!-- 样式 -->
    <StyleSider class="sider right" />
    <ContextMenu />
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
}
</style>
