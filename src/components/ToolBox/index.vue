<script setup>
import { useToolBox } from "@/hooks/useToolBox";
let { data, click } = useToolBox();
</script>

<template>
  <div class="w-[100%] flex justify-center" @mousedown.stop>
    <el-button v-for="(item, index) in data" @click.stop="click(index)">{{
      item
    }}</el-button>
  </div>
</template>

<style scoped></style>
