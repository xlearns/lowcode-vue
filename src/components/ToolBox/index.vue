<script setup>
import { useToolBox } from "@/hooks/useToolBox";
let { data, click } = useToolBox();
</script>

<template>
  <div class="w-[100%] flex justify-center">
    <el-button v-for="(item, index) in data" @click="click(index)">{{
      item
    }}</el-button>
  </div>
</template>

<style scoped></style>
