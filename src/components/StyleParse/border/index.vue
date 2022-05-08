<script setup>
import { ref, watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
let { current } = usePanel();

const init = current.value.styles?.border || null;

let val = ref(init);

watch(
  () => val.value,
  () => {
    current.value["styles"]["border"] = val;
  }
);
</script>

<template>
  <el-input v-model="val" placeholder="1px solid red"></el-input>
</template>

<style scoped></style>
