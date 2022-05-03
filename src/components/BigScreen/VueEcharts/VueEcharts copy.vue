<script>
import { onMounted, onUnmounted, ref, watch } from "vue";
import Echarts from "echarts"; // rollup配置了外部引入echarts，所以无需npm安装echarts

export default {
	name: "VEcharts",
	props: {
		options: Object,
		// 主题
		theme: {
			type: [Object, String],
			default: "",
		},
		// 适配 默认300*150
		open: {
			type: Boolean,
			default: false,
		},
		// svg or canvas
		type: {
			type: Object,
			default: {
				renderer: "canvas",
			},
		},
		animation: {
			type: String,
			validator: (value) => {
				return ["pie", "bar"].includes(value);
			},
		},
		animationConfig: {
			type: Object,
		},
	},
	setup(props) {
		let dom = ref();
		let charts = ref();
		//animation
		let dataIndex = -1;
		let timerObj = null;
		watch(
			() => props.options,
			() => {
				charts.value?.setOption(props.options);
			},
			{
				deep: true,
			}
		);
		const onResize = function () {
			charts.value?.resize();
		};
		const ani = function (timer) {
			timerObj = setInterval(() => {
				if (["pie", "bar"].includes(props.animation)) {
					charts.value?.dispatchAction({
						type: "downplay",
						seriesIndex: 0,
						dataIndex,
					});
					dataIndex = (dataIndex + 1) % props.options.series[0].data.length;
					charts.value?.dispatchAction({
						type: "highlight",
						seriesIndex: 0,
						dataIndex,
					});
					charts.value?.dispatchAction({
						type: "showTip",
						seriesIndex: 0,
						dataIndex,
					});
				}
			}, timer);
		};
		onMounted(() => {
			let _dom = dom.value;
			if (!props.open) {
				_dom.style.height = "150px";
				_dom.style.width = "300px";
			} else {
				_dom.style.height = "100%";
				_dom.style.width = "100%";
			}
			charts.value = Echarts.init(_dom, props.theme, props.type);
			charts.value.setOption(props.options);
			ani(1000);
			window.addEventListener("resize", onResize);
		});
		onUnmounted(() => {
			clearInterval(timerObj);
			window.removeEventListener("resize", onResize);
		});
		return {
			dom,
			charts,
		};
	},
};
</script>

<template>
	<div class="echats" ref="dom"></div>
</template>
