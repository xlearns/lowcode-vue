import { ref } from "vue";
import { usePanel } from "@/hooks/usePanel";
let { current, list, rootStyle: rs } = usePanel();
// 只有放到函数外面，才会是全局响应式
let bgImg = ref("https://api.boot.jeecg.com/bigscreen/img/bg/bg1.png");

let data = ref([
  "左对齐",
  "右对齐",
  "顶部对齐",
  "底部对齐",
  "垂直居中",
  "水平居中",
]);

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
  function keyboard(type) {
    let { width, height } = rs.value;
    switch (type) {
      case "左对齐":
        if (!current.value) return;
        current.value.x = 0;
        break;
      case "右对齐":
        if (!current.value) return;
        current.value.x = width - current.value.w;
        break;
      case "顶部对齐":
        if (!current.value) return;
        current.value.y = 0;
        break;
      case "底部对齐":
        if (!current.value) return;
        current.value.y = height - current.value.h;
        break;
      case "水平居中":
        if (!current.value) return;
        current.value.x = (width - current.value.w) / 2;
        break;
      case "垂直居中":
        if (!current.value) return;
        current.value.y = (height - current.value.h) / 2;
        break;
    }
  }
  function beforeAvatarUpload(uploadFile) {
    return false;
  }
  function change(file) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file.raw);
    fileReader.onload = () => {
      bgImg.value = fileReader.result;
    };
  }
  function handlePictureCardPreview(uploadFile) {}
  return {
    bgImg,
    PosAndSize,
    rootStyle,
    beforeAvatarUpload,
    handlePictureCardPreview,
    change,
    data,
    keyboard,
  };
}
