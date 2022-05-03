<script setup>
import { usePanel } from "@/hooks/usePanel";
import PreDiv from "@/components/PreDiv/index.vue";
let { list } = usePanel();
</script>

<template>
  <div class="container">
    <PreDiv
      v-for="item in list"
      :key="item.id"
      :w="item.w"
      :h="item.h"
      :x="item.x"
      :y="item.y"
      :z="item.z"
    >
      <component :is="item.component" :value="item.value" :styles="item.styles"
    /></PreDiv>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  background: url("https://api.boot.jeecg.com/bigscreen/img/bg/bg1.png")
    no-repeat left top/100%;
}
</style>
