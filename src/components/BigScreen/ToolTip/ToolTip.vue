<template>
	<div
		class="vToolTip"
		@mouseenter="mouseenter"
		@mouseleave="mouseleave"
		ref="dom"
	>
		<div
			:style="style"
			class="tool_tip"
			v-if="show"
			:class="`tool_tip_${placement}`"
			ref="BoxDom"
			v-html="content"
		></div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { ref, watch, nextTick } from "vue";
export default {
	name: "VToolTip",
	props: {
		content: {
			type: String,
		},
		placement: {
			type: String,
			validator: (value) => {
				return ["top", "bottom", "left", "right"].includes(value);
			},
			default: "top",
		},
	},
	setup(props) {
		let show = ref(false);
		let dom = ref();
		let style = ref({});
		let BoxDom = ref();
		const mouseleave = function () {
			show.value = false;
		};
		const mouseenter = function () {
			show.value = true;
		};
		const computedStyle = watch(
			() => show.value,
			() => {
				if (!show.value) return;
				let left, top;
				nextTick(() => {
					let _dom = dom.value;
					let _box = BoxDom.value;

					let currenLeft = _dom.offsetLeft,
						currenTop = _dom.offsetTop,
						currenWidth = _dom.offsetWidth,
						currenHeight = _dom.offsetHeight;
					let tipContentWidth = _box.offsetWidth,
						tipContentHeight = _box.offsetHeight;
					console.log(
						document.querySelector(".tool_tip").clientWidth,
						tipContentWidth
					);
					switch (props.placement) {
						case "top":
							left = currenLeft + currenWidth / 2 - tipContentWidth / 2 + "px";
							top = currenTop - 7 - tipContentHeight + "px";
							break;
						case "left":
							left = currenLeft - tipContentWidth - 7 + "px";
							top = currenTop + currenHeight / 2 - tipContentHeight / 2 + "px";
							break;
						case "right":
							left = currenLeft + currenWidth + 7 + "px";
							top = currenTop + currenHeight / 2 - tipContentHeight / 2 + "px";
							break;
						case "bottom":
							left = currenLeft + currenWidth / 2 - tipContentWidth / 2 + "px";
							top = currenTop + currenHeight + 7 + "px";
							break;
					}

					style.value = {
						left: left,
						top: top,
					};
					console.log(style.value);
				});
			}
		);
		return {
			dom,
			show,
			BoxDom,
			mouseleave,
			mouseenter,
			computedStyle,
			style,
		};
	},
};
</script>

<style scoped lang="scss">
.vToolTip {
	.tool_tip {
		background-color: rgba(0, 0, 0, 0.9);
		padding: 4px 8px;
		border-radius: 4px;
		color: #fff;
		font-size: 12px;
		position: absolute;
		z-index: 99999;
		word-wrap: break-word;
		max-width: 1000px;
		box-sizing: border-box;
	}

	.tool_tip:before {
		position: absolute;
		content: "";
		background-color: rgba(0, 0, 0, 0);
		width: 0;
		height: 0;
		border-width: 5px;
		border-style: solid;
	}

	.tool_tip_top:before {
		top: 100%;
		left: 50%;
		transform: translate(-50%, 0);
		-ms-transform: translate(-50%, 0);
		-webkit-transform: translate(-50%, 0);
		border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
	}

	.tool_tip_right:before {
		top: 50%;
		left: 0;
		transform: translate(-100%, -50%);
		-ms-transform: translate(-100%, -50%);
		-webkit-transform: translate(-100%, -50%);
		border-color: transparent rgba(0, 0, 0, 0.9) transparent transparent;
	}

	.tool_tip_bottom:before {
		top: 0;
		left: 50%;
		transform: translate(-50%, -100%);
		-ms-transform: translate(-50%, -100%);
		-webkit-transform: translate(-50%, -100%);
		border-color: transparent transparent rgba(0, 0, 0, 0.9) transparent;
	}

	.tool_tip_left:before {
		top: 50%;
		left: 100%;
		transform: translate(0, -50%);
		-ms-transform: translate(0, -50%);
		-webkit-transform: translate(0, -50%);
		border-color: transparent transparent transparent rgba(0, 0, 0, 0.9);
	}
}
</style>
