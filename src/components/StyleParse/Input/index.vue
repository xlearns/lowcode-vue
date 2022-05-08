<script setup>
import { ref } from "vue";
import { usePanel } from "@/hooks/usePanel";
let { current } = usePanel();
const props = defineProps({
  data: {
    type: Object,
  },
});
let key = props.data.key;
</script>

<template>
  <el-input v-model="current[key]" />
</template>

<style scoped></style>
