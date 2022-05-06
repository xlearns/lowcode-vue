<script setup>
import { ref } from "vue";
let color = ref();
</script>

<template>
	<el-color-picker v-model="color" />
</template>

<style scoped></style>
