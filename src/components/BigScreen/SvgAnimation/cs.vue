<template>
	<div class="box">
		<svg viewBox="0 0 200 200">
			<rect
				x="0"
				y="0"
				width="200"
				height="200"
				fill="none"
				:stroke="background"
				:stroke-width="width"
			></rect>
			<rect
				class="rect"
				x="0"
				y="0"
				width="200"
				height="200"
				fill="none"
				:stroke="color"
				:stroke-width="width"
			></rect>
		</svg>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	background: {
		type: String,
		default: "#333",
	},
	color: {
		type: String,
		default: "blue",
	},
	width: {
		type: String,
		default: "3",
	},
});
</script>
<style scoped lang="scss">
.box {
	position: relative;
	.content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 3px;
		top: 0;
		left: 0;
		position: absolute;
	}
}

.rect {
	stroke-dasharray: 100 800;
	animation: identifier 5s linear infinite;
}
@keyframes identifier {
	from {
		stroke-dashoffset: 0;
	}
	to {
		stroke-dashoffset: 800;
	}
}
</style>
