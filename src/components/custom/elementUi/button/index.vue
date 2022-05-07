<script setup>
defineProps({
  styles: Object,
  value: String,
});
</script>

<template>
  <div class="btn" :style="{ ...styles }">
    <el-button>{{ value }}</el-button>
  </div>
</template>

<style scoped>
.btn {
  width: 100%;
  height: 100%;
}
::v-deep(.el-button) {
  width: 100%;
  height: 100%;
  color: v-bind("styles.color");
}
</style>
