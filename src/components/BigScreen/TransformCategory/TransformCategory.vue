<template>
	<div class="country-category">
		<div
			class="category"
			v-for="(item, index) in data"
			:key="item"
			@click="onClick(index)"
			@mouseenter="onMounseEnter(index)"
			@mouseleave="onMounseLeave(index)"
			@mousemove="onMounseEnter(index)"
		>
			<div
				class="selected"
				v-if="index === selected"
				:style="{ background: color[0] }"
			>
				{{ item }}
			</div>
			<div
				class="hovered"
				v-else-if="index === hover"
				:style="{ background: color[1] }"
			>
				{{ item }}
			</div>
			<div v-else>{{ item }}</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
export default {
	name: "TransformCategory",
	props: {
		data: Array,
		color: {
			type: Array,
			default() {
				return ["rgb(140, 160, 173)", "rgb(80, 80, 80)"];
			},
		},
	},
	emits: ["click"],
	setup(props, { emit }) {
		const selected = ref(0);
		const hover = ref(-1);
		let task;
		const onClick = (index) => {
			selected.value = index;
			emit("click", index);
		};
		const onMounseEnter = (index) => {
			hover.value = index;
		};
		const onMounseLeave = (index) => {
			hover.value = -1;
		};
		const update = () => {
			task && clearInterval(task);
			task = setInterval(() => {
				if (selected.value + 1 > props.data.length - 1) {
					selected.value = 0;
				} else {
					selected.value += 1;
				}
			}, 2000);
		};
		onMounted(update);
		onUnmounted(() => {
			task && clearInterval(task);
		});
		return {
			selected,
			hover,
			onClick,
			onMounseEnter,
			onMounseLeave,
		};
	},
};
</script>

<style lang="scss" scoped>
.country-category {
	display: flex;
	width: 100%;
	height: 100%;
	.category {
		flex: 1;
		background: rgb(53, 57, 65);
		font-size: 24px;
		color: rgb(144, 160, 174);
		.hovered {
			background: rgb(80, 80, 80);
			color: #ffffff;
		}
		.selected {
			background: rgb(140, 160, 173);
			color: #fff;
		}
		div {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
