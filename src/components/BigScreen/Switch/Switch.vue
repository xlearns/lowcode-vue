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
			<span v-if="type == 1">{{ modelValue ? leftValue : rightValue }}</span>
			<span v-else class="content">
				<span class="item">{{ leftValue }}</span>
				<span
					class="box-block ani"
					:class="[modelValue ? 'leftActive' : 'rightActive']"
				></span>
				<span class="item">{{ rightValue }}</span>
			</span>
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
	position: relative;
	height: 100%;
	min-height: 36px;
	width: 76px;
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
		left: calc(100% - 30px);
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
			left: calc(100% - 30px);
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
			left: calc(100% - 30px);
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
	height: 36px;
	.left,
	.right {
		display: inline-block;
		height: 100%;
		width: 100%;
		.content {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			perspective: 70px;
			.item {
				display: inline-block;
			}
			.leftActive {
				transform: rotateY(-180deg) !important;
				background-color: #03a9f4 !important;
			}
			.box-block {
				position: absolute;
				top: 4px;
				border-radius: 2px;
				right: 4px;
				width: 33px;
				height: 28px;
				background-color: #f44336;
				transform: rotateY(0);
				transform-origin: 0% 50%;
				transition: 0.6s ease all;
				z-index: 1;
			}
		}
	}
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
