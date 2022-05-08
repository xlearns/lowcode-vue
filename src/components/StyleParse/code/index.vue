<script setup>
import { ref, watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
import * as data from "@/components/custom/echarts";
let { current, currentForm } = usePanel();
let key = currentForm.value[0]["key"];

let code = JSON.stringify(current.value?.value) || JSON.stringify(data[key]);
let val = ref(code);
watch(
  () => current?.value?.value,
  () => {
    if (!current?.value) return;
    key = currentForm.value[0]["key"];
    code = JSON.stringify(current.value?.value) || JSON.stringify(data[key]);
    val.value = code;
  }
);

watch(
  () => val.value,
  () => {
    key = currentForm.value[0]["key"];
    current.value.value = JSON.parse(val.value);
  }
);
</script>

<template>
  <el-input v-model="val" type="textarea" />
</template>

<style scoped></style>
