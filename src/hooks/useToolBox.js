import { ref } from "vue";
import { usePanel } from "@/hooks/usePanel";
import router from "@/router";
let { current, list } = usePanel();

let data = ref([
  "撤回",
  "重做",
  "预览",
  "左对齐",
  "顶部对齐",
  "右对齐",
  "底部对齐",
  "垂直居中",
  "水平居中",
]);

export function useToolBox() {
  function click(type) {
    switch (type) {
      case 1:
        current.value = null;
        list.value = [];
        break;
      case 2:
        router.push("/view");
        break;
      case 3:
        if (!current.value) return;
        current.value.x = 0;
        break;
    }
  }
  return {
    data,
    click,
  };
}