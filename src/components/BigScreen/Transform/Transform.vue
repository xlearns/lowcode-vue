<template>
	<!-- <transform name="style">
		<slot></slot>
	</transform> -->
	<div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
function config(one, two) {
	return Object.assign(one, two);
}
import { onMounted, ref, watch } from "vue";
import { to, from, timeline } from "gsap";
export default {
	name: "VTransForm",
	props: {
		modelValue: {
			type: Boolean,
		},
		active: {
			type: Object,
		},
		leave: {
			type: Object,
		},
	},
	setup(props, { slots }) {
		let slot = slots.default();
		let dom = ref();
		let aniActive = ref();
		let aniOthre = ref();
		let defaultConfigActive = {
			duration: 0.4,
			ease: "none",
			paused: true,
		};
		let defaultConfigLeave = {
			duration: 0.4,
			ease: "none",
			paused: true,
		};

		const activeFn = function () {
			aniActive.value.restart();
		};
		const leaveFn = function () {
			aniOthre.value.restart();
		};
		watch(
			() => props.modelValue,
			() => {
				if (props.modelValue) {
					activeFn();
				} else {
					leaveFn();
				}
			}
		);
		onMounted(() => {
			dom.value = slot[0].el;
			aniOthre.value = to(dom.value, config(defaultConfigActive, props.active));
			aniActive.value = to(dom.value, config(defaultConfigLeave, props.leave));
		});
		return {
			dom,
			timeline,
			aniOthre,
			to,
			aniActive,
		};
	},
};
</script>

<style lang="scss" scoped>
.style-enter-active,
.style-leave-active {
	transition: all 0.5s ease;
}

.style-enter-from,
.style-leave-to {
	opacity: 0;
}
</style>
