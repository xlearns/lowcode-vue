<template>
	<div
		class="icon-wrapper"
		:style="{
			...style,
		}"
	>
		<svg class="icon">
			<use :href="iconName"></use>
		</svg>
	</div>
</template>
<script>
// 配合iconfont symbol
export default {
	name: "VIcon",
	props: {
		name: String,
		style: Object,
		prefix: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		let { name, prefix } = props;
		const iconName = `#${prefix}${name}`;
		return {
			iconName,
		};
	},
};
</script>
<style type="text/css">
.icon-wrapper {
	display: inline-block;
}
.icon {
	width: 100%;
	height: 100%;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
