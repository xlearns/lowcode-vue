<template>
	<svg
		class="tag-cloud"
		:width="options.width"
		:height="options.height"
		@mousemove="listener($event)"
	>
		<a v-for="(tag, index) in allTags" :key="index">
			<text
				:x="tag.x"
				:y="tag.y"
				:font-size="20 * (options.fontSize / (options.fontSize - tag.z))"
				:fill-opacity="(options.opacity + tag.z) / 600"
				:style="{ fill: tag.color }"
			>
				{{ tag.name }}
			</text>
		</a>
	</svg>
</template>

<script lang="ts">
import { reactive, toRefs, ref, computed, onMounted } from "vue";
export default {
	name: "VTagCloud",
	props: {
		tags: {
			type: Array,
			require: true,
			default: () => [],
		},
		options: {
			type: Object,
			require: false,
			default: () => {
				return {
					width: 600,
					height: 600,
					radius: 200,
					opacity: 300,
					fontSize: 600,
				};
			},
		},
	},
	setup(props) {
		let data = reactive({
			speedX: Math.PI / 720, //绕x轴旋转的角度
			speedY: Math.PI / 720, //绕y轴旋转的角度
			allTags: [],
		});
		const centerX = computed(() => props.options.width / 2);
		const centerY = computed(() => props.options.height / 2);

		const init = function () {
			for (let i = 0; i < props.tags.length; i++) {
				let tag = {};
				let k = -1 + (2 * (i + 1) - 1) / props.tags.length;
				let a = Math.acos(k);
				let b = a * Math.sqrt(props.tags.length * Math.PI);
				tag.name = props.tags[i].name;
				tag.color = props.tags[i].tagColor ? props.tags[i].tagColor : "#fff";
				tag.x =
					centerX.value + props.options.radius * Math.sin(a) * Math.cos(b);
				tag.y =
					centerY.value + props.options.radius * Math.sin(a) * Math.sin(b);
				tag.z = props.options.radius * Math.cos(a);
				data.allTags.push(tag);
			}
		};
		const rotateX = function (angleX) {
			var cos = Math.cos(angleX);
			var sin = Math.sin(angleX);
			for (let tag of data.allTags) {
				var y1 = (tag.y - centerY.value) * cos - tag.z * sin + centerY.value;
				var z1 = tag.z * cos + (tag.y - centerY.value) * sin;
				tag.y = y1;
				tag.z = z1;
			}
		};
		const rotateY = function (angleY) {
			var cos = Math.cos(angleY);
			var sin = Math.sin(angleY);
			for (let tag of data.allTags) {
				var x1 = (tag.x - centerX.value) * cos - tag.z * sin + centerX.value;
				var z1 = tag.z * cos + (tag.x - centerX.value) * sin;
				tag.x = x1;
				tag.z = z1;
			}
		};
		const listener = function (event) {
			//响应鼠标移动
			var x = event.clientX - centerX.value;
			var y = event.clientY - centerY.value;
			data.speedX =
				x * 0.0001 > 0
					? Math.min(props.options.radius * 0.00003, x * 0.0001)
					: Math.max(-props.options.radius * 0.00003, x * 0.0001);
			data.speedY =
				y * 0.0001 > 0
					? Math.min(props.options.radius * 0.00003, y * 0.0001)
					: Math.max(-props.options.radius * 0.00003, y * 0.0001);
		};
		onMounted(() => {
			init();
			setInterval(() => {
				rotateX(data.speedX);
				rotateY(data.speedY);
			}, 17);
		});
		return {
			listener,
			centerX,
			centerY,
			...toRefs(data),
		};
	},
};
</script>

<style scoped>
.tag-cloud {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}
</style>
