<script setup>
import useEcharts from "@/hooks/useEcharts";
import { useElementSize } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import data from "./config.json";
let dom = ref();
let { setOptions, resize } = useEcharts(dom);
const { width, height } = useElementSize(dom);
onMounted(() => {
  setOptions(data);
});
watch(
  () => [width.value, height.value],
  () => {
    resize();
  }
);
</script>

<template>
  <div class="dom" ref="dom"></div>
</template>

<style scoped>
.dom {
  width: 100%;
  height: 100%;
}
</style>
