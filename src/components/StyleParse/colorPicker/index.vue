<script setup>
import { ref, watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
let { current, isMenuDown } = usePanel();
const props = defineProps({
  data: {
    type: Object,
  },
  isStyle: {
    type: Boolean,
    default: false,
  },
});
let key = props.data.key;
let init = current.value["styles"][key] || null;
let val = ref(init);

watch(
  () => val.value,
  () => {
    if (props.isStyle) {
      current.value["styles"][key] = val.value;
    } else {
      current[key] = val.value;
    }
  }
);
function md() {
  isMenuDown.value = true;
}
function change() {
  // isMenuDown.value = true;
}
</script>

<template>
  <div @mousedown.stop="md">
    <el-color-picker v-model="val" @change="change" />
  </div>
</template>

<style scoped></style>
