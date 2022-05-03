<script setup>
import { usePanel } from "@/hooks/usePanel";
import { ref } from "vue";
import PreDiv from "@/components/PreDiv/index.vue";
import FullScreen from "@/components/BigScreen/FullScreen/FullSreen.vue";
let { list, rootStyle } = usePanel();

let options = ref(rootStyle.value);
</script>

<template>
  <FullScreen :options="options">
    <div class="containerBox">
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
  background: url("https://api.boot.jeecg.com/bigscreen/img/bg/bg1.png")
    no-repeat left top;
  background-size: cover;
}
</style>
