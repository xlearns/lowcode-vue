import { ref } from "vue";
// 只有放到函数外面，才会是全局响应式
let bgImg = ref("https://api.boot.jeecg.com/bigscreen/img/bg/bg1.png");

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
  };
}
