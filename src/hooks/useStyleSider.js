import { ref } from "vue";
export function useStyle() {
  let PosAndSize = ref([
    [
      {
        label: "X",
        key: "x",
      },
      {
        label: "Y",
        key: "y",
      },
    ],
    [
      {
        label: "宽",
        key: "w",
      },
      {
        label: "高",
        key: "h",
      },
    ],
  ]);
  let rootStyle = ref([
    [
      {
        label: "宽度",
        key: "width",
      },
      {
        label: "高度",
        key: "height",
      },
    ],
  ]);
  return { PosAndSize, rootStyle };
}
