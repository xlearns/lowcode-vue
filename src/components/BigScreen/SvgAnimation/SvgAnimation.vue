<template>
	<div>
		<div class="contatiner">
			<svg width="500" height="200" viewBox="0 0 500 200">
				<rect
					x="0"
					y="0"
					width="100"
					height="50"
					fill="red"
					transform="translate(0,0) rotate(30)"
				></rect>
			</svg>
		</div>
		<div class="contatiner">
			<svg
				width="500"
				height="500"
				viewBox="0 0 200 200"
				transform="rotate(270)"
			>
				<!-- 底 -->
				<circle
					cx="100"
					cy="100"
					r="90"
					stroke-width="10"
					stroke="#d1d3d7"
					fill="none"
				></circle>
				<!-- 实际 -->
				<!-- 周长：2*PI*R -->
				<!-- 2*3.14*90 = 566-->
				<!--  -->
				<circle
					class="circle-ring"
					cx="100"
					cy="100"
					r="90"
					stroke-width="10"
					stroke="#00a5e0"
					fill="none"
				></circle>
			</svg>
		</div>
		<div class="contatiner">
			<!-- 矩形周长：4r-->
			<svg width="500px" height="500px" viewBox="0 0 200 200">
				<!-- 底 -->
				<rect
					x="0"
					y="0"
					width="200"
					height="200"
					fill="none"
					stroke="#d1d3d7"
					stroke-width="10"
				></rect>
				<rect
					class="rectRing"
					x="0"
					y="0"
					width="200"
					height="200"
					fill="none"
					stroke="#00a5e0"
					stroke-width="10"
				></rect>
			</svg>
		</div>

		<div class="contatiner">
			<!-- 描边 -->
			<svg viewBox="0 0 1024 1024">
				<path
					class="logo"
					d="M850.346667 155.008a42.666667 42.666667 0 0 0-22.741334-23.509333c-8.704-3.754667-85.717333-33.322667-200.32 39.168H396.714667c-114.773333-72.618667-191.701333-42.922667-200.32-39.168a42.88 42.88 0 0 0-22.741334 23.466666c-26.197333 66.218667-18.048 136.448-7.850666 176.896C134.272 374.016 128 413.098667 128 469.333333c0 177.877333 127.104 227.882667 226.730667 246.272a189.568 189.568 0 0 0-13.013334 46.549334A44.373333 44.373333 0 0 0 341.333333 768v38.613333c-19.498667-4.138667-41.002667-11.946667-55.168-26.112C238.08 732.416 188.330667 682.666667 128 682.666667v85.333333c25.002667 0 65.365333 40.362667 97.834667 72.832 51.029333 51.029333 129.066667 55.253333 153.386666 55.253333 3.114667 0 5.376-0.085333 6.528-0.128A42.666667 42.666667 0 0 0 426.666667 853.333333v-82.090666c4.266667-24.746667 20.224-49.621333 27.946666-56.362667a42.666667 42.666667 0 0 0-23.125333-74.581333C293.333333 624.554667 213.333333 591.488 213.333333 469.333333c0-53.12 5.632-70.741333 31.573334-99.285333 11.008-12.117333 14.08-29.568 7.978666-44.8-4.821333-11.904-18.773333-65.450667-6.485333-117.546667 20.650667-1.578667 59.904 4.565333 113.706667 40.96C367.104 253.44 375.466667 256 384 256h256a42.666667 42.666667 0 0 0 23.936-7.338667c54.016-36.522667 92.970667-41.770667 113.664-41.130666 12.330667 52.224-1.578667 105.770667-6.4 117.674666a42.666667 42.666667 0 0 0 8.021333 44.928C805.077333 398.464 810.666667 416.085333 810.666667 469.333333c0 122.581333-79.957333 155.52-218.069334 170.922667a42.666667 42.666667 0 0 0-23.125333 74.709333c19.797333 17.066667 27.861333 32.469333 27.861333 53.034667v128h85.333334v-128c0-20.437333-3.925333-38.101333-9.770667-53.12C769.92 695.765333 896 643.712 896 469.333333c0-56.362667-6.272-95.530667-37.76-137.514666 10.197333-40.405333 18.261333-110.506667-7.893333-176.810667z"
					fill=""
					p-id="3769"
				></path>
			</svg>
		</div>

		<div class="contatiner">
			<!-- 矩形周长：4r-->
			<svg width="500px" height="500px" viewBox="0 0 200 200">
				<!-- 底 -->
				<rect
					x="0"
					y="0"
					width="200"
					height="200"
					fill="none"
					stroke="#d1d3d7"
					stroke-width="10"
				></rect>
				<rect
					class="rectRingFly"
					x="0"
					y="0"
					width="200"
					height="200"
					fill="none"
					stroke="#00a5e0"
					stroke-width="10"
				></rect>
			</svg>
		</div>

		<!-- set -->
		<div class="contatiner">
			<svg width="200px" height="200px">
				<!-- set 延迟设置不会补间-->
				<rect x="0" y="0" fill="red" width="100" height="50">
					<set attributeName="x" to="10" begin="1s"></set>
					<set attributeName="x" to="20" begin="2s"></set>
					<set attributeName="x" to="30" begin="3s"></set>
					<set attributeName="fill" to="blue" begin="4s"></set>
				</rect>
			</svg>
		</div>
		<!-- animate -->
		<div class="contatiner">
			<svg width="200px" height="200px">
				<!-- animate 延迟设置不会补间-->
				<!-- <rect x="0" y="0" fill="blue" width="100" height="50"></rect> -->
				<circle
					cx="0"
					cy="0"
					r="30"
					fill="blue"
					stroke="black"
					stroke-width="1"
				>
					<animate
						repeatCount="1"
						attributeName="cx"
						attributeType="XML"
						from="0"
						to="100"
						dur="2s"
						fill="freeze"
					></animate>

					<animate
						repeatCount="1"
						attributeName="cy"
						attributeType="XML"
						from="0"
						to="100"
						dur="2s"
						fill="freeze"
					></animate>

					<animateTransform
						attributeName="transform"
						attributeType="XML"
						begin="0"
						dur="3s"
						type="scale"
						from="1"
						to="4"
						fill="freeze"
						repeatCount="1"
					></animateTransform>
				</circle>
			</svg>
		</div>

		<!-- 路径运动 -->

		<div class="contatiner">
			<!-- 矩形周长：4r-->
			<svg width="500px" height="500px" viewBox="0 0 200 200">
				<!-- 运动的矩形 -->
				<rect x="0" y="0" width="10" height="10" fill="red">
					<animateMotion
						path="M10 10 L110 10 L110 110 L10 110 Z"
						dur="5s"
						rotate="0"
						repeatCount="indefinite"
					></animateMotion>
				</rect>

				<path
					d="M10 10 L110 10 L110 110 L10 110 Z"
					fill="none"
					stroke="black"
					stroke-width="3"
				></path>
			</svg>
		</div>

		<!-- 翻转效果 -->
		<div class="contatiner">
			<!-- 矩形周长：4r-->
			<svg width="500px" height="500px" viewBox="0 0 200 200">
				<!-- 运动的矩形 -->
				<rect x="0" y="0" width="10" height="10" fill="red">
					<animateMotion
						id="forward-rect"
						path="M10 10 L110 10 L110 110 L10 110"
						dur="2s"
						rotate="0"
						fill="freeze"
						begin="0;backward-rect.end+0.5"
					></animateMotion>
					<animateMotion
						id="backward-rect"
						path="M10 110 L110 110 L110 10 L10 10 "
						dur="2s"
						rotate="0"
						fill="freeze"
						begin="forward-rect.end + 0.5s"
					></animateMotion>
				</rect>

				<path
					d="M10 10 L110 10 L110 110 L10 110"
					fill="none"
					stroke="black"
					stroke-width="1"
				></path>
			</svg>
		</div>
	</div>
</template>
<script>
import { onMounted } from "vue";

// 配合iconfont symbol
export default {
	name: "SvgAnimation",
	props: {
		name: String,
		style: Object,
		prefix: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		onMounted(() => {
			let logo = document.querySelector(".logo");
			console.log(logo.getTotalLength());
		});
	},
};
</script>
<style lang="scss" scoped>
.contatiner {
	svg {
		border: 1px solid #000;
	}
}
.circle-ring {
	stroke-dasharray: 566 566;
	animation: circle-ring 5s linear infinite;
}

@keyframes circle-ring {
	from {
		stroke-dasharray: 0 566;
	}
	to {
		stroke-dasharray: 566 566;
	}
}

.rectRing {
	stroke-dasharray: 800 800;
	animation: circle-ring 5s linear infinite;
}

@keyframes circle-ring {
	from {
		stroke-dasharray: 0 800;
	}
	to {
		stroke-dasharray: 800 800;
	}
}

.logo {
	fill: none;
	stroke: #333;
	stroke-width: 5;
	animation: logoAnimation 10s linear forwards;
}
@keyframes logoAnimation {
	0% {
		stroke-dasharray: 5430;
		stroke-dashoffset: 5430;
	}
	50% {
		stroke-dasharray: 5430;
		fill: none;
		stroke-dashoffset: 0;
	}
	75% {
		fill: red;
	}
	100% {
		fill: blue;
	}
}

.rectRingFly {
	stroke-dasharray: 100 800;
	animation: rectRingFly 5s linear infinite;
}
@keyframes rectRingFly {
	from {
		stroke-dashoffset: 800;
	}
	to {
		stroke-dashoffset: 0;
	}
}
</style>
