<script setup>
import contextMenu from "./ContextMenu.vue";
import contextMenuItem from "./ContextMenuItem.vue";
import contextMenuSubmenu from "./ContextMenuSubmenu.vue";
const emit = defineEmits(["contextMenuFn"]);
let data = ["置顶", "置底", "删除", "上移图层", "下移图层"];
function fn(type) {
	emit("contextMenuFn", type);
}
</script>

<template>
	<context-menu ref="context" name="context-menu-1">
		<context-menu-item
			v-for="(item, index) in data"
			:key="index"
			@click="fn(item)"
			>{{ item }}</context-menu-item
		>
	</context-menu>
</template>

<style scoped></style>
