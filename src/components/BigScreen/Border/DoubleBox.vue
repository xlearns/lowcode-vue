<template>
	<div class="btnAnimation">
		<span
			class="btnAnimation-span"
			:style="{
				background: `linear-gradient(to right, ${topColor[0]}, ${topColor[1]})`,
			}"
		></span>
		<span
			class="btnAnimation-span"
			:style="{
				background: `linear-gradient(to right, ${rightColor[0]}, ${rightColor[1]})`,
			}"
		></span>
		<span
			class="btnAnimation-span"
			:style="{
				background: `linear-gradient(to right, ${bottomColor[0]}, ${bottomColor[1]})`,
			}"
		></span>
		<span
			class="btnAnimation-span"
			:style="{
				background: `linear-gradient(to right, ${leftColor[0]}, ${leftColor[1]})`,
			}"
		></span>
		<div class="btnAnimation-box">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "DoubleBox",
	props: {
		leftColor: {
			type: Array,
			default: ["#035f3c", " #16f03a"],
		},
		rightColor: {
			type: Array,
			default: ["#035f3c", " #16f03a"],
		},
		topColor: {
			type: Array,
			default: ["#035f3c", " #16f03a"],
		},
		bottomColor: {
			type: Array,
			default: ["#035f3c", " #16f03a"],
		},
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.btnAnimation {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
}
.btnAnimation-box {
	height: 100%;
	width: 100%;
}

.btnAnimation .btnAnimation-span:nth-child(1) {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 2px;
	background: linear-gradient(to right, #035f3c, #16f03a);
	animation: animate1 2s linear infinite;
	-webkit-animation: animate1 2s linear infinite;
}

@keyframes animate1 {
	0% {
		transform: translateX(-100%);
		-webkit-transform: translateX(-100%);
		-moz-transform: translateX(-100%);
		-ms-transform: translateX(-100%);
		-o-transform: translateX(-100%);
	}
	100% {
		transform: translateX(100%);
		-webkit-transform: translateX(100%);
		-moz-transform: translateX(100%);
		-ms-transform: translateX(100%);
		-o-transform: translateX(100%);
	}
}

.btnAnimation .btnAnimation-span:nth-child(2) {
	position: absolute;
	top: 0;
	right: 0;
	width: 2px;
	height: 100%;
	background: linear-gradient(to bottom, #035f3c, #16f03a);
	animation: animate2 2s linear infinite;
	-webkit-animation: animate2 2s linear infinite;
	animation-delay: 1s;
}

@keyframes animate2 {
	0% {
		transform: translateY(-100%);
		-webkit-transform: translateY(-100%);
		-moz-transform: translateY(-100%);
		-ms-transform: translateY(-100%);
		-o-transform: translateY(-100%);
	}
	100% {
		transform: translateY(100%);
		-webkit-transform: translateX(100%);
		-moz-transform: translateX(100%);
		-ms-transform: translateX(100%);
		-o-transform: translateX(100%);
	}
}

.btnAnimation .btnAnimation-span:nth-child(3) {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 2px;
	background: linear-gradient(to left, #035f3c, #16f03a);
	animation: animate3 2s linear infinite;
	-webkit-animation: animate3 2s linear infinite;
}

@keyframes animate3 {
	0% {
		transform: translateX(100%);
		-webkit-transform: translateX(100%);
		-moz-transform: translateX(100%);
		-ms-transform: translateX(100%);
		-o-transform: translateX(100%);
	}
	100% {
		transform: translateX(-100%);
		-webkit-transform: translateX(-100%);
		-moz-transform: translateX(-100%);
		-ms-transform: translateX(-100%);
		-o-transform: translateX(-100%);
	}
}

.btnAnimation .btnAnimation-span:nth-child(4) {
	position: absolute;
	top: 0;
	left: 0;
	width: 2px;
	height: 100%;
	background: linear-gradient(to top, #035f3c, #16f03a);
	animation: animate4 2s linear infinite;
	-webkit-animation: animate4 2s linear infinite;
	animation-delay: 1s;
}

@keyframes animate4 {
	0% {
		transform: translateY(100%);
		-webkit-transform: translateY(100%);
		-moz-transform: translateY(100%);
		-ms-transform: translateY(100%);
		-o-transform: translateY(100%);
	}
	100% {
		transform: translateY(-100%);
		-webkit-transform: translateY(-100%);
		-moz-transform: translateY(-100%);
		-ms-transform: translateY(-100%);
		-o-transform: translateY(-100%);
	}
}
</style>
