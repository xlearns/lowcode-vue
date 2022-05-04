import { ref } from "vue";
import { usePanel } from "@/hooks/usePanel";
import router from "@/router";

let { current, list, rootStyle, drawer } = usePanel();

let data = ref(["重做", "组件", "预览"]);

export function useToolBox() {
  function click(type) {
    switch (type) {
      case 0:
        current.value = null;
        list.value = [];
        break;
      case 1:
        drawer.value = true;
        break;
      case 2:
        router.push("/view");
        break;
    }
  }
  return {
    data,
    click,
  };
}
