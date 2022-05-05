<template>
	<div class="test">
		<svg width="20px" height="20px" viewBox="0 0 100 100">
			<line
				x1="0"
				y1="50"
				x2="100"
				y2="50"
				stroke-width="8"
				stroke="currentColor"
			></line>
			<line
				x1="50"
				y1="0"
				x2="50"
				y2="100"
				stroke-width="8"
				stroke="currentColor"
			></line>
		</svg>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	name: "ComTest",
	setup() {
		let a = ref("test");
		return {
			a,
		};
	},
};
</script>

<style lang="scss" scoped>
.test {
	color: yellow;
}
</style>
