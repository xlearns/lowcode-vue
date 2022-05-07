<script setup>
import { ref } from "vue";
import { usePanel } from "@/hooks/usePanel";
let { current } = usePanel();
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
</script>

<template>
  <el-input-number v-if="isStyle" v-model="current['styles'][key]" />
  <el-input-number v-else v-model="current[key]" />
</template>

<style scoped></style>
