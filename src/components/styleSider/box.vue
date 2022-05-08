<script setup>
import { ref } from "vue";
let props = defineProps({
	title: String,
	open: {
		type: Boolean,
		default: false,
	},
	isPadding: {
		type: Boolean,
		default: false,
	},
});
let state = ref(props.open);
</script>

<template>
	<div class="title flex justify-between" @click="state = !state">
		<span>{{ title }}</span>
		<el-icon><arrow-down v-if="!state" /><arrow-up v-else /></el-icon>
	</div>
	<div v-if="state" :class="{ boxItem: isPadding }">
		<slot />
	</div>
</template>

<style scoped>
.boxItem {
	padding: 5px;
}
</style>
