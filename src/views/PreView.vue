<script setup>
import { usePanel } from "@/hooks/usePanel";
import { ref } from "vue";
import PreDiv from "@/components/PreDiv/index.vue";
import { useStyle } from "@/hooks/useStyleSider";
import FullScreen from "@/components/BigScreen/FullScreen/FullSreen.vue";
let { list, rootStyle } = usePanel();
let { bgImg } = useStyle();
let options = ref(rootStyle.value);
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
}
</style>
