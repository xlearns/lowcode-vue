<script setup>
import { onMounted, ref } from "vue";
import bus from "@/bus";
let props = defineProps({
	cutomClass: String,
	name: String,
});
const show = ref(false);
const contextmenu = ref();
const bindingValue = ref();

function getPosition(x, y) {
	const style = { top: y, left: x };
	const { innerWidth, innerHeight } = window;
	if (contextmenu.value) {
		// dom
		const el = contextmenu.value;
		const { clientWidth: elWidth, clientHeight: elHeight } = el;
		if (y + elHeight > innerHeight) {
			style.top -= elHeight;
		}
		if (x + elWidth > innerWidth) {
			style.left -= elWidth;
		}
		if (style.top < 0) {
			style.top = elHeight < innerHeight ? (innerHeight - elHeight) / 2 : 0;
		}
		if (style.left < 0) {
			style.left = elWidth < innerWidth ? (innerWidth - elWidth) / 2 : 0;
		}
		return style;
	}
}

async function showMenu(x, y, val) {
	show.value = true;
	bindingValue.value = { ...val };
	bus.emit("bindValue", bindingValue.value);
	await nextTick();
	if (contextmenu.value) {
		const el = contextmenu.value;
		const p = getPosition(x, y);
		if (p) {
			el.style.top = `${p.top + 5}px`;
			el.style.left = `${p.left + 5}px`;
		}
	}
}

function hideMenu() {
	show.value = false;
}

onMounted(() => {
	bus.on("add-contextmenu", (e) => {
		showMenu(e.x, e.y, e.value);
	});
	bus.on("hide-contextmenu", () => {
		hideMenu();
	});
	bus.on("item-click", () => {
		show.value = false;
	});
});
</script>
<template>
	<!-- teleport很好用可以直接apend到to指定的元素 -->
	<teleport to="body">
		<div
			class="v-contextmenu"
			ref="contextmenu"
			v-show="show && bindingValue && name === bindingValue.name"
		>
			<slot />
		</div>
	</teleport>
</template>

<style scoped>
.v-contextmenu {
	position: fixed;
	top: 0;
	left: 0;
	color: #444;
	display: inline-block;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
