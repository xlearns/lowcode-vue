import { ref, computed } from "vue";
import * as CONFIG from "@/constants/config";
let list = ref([]);
let widgetX = ref(0);
let widgetY = ref(0);
let currentWidget = ref(null);

export function usePanel() {
  // 当前组件的样式
  let currentForm = computed(() => {
    return CONFIG.WIDGE_LIST.find((item) => current.value?.type === item.type)
      ?.styleForm;
  });

  let current = computed(() => {
    return list.value.find((item) => item.focused);
  });
  function onFocus(currentItem) {
    list.value = list.value.map((item) => {
      item.focused = item.id === currentItem.id;
      return item;
    });
  }

  function contextmenu(event) {
    return event.preventDefault();
  }
  function onWidgetDrag(info, currentItem) {
    let { left: x, top: y } = info;
    list.value = list.value.map((item) => {
      if (item.id === currentItem) {
        item.x = x;
        item.y = y;
      }
      return item;
    });
  }
  function sortList() {
    list.value.sort((a, b) => b.z - a.z);
  }

  function layerUp() {
    let currentItem = current.value;
    // 找到当前组件的上一个组件
    let up = list.value.find(
      (item) => item.z === currentItem.z + 1 && item.id !== currentItem.id
    );
    up && up.z--;
    currentItem.z++;
  }
  function layerDn() {
    let currentItem = current.value;
    // 找到当前组件的下一个组件
    let dn = list.value.find(
      (item) => item.z === currentItem.z - 1 && item.id !== currentItem.id
    );
    dn && dn.z++;
    currentItem.z--;
  }
  function deleteFn() {
    list.value = list.value.filter((item) => !item.focused);
  }
  function layerTop() {
    const currentItem = current.value;
    let max = Math.max(...list.value.map((item) => item.z));
    currentItem.z = max + 1;
  }
  function layerBottom() {
    const currentItem = current.value;
    let max = Math.min(...list.value.map((item) => item.z));
    currentItem.z = max - 1;
  }

  function onWidgetMouseDown(event, widget) {
    let { offsetX, offsetY } = event;
    widgetX.value = offsetX;
    widgetY.value = offsetY;
    currentWidget.value = widget;
  }

  return {
    contextmenu,
    widgetX,
    widgetY,
    currentWidget,
    onWidgetMouseDown,
    onFocus,
    current,
    list,
    currentForm,
    sortList,
    onWidgetDrag,
    layerUp,
    layerDn,
    deleteFn,
    layerTop,
    layerBottom,
  };
}
