<script setup>
import { ref, watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
let { current, list } = usePanel();
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
let init = parseInt(current.value["styles"][key]) || 0;
let val = ref(init);

watch(
	() => val.value,
	() => {
		if (props.isStyle) {
			current.value["styles"][key] = val.value + "px";
		} else {
			current[key] = val.value;
		}
	}
);
</script>

<template>
	<el-input-number v-model="val" />
</template>

<style scoped></style>
