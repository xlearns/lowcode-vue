<script setup>
import { number } from "echarts";
const props = defineProps({
  w: number,
  h: number,
  x: number,
  y: number,
  z: number,
});
</script>

<template>
  <div
    :style="{
      width: `${w}px`,
      height: `${h}px`,
      left: `${x}px`,
      top: `${y}px`,
      zIndex: z,
    }"
    class="absolute"
  >
    <slot />
  </div>
</template>

<style scoped></style>
