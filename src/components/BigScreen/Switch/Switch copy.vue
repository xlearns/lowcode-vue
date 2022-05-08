<template>
	<div
		@click="click"
		:class="classComputed"
		class="box"
		:style="{ backgroundColor: modelValue ? leftColor : rightColor }"
	>
		<div v-if="type == 2" :class="[modelValue ? 'left' : 'right']">
			<div class="item">{{ modelValue ? leftValue : rightValue }}</div>
			<span class="ball"></span>
		</div>
		<div v-else :class="[modelValue ? 'left' : 'right']" class="ani">
			{{ modelValue ? leftValue : rightValue }}
		</div>
	</div>
</template>

<script lang="ts">
import { computed } from "vue";
export default {
	name: "VSwitch",
	props: {
		modelValue: {
			default: true,
			type: Boolean,
		},
		type: {
			type: Number,
			default: 1,
		},
		isRadius: {
			type: Boolean,
			default: true,
		},
		leftValue: {
			type: String,
			default: "是",
		},
		rightValue: {
			type: String,
			default: "否",
		},
		leftColor: {
			type: String,
			default: "#ebf7fc",
		},
		rightColor: {
			type: String,
			default: "#fcebeb",
		},
	},
	setup(props, { emit }) {
		const click = function () {
			emit("update:modelValue", !props.modelValue);
		};
		let classArray = [
			"one",
			"two",
			"three",
			"four",
			"five",
			"six",
			"seven",
			"eight",
			"nine",
			"ten",
			"eleven",
		];
		const classComputed = computed(() => {
			return [
				"ani",
				classArray[props.type - 1] ? classArray[props.type - 1] : "",
				props.isRadius ? "isRadius" : "",
			];
		});
		return { click, classComputed };
	},
};
</script>

<style lang="scss" scoped>
.ani {
	transition: all 0.3s;
}
.box {
	cursor: pointer;
	position: relative;
	width: 74px;
	height: 36px;
}
.isRadius {
	border-radius: 100px;
}
.one {
	.left {
		position: absolute;
		top: 4px;
		left: 4px;
		width: 20px;
		height: 10px;
		color: #fff;
		font-size: 10px;
		font-weight: bold;
		text-align: center;
		line-height: 1;
		padding: 9px 4px;
		background-color: #03a9f4;
		border-radius: 50%;
	}
	.right {
		position: absolute;
		top: 4px;
		left: 42px;
		width: 20px;
		height: 10px;
		color: #fff;
		font-size: 10px;
		font-weight: bold;
		text-align: center;
		line-height: 1;
		padding: 9px 4px;
		background-color: #f44336;
		border-radius: 50%;
	}
}
.two {
	.left {
		transition: all 0.3s;
		.item {
			transition: all 0.3s;
			position: absolute;
			left: 42px;
			top: 6px;
			color: #fff;
		}
		.ball {
			transition: all 0.3s;
			position: absolute;
			top: 4px;
			left: 4px;
			width: 20px;
			height: 10px;
			color: #fff;
			font-size: 10px;
			font-weight: bold;
			text-align: center;
			line-height: 1;
			padding: 9px 4px;
			background-color: #fff;
			border-radius: 50%;
		}
	}
	.right {
		transition: all 0.3s;
		.item {
			color: #fff;
			transition: all 0.3s;
			position: absolute;
			left: 4px;
			top: 6px;
		}
		.ball {
			transition: all 0.3s;
			position: absolute;
			top: 4px;
			left: 42px;
			width: 20px;
			height: 10px;
			color: #fff;
			font-size: 10px;
			font-weight: bold;
			text-align: center;
			line-height: 1;
			padding: 9px 4px;
			background-color: #fff;
			border-radius: 50%;
		}
	}
}
.three {
	background: red;
}
.four {
}
.five {
}
.six {
}
.seven {
}
.nine {
}
.ten {
}
.eleven {
}
</style>
