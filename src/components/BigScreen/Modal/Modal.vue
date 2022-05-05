<template>
	<div v-if="openDom" class="filterbg">
		<div
			class="popup"
			:class="{ openHeight: openHeight, openWidth: openWidth }"
		>
			<div class="content" v-if="ready">
				<div class="popupClose" @click="close">
					<close />
				</div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { sleep } from "./../../utils";
import close from "./close.vue";
import { ref, onMounted, onUnmounted, watch } from "vue";
export default {
	name: "VModel",
	components: {
		close,
	},
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const openHeight = ref(false);
		const openWidth = ref(false);
		const openDom = ref(false);
		const ready = ref(false);
		const openFn = async function () {
			openDom.value = true;
			await sleep(400);
			openHeight.value = true;
			await sleep(400);
			openWidth.value = true;
			await sleep(400);
			ready.value = true;
		};
		watch(
			() => props.modelValue,
			() => {
				props.modelValue ? openFn() : closeFn();
			}
		);
		const close = function () {
			emit("update:modelValue", false);
		};
		const closeFn = async function () {
			ready.value = false;
			openWidth.value = false;
			await sleep(400);
			openHeight.value = false;
			await sleep(400);
			openDom.value = false;
		};
		onMounted(() => {});
		onUnmounted(() => {
			closeFn();
		});
		return { openHeight, openWidth, openDom, close, ready };
	},
};
</script>

<style scoped lang="scss">
.filterbg {
	width: 100%;
	height: 100%;
	background: rgba(30, 182, 254, 0.5);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 998;
	.content {
		height: 100%;
	}
	.openHeight {
		height: 76% !important;
	}
	.openWidth {
		width: 82% !important;
	}
	.popup {
		overflow: hidden;
		transition: all 0.4s;
		width: 3px;
		height: 0;
		background: #061f3e;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 999;
		border-radius: 8px;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		.popupClose {
			z-index: 100;
			transition: all 0.2s;
			cursor: pointer;
			position: absolute;
			width: 32px;
			height: 32px;
			top: 15px;
			right: 18px;
			background-size: 100%;
			&:hover {
				transform: rotateZ(360deg);
			}
		}
	}
}
</style>
