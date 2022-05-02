import { ref, computed } from "vue";
import * as CONFIG from "@/constants/config";
let list = ref([]);

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
    console.log(currentItem);
  }
  function layerBottom() {
    const currentItem = current.value;
    console.log(currentItem);
  }

  return {
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
