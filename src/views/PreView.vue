<script setup>
import { usePanel } from "@/hooks/usePanel";
import { onMounted, onUnmounted, ref } from "vue";
import PreDiv from "@/components/PreDiv/index.vue";
import { useStyle } from "@/hooks/useStyleSider";
import FullScreen from "@/components/BigScreen/FullScreen/FullSreen.vue";
import router from "@/router";
import { ElMessage } from "element-plus";
let { list, rootStyle } = usePanel();
let { bgImg } = useStyle();
let options = ref(rootStyle.value);

function goback(e) {
  let { key } = e;
  router.push("/");
}
onMounted(() => {
  ElMessage.success("按任意键返回");
  window.addEventListener("keydown", goback);
});
onUnmounted(() => {
  window.removeEventListener("keydown", goback);
});
</script>

<template>
  <FullScreen :options="options">
    <div class="containerBox" :style="{ backgroundImage: `url(${bgImg})` }">
      <PreDiv
        v-for="item in list"
        :key="item.id"
        :w="item.w"
        :h="item.h"
        :x="item.x"
        :y="item.y"
        :z="item.z"
      >
        <component
          :is="item.component"
          :value="item.value"
          :styles="item.styles"
      /></PreDiv>
    </div>
  </FullScreen>
</template>

<style scoped>
.containerBox {
  position: relative;
  height: 100%;
  width: 100%;
  background: no-repeat left top;
  background-size: cover;
  z-index: -9999;
}
</style>
