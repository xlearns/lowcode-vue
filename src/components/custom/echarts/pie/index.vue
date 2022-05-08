<script setup>
import useEcharts from "@/hooks/useEcharts";
import { useElementSize } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
import { pie } from "./../";

const props = defineProps({
  value: Object,
  styles: {
    type: Object,
    default: {},
  },
});

let dom = ref();
let { setOptions, resize } = useEcharts(dom);
const { width, height } = useElementSize(dom);

let code = props.value || pie;

let val = ref(code);

function init() {
  if (props.value) {
    val.value = props.value;
  }
  setOptions(val.value);
}
watch(() => props.value, init);

onMounted(() => {
  init();
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
