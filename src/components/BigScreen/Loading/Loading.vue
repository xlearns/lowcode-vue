<template>
	<div class="vdata-loading">
		<svg :width="width" :height="height" viewBox="0 0 50 50">
			<!-- 
				2*3.14*22
				stroke-dasharray="34 34" 切等比例4块 2*3.14*22/4
				stroke-linecap="round" 圆角
				 -->
			<circle
				cx="25"
				cy="25"
				r="22"
				fill="none"
				:stroke="insideColor"
				stroke-width="3"
				stroke-dasharray="34 34"
				stroke-linecap="round"
			>
				<!-- 过渡动画 -->
				<!-- from(度数,圆心坐标.x,圆心坐标.y) -->
				<!-- from='' to=''可以用values='a,b,c;a,b,c'替换 -->
				<animateTransform
					attributeName="transform"
					type="rotate"
					from="0 25 25"
					to="360 25 25"
					dur="1.5s"
					repeatCount="indefinite"
				></animateTransform>
				<animate
					attributeName="stroke"
					:values="outsideColorAimation"
					dur="3s"
					repeatCount="indefinite"
				></animate>
			</circle>

			<circle
				cx="25"
				cy="25"
				r="12"
				fill="none"
				:stroke="outsideColor"
				stroke-width="3"
				stroke-linecap="round"
				stroke-dasharray="19 19"
			>
				<animateTransform
					attributeName="transform"
					type="rotate"
					values="360 25 25;0 25 25"
					dur="1.5s"
					repeatCount="indefinite"
				></animateTransform>

				<animate
					attributeName="stroke"
					:values="insideColorAimation"
					dur="3s"
					repeatCount="indefinite"
				></animate>
			</circle>
		</svg>
		<div class="vdata-loading-content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { computed } from "vue";

export default {
	name: "VLoading",
	props: {
		width: {
			type: [Number, String],
			default: 50,
		},
		height: {
			type: [Number, String],
			default: 50,
		},
		outsideColor: {
			type: String,
			default: "#3be6cb",
		},
		insideColor: {
			type: String,
			default: "#02bcfe",
		},
	},
	setup(props) {
		const outsideColorAimation = computed(
			() => `${props.outsideColor};${props.insideColor};${props.outsideColor}`
		);
		const insideColorAimation = computed(
			() => `${props.insideColor};${props.outsideColor};${props.insideColor}`
		);
		return {
			outsideColorAimation,
			insideColorAimation,
		};
	},
};
</script>

<style scoped>
.vdata-loading {
	text-align: center;
}
</style>
