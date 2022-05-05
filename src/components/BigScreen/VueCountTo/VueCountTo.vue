<template>
	<span>
		{{ displayValue }}
	</span>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, onUnmounted, watch, computed } from "vue";
import {
	requestAnimationFrame,
	cancelAnimationFrame,
} from "./../../utils/requestAnimationFrame.js";

import { formatNumber } from "./../../utils/index.js";

export default {
	name: "VueCountTo",
	props: {
		startVal: {
			type: Number,
			default: 0,
		},
		endVal: {
			type: Number,
			default: 2022,
		},
		duration: {
			type: Number,
			default: 3000,
		},
		autoplay: {
			type: Boolean,
			default: true,
		},
		decimals: {
			type: Number,
			required: false,
			default: 0,
			validator(value) {
				return value >= 0;
			},
		},
		decimal: {
			type: String,
			required: false,
			default: ".",
		},
		separator: {
			type: String,
			default: ",",
		},
		prefix: {
			type: String,
			default: "",
		},
		suffix: {
			type: String,
			default: "",
		},
		useEasing: {
			type: Boolean,
			default: true,
		},
		easingFn: {
			type: Function,
			default(t, b, c, d) {
				return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
			},
		},
	},
	setup(props, { emit }) {
		let state = reactive({
			displayValue: formatNumber(
				props.startVal,
				props.decimals,
				props.decimal,
				props.separator,
				props.prefix,
				props.suffix
			),
			localStartVal: props.startVal,
			printVal: null,
			paused: false,
			localDuration: props.duration,
			startTime: null,
			timestamp: null,
			remaining: null,
			rAF: null,
		});
		const countDown = computed(() => {
			return props.startVal > props.endVal;
		});
		const count = function (timestamp) {
			if (!state.startTime) state.startTime = timestamp;
			state.timestamp = timestamp;
			// 进度时间
			const progress = timestamp - state.startTime;
			// 剩余时间
			state.remaining = state.localDuration - progress;
			if (props.useEasing) {
				if (countDown.value) {
					state.printVal =
						state.localStartVal -
						props.easingFn(
							progress,
							0,
							state.localStartVal - props.endVal,
							state.localDuration
						);
				} else {
					state.printVal = props.easingFn(
						progress,
						state.localStartVal,
						props.endVal - state.localStartVal,
						state.localDuration
					);
				}
			} else {
				if (countDown.value) {
					// 核心
					// value = start - (start - end) * (dt/time)【执行的time】
					state.printVal =
						state.localStartVal -
						(state.localStartVal - props.endVal) *
							(progress / state.localDuration);
				} else {
					state.printVal =
						state.localStartVal +
						(props.endVal - state.localStartVal) *
							(progress / state.localDuration);
				}
			}
			if (countDown.value) {
				state.printVal =
					state.printVal < props.endVal ? props.endVal : state.printVal;
			} else {
				state.printVal =
					state.printVal > props.endVal ? props.endVal : state.printVal;
			}

			state.displayValue = formatNumber(
				state.printVal,
				props.decimals,
				props.decimal,
				props.separator,
				props.prefix,
				props.suffix
			);

			if (progress < state.localDuration) {
				state.rAF = requestAnimationFrame(count);
			} else {
				emit("callback");
			}
		};
		const start = function () {
			state.localStartVal = props.startVal;
			state.startTime = null;
			state.localDuration = props.duration;
			state.paused = false;
			state.rAF = requestAnimationFrame(count);
		};
		watch(
			() => [props.start, props.end],
			() => {
				if (props.autoplay) {
					start();
				}
			}
		);

		const pause = function () {
			//  暂停
			cancelAnimationFrame(state.rAF);
		};
		const reset = function () {
			// 重置
			state.startTime = null;
			cancelAnimationFrame(state.rAF);
			state.displayValue = formatNumber(
				props.startVal,
				props.decimals,
				props.decimal,
				props.separator,
				props.prefix,
				props.suffix
			);
		};
		const resume = function () {
			// 恢复
			state.startTime = null;
			state.localDuration = +state.remaining;
			state.localStartVal = +state.printVal;
			requestAnimationFrame(count);
		};

		onMounted(() => {
			if (props.autoplay) {
				start();
			}
			emit("mountedCallback");
		});
		onUnmounted(() => {
			state.rAF && cancelAnimationFrame(state.rAF);
		});
		return {
			pause,
			reset,
			resume,
			...toRefs(state),
		};
	},
};
</script>

<style scoped></style>
