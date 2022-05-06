<script setup>
import { ref } from "vue";
let number = ref(0);
</script>

<template>
	<el-input-number v-model="number" />
</template>

<style scoped></style>
