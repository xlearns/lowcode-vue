<template>
	<button class="btn vb">
		<span> <slot></slot></span>
		<div class="dot"></div>
	</button>
</template>

<script lang="ts">
export default {
	name: "VButton",
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.btn {
	vertical-align: top;
	margin: 15px;
	display: inline-block;
	text-align: center;
	width: 122px;
	height: 44px;
	line-height: 44px;
	border-radius: 4px;
	color: #fff;
	cursor: pointer;
	.dot {
		content: "";
		animation: atom 2s infinite linear;
		position: absolute;
		top: 0;
		width: 32px;
		height: 100%;
		border-radius: 50%;
		transition: all 300ms ease;
		&::after {
			content: "";
			position: absolute;
			top: -6px;
			height: 5px;
			width: 5px;
			background: #fa5555;
			border-radius: 50%;
			border: 4px solid #fa5555;
			box-shadow: 0 0 0.7em #fff, 0 0 2em #fa5555;
		}
	}
}
.vb {
	position: relative;
	width: 120px;
	color: #fa5555;
	height: 40px;
	line-height: 42px;
	border: 2px solid #fa5555;
	border-radius: 14px;
	text-transform: uppercase;
}

@keyframes atom {
	0% {
		transform: translateX(0) rotate(0);
	}
	30% {
		transform: translateX(calc(122px - 36px)) rotate(0);
	}
	50% {
		transform: translateX(calc(122px - 36px)) rotate(180deg);
	}
	80% {
		transform: translateX(0) rotate(180deg);
	}
	100% {
		transform: translateX(0) rotate(360deg);
	}
}
</style>
