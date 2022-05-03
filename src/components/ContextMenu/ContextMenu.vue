<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useContext } from "@/hooks/useContext";
import bus from "@/bus";
let props = defineProps({
  cutomClass: String,
  name: String,
});
let { hideMenu, showMenu, show } = useContext();
onMounted(() => {
  bus.on("add-contextmenu", (e) => {
    showMenu(e.x, e.y, e.value);
  });
  bus.on("hide-contextmenu", () => {
    hideMenu();
  });
  bus.on("item-click", () => {
    show.value = false;
  });
});
</script>
<template>
  <!-- teleport很好用可以直接apend到to指定的元素 -->
  <teleport to="body">
    <div
      class="v-contextmenu"
      ref="contextmenu"
      v-show="show && bindingValue && name === bindingValue.name"
    >
      <slot />
    </div>
  </teleport>
</template>

<style scoped>
.v-contextmenu {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  color: #444;
  display: inline-block;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
