<template>
	<div class="test" ref="dom">
		<div
			class="main"
			:style="{
				transform: modelValue ? active : leave,
				transition: transition,
				transformOrigin: transformOrigin,
			}"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { ref, watch } from "vue";
export default {
	name: "vReverse",
	props: {
		modelValue: {
			type: Boolean,
		},
		active: {
			type: String,
			default: "rotateX(75deg)",
		},
		leave: {
			type: String,
			default: "rotateX(0deg)",
		},
		transition: {
			type: String,
			default: "all 0.4s",
		},
		transformOrigin: {
			type: String,
			default: "161px 100%",
		},
	},
	setup() {
		let dom = ref();
		return {
			dom,
		};
	},
};
</script>

<style lang="scss" scoped>
.test {
	perspective: 800px;
}
</style>
