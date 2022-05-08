<script setup>
defineProps({
  value: String,
  styles: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div :style="{ ...styles }">{{ value }}</div>
</template>

<style scoped></style>
