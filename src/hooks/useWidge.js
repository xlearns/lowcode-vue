import { ref, computed } from "vue";
import * as CONFIG from "@/constants/config";
const listAll = CONFIG.WIDGE_LIST;

let status = ref("all");
const drawerMainButton = ref({
  one: ["全部", "统计图", "信息图"],
  two: ["折线图", "柱状图", "饼图", "散点图", "面积图"],
  three: ["环状图", "K线图", "水位图", "雷达图", "热力图"],
});

const options = ref([
  { value: "all", label: "全部" },
  { value: "border", label: "边框" },
  { value: "echarts", label: "图表" },
  { value: "text", label: "文本" },
  { value: "carousel", label: "轮播" },
  { value: "media", label: "多媒体" },
  { value: "map", label: "地图" },
  { value: "3d", label: "3d" },
  { value: "elementPlus", label: "element-plus" },
]);
const activeNames = ref(["2"]);

export function useWidge() {
  let widgetList = computed(() => {
    if (status.value == "all") {
      return listAll;
    } else {
      return listAll.filter((item) => item.type == status.value);
    }
  });

  return {
    options,
    activeNames,
    status,
    CONFIG,
    widgetList,
    listAll,
    drawerMainButton,
  };
}
