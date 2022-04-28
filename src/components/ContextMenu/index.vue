<script setup>
import contextMenu from "./ContextMenu.vue";
import contextMenuItem from "./ContextMenuItem.vue";
import contextMenuSubmenu from "./ContextMenuSubmenu.vue";
</script>

<template>
	<context-menu ref="context" name="context-menu-1">
		<context-menu-submenu :label="'ContextMenu1'">
			<context-menu-item :disabled="true">图标</context-menu-item>
			<context-menu-item>列表</context-menu-item>
			<context-menu-item>详细信息</context-menu-item>
		</context-menu-submenu>
		<context-menu-submenu :label="'排序方式'">
			<context-menu-item>名称</context-menu-item>
			<context-menu-item>日期</context-menu-item>
			<context-menu-item>类型</context-menu-item>
			<context-menu-item>大小</context-menu-item>
			<context-menu-item :disabled="true">时长</context-menu-item>
		</context-menu-submenu>
		<context-menu-submenu :label="'自定义'" divider>
			<context-menu-item>二级菜单</context-menu-item>
			<context-menu-submenu :label="'多级菜单'">
				<context-menu-item>三级菜单</context-menu-item>
				<context-menu-item>嵌套菜单</context-menu-item>
			</context-menu-submenu>
		</context-menu-submenu>
		<context-menu-submenu :label="'新建'" divider>
			<context-menu-item>新建文件</context-menu-item>
			<context-menu-item>新建文件夹</context-menu-item>
			<context-menu-item>快捷方式</context-menu-item>
		</context-menu-submenu>
		<context-menu-item :disabled="true">属性</context-menu-item>
	</context-menu>
</template>

<style scoped></style>
