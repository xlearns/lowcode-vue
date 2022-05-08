<template>
	<div class="vdata-border-flybox" ref="flybox">
		<svg :width="width" :height="height">
			<defs>
				<path :id="borderid" fill="none" :d="path" />
				<radialGradient
					:id="radialGradientId"
					r="50%"
					cx="50%"
					cy="50%"
					fx="100%"
					fy="50%"
				>
					<stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
					<stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
				</radialGradient>
				<mask :id="maskid">
					<circle
						:r="starLength"
						cx="0"
						cy="0"
						:fill="`url(#${radialGradientId})`"
					>
						<animateMotion
							:path="path"
							:dur="dur"
							repeatCount="indefinite"
							rotate="auto"
						></animateMotion>
					</circle>
				</mask>
			</defs>
			<!-- 背景 -->
			<use :href="`#${borderid}`" stroke-width="1" :stroke="lineColor"></use>
			<!-- 实际 -->
			<use
				:href="`#${borderid}`"
				stroke-width="3"
				:stroke="starColor"
				:mask="`url(#${maskid})`"
			></use>
		</svg>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { computed, nextTick, onMounted, ref,watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useElementSize } from "@vueuse/core";
export default {
	name: "VFlyBox",
	props: {
		duration: {
			type: [Number, String],
			default: 3,
		},
		lineColor: {
			type: String,
			default: "#235fa7",
		},
		starColor: {
			type: String,
			default: "#4fd2dd",
		},
		starLength: {
			type: [Number, String],
			default: 50,
		},
	},
	setup(props) {
		const uuid = uuidv4();
		// svg适配需要动态获取dom，然后根据dom去计算path
		const width = ref(0);
		const height = ref(0);
		const flybox = ref();
		const {width:w,height:h} = useElementSize(flybox)
    watch(()=>[w.value,h.value],()=>{
			init()
		})

		const borderid = `borderid-${uuid}`;
		const maskid = `mask-${uuid}`
		const radialGradientId = `radialGradient-${uuid}`
		const path = computed(
			() =>
				`M5 5 L${width.value - 5} 5 L${width.value - 5} ${
					height.value - 5
				} L5 ${height.value - 5} Z`
		);
		const dur = computed(() => `${props.duration}s`);


		const init = function () {
			nextTick(()=>{
			 let dom = flybox.value;
		   width.value = dom.clientWidth;
			 height.value = dom.clientHeight;
			})
		};

		onMounted(() => {
			init();
		});
		return {
			radialGradientId,
			maskid,
			borderid,
			dur,
			flybox,
			width,
			height,
			path,
		};
	},
};
</script>

<style scoped lang="scss">
.vdata-border-flybox {
	position: relative;
	width: 100%;
	height: 100%;
	svg {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.content {
		width: 100%;
		height: 100%;
		padding: 5px;
		box-sizing: border-box;
	}
}
</style>
