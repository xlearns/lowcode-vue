<template>
	<div class="base-scroll-list" ref="dom">
		<div
			class="base-scroll-list-header"
			:style="{
				background: actualConfig.headerBg,
				height: `${actualConfig.headerHeight}px`,
				fontSize: `${actualConfig.headerFontSize}px`,
				color: actualConfig.headerColor,
			}"
		>
			<div
				class="header-item base-scroll-list-text"
				v-for="(headerItem, i) in headerDataVal"
				:key="headerItem + i"
				:style="{
					...headerStyleVal[i],
					width: `${columnWidths[i]}px`,
				}"
				:align="aligns[i]"
				v-html="headerItem"
			></div>
		</div>
		<div
			class="base-scroll-list-rows-wrapper"
			:style="{
				height: `${domHeight - actualConfig.headerHeight}px`,
			}"
		>
			<!-- key必须是rowData.rowIndex既然唯一性否则会出现渲染错乱 -->
			<div
				class="base-scroll-list-rows"
				v-for="(rowData, index) in currentRowsData"
				:style="{
					height: `${rowHeights[index]}px`,
					lineHeight: `${rowHeights[index]}px`,
					background: rowData.rowIndex % 2 ? rowBg[1] : rowBg[0],
					fontSize: `${actualConfig.rowFontSize}px`,
					color: actualConfig.rowColor,
				}"
				:key="rowData"
			>
				<div
					class="base-scroll-list-columns base-scroll-list-text"
					v-for="(colData, colIndex) in rowData.data"
					:style="{
						width: `${columnWidths[colIndex]}px`,
						...rowStyle[colIndex],
					}"
					:align="aligns[colIndex]"
					v-html="colData"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
import { watch, onMounted, ref, nextTick } from "vue";
import { useScreen } from "../../hooks/useScreen";
// 按需加载
import cloneDeep from "lodash/cloneDeep";
// 初始化合并
import assign from "lodash/assign";

// 默认配置
const defaultConfig = {
	// 标题数据
	headerData: [],
	// 标题样式
	headerStyle: [],
	// 标题背景
	headerBg: "rgb(90,90,90)",
	// 标题高度
	headerHeight: "35",
	// 标题是否展示序号
	headerIndex: false,
	// 展示的序号内容
	headerIndexContent: "#",
	// 序号内容的样式
	headerIndexStyle: {
		width: "50px",
	},
	// 序号列数据内容
	headerIndexData: [],
	// 数据项,二维数组
	data: [],
	// 每页显示的数据条数
	rowNum: 10,
	// 行样式
	rowStyle: [],
	// 行序号内容的样式
	rowIndexStyle: {
		width: "50px",
	},
	// 行背景
	rowBg: [],
	// 内容居中方式
	aligns: [],
	headerFontSize: 24,
	rowFontSize: 20,
	headerColor: "#fff",
	rowColor: "#000",
	moveNum: 1, // 每次移动几条数据的位置
	duration: 2000, // 动画间隔
};

export default {
	name: "BaseScrollList",
	props: {
		config: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	setup(props) {
		let dom = ref();
		const actualConfig = ref([]);
		const headerDataVal = ref([]);
		const headerStyleVal = ref([]);
		const rowsData = ref([]);
		const rowStyle = ref([]);
		const currentRowsData = ref([]);
		const currentIndex = ref(0); // 动画指针
		const columnWidths = ref([]);
		const aligns = ref([]);
		const domWidth = ref(0);
		const domHeight = ref(0);
		const rowNum = ref(0);
		const rowHeights = ref([]);
		const rowBg = ref([]);
		let avgHeight;
		const isAnimationStart = ref(true);
		const handleHeader = (config) => {
			const _headerData = cloneDeep(config.headerData);
			const _headerStyle = cloneDeep(config.headerStyle);
			const _rowStyle = cloneDeep(config.rowStyle);
			const _rowsData = cloneDeep(config.data);
			// 获取居中方式
			const _aligns = cloneDeep(config.aligns);

			if (_headerData.length <= 0) return;
			if (config.headerIndex) {
				_headerData.unshift(config.headerIndexContent);
				_headerStyle.unshift(config.headerIndexStyle);
				_rowStyle.unshift(config.rowIndexStyle);
				// 二维数组
				_rowsData.forEach((rows, index) => {
					// 处理序号列数据
					if (
						config.headerIndexData &&
						config.headerIndexData.length > 0 &&
						config.headerIndexData[index]
					) {
						rows.unshift(config.headerIndexData[index]);
					} else {
						rows.unshift(index + 1);
					}
				});
				_aligns.unshift("center");
			}
			headerDataVal.value = _headerData;
			headerStyleVal.value = _headerStyle;
			columnWidths.value = _columnWidths;
			rowStyle.value = _rowStyle;
			aligns.value = _aligns;

			// 动态计算header中每一列的宽度
			let usedWidth = 0;
			let usedColumnNum = 0;
			// 判断是否存在自定义width
			_headerStyle.forEach((style) => {
				if (style.width) {
					usedWidth += Number(style.width.replace("px", ""));
					usedColumnNum++;
				}
			});
			// 动态计算列宽时，使用剩余未定义的宽度除以剩余的列数
			const avgWidth =
				(domWidth.value - usedWidth) / (_headerData.length - usedColumnNum);
			const _columnWidths = new Array(_headerData.length).fill(avgWidth);

			_headerStyle.forEach((style, index) => {
				if (style.width) {
					const headerWidth = Number(style.width.replace("px", ""));
					_columnWidths[index] = headerWidth;
				}
			});

			columnWidths.value = _columnWidths;

			const { rowNum } = config;
			if (_rowsData.length >= rowNum && _rowsData.length < rowNum * 2) {
				const newRowData = [..._rowsData, ..._rowsData];
				rowsData.value = newRowData.map((item, index) => ({
					data: item,
					rowIndex: index,
				}));
			} else {
				rowsData.value = _rowsData.map((item, index) => ({
					data: item,
					rowIndex: index,
				}));
			}
		};

		const handleRows = (config) => {
			// 动态计算每行数据的高度
			const { headerHeight } = config;
			const unusedHeight = domHeight.value - headerHeight;
			rowNum.value = config.rowNum;
			// 如果rowNum大于实际数据长度，则以实际数据长度为准
			if (rowNum.value > rowsData.value.length) {
				rowNum.value = rowsData.value.length;
			}

			avgHeight = unusedHeight / rowNum.value;
			rowHeights.value = new Array(rowNum.value).fill(avgHeight);

			// 获取行背景色
			if (config.rowBg) {
				rowBg.value = config.rowBg;
			}
		};

		const startAnimation = async () => {
			if (!isAnimationStart.value) {
				return;
			}
			const config = actualConfig.value;
			const { rowNum, moveNum, duration } = config;
			const totalLength = rowsData.value.length;
			if (totalLength < rowNum) return;
			// 动画索引
			const index = currentIndex.value;
			// 表格数据
			const _rowsData = cloneDeep(rowsData.value);
			// 数据重新头尾连接
			const rows = _rowsData.slice(index);
			rows.push(..._rowsData.slice(0, index));
			currentRowsData.value = rows;
			// 动画start

			// 先将所有行的高度还原
			rowHeights.value = new Array(totalLength).fill(avgHeight);

			const waitTime = 300;
			if (!isAnimationStart.value) {
				return;
			}
			await new Promise((resolve) => setTimeout(resolve, waitTime));
			// 将moveNum的行高度设置0
			// 这里splice将指定元素删除并替换
			rowHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0));

			currentIndex.value += moveNum;
			// 动画end

			// 判断是否到达最后一组数据
			const isLast = currentIndex.value - totalLength;
			if (isLast >= 0) {
				currentIndex.value = isLast;
			}
			if (!isAnimationStart.value) {
				return;
			}
			// sleep
			await new Promise((resolve) => setTimeout(resolve, duration - waitTime));
			await startAnimation();
		};
		const stopAnimation = () => {
			isAnimationStart.value = false;
		};
		const update = function () {
			stopAnimation();
			let { width, height } = useScreen(dom.value);
			domWidth.value = width;
			domHeight.value = height;

			const _actualConfig = assign(defaultConfig, props.config);
			rowsData.value = _actualConfig.data || [];

			handleHeader(_actualConfig);
			handleRows(_actualConfig);

			actualConfig.value = _actualConfig;

			isAnimationStart.value = true;
			startAnimation();
		};
		watch(
			() => props.config,
			() => {
				nextTick(() => {
					update();
				});
			},
			{
				immediate: true,
			}
		);
		onMounted(() => {});
		return {
			dom,
			columnWidths,
			actualConfig,
			currentRowsData,
			headerDataVal,
			headerStyleVal,
			rowsData,
			rowStyle,
			rowHeights,
			rowBg,
			aligns,
			domHeight,
		};
	},
};
</script>

<style scoped lang="scss">
.base-scroll-list {
	height: 100%;
	.base-scroll-list-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		box-sizing: border-box;
	}
	.base-scroll-list-header {
		display: flex;
		font-size: 15px;
		align-items: center;
		.header-item {
		}
	}
	.base-scroll-list-rows-wrapper {
		overflow: hidden;
		.base-scroll-list-rows {
			display: flex;
			align-items: center;
			transition: all 0.3s linear;
			.base-scroll-list-columns {
				height: 100%;
			}
		}
	}
}
</style>
