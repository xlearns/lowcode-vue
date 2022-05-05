<template>
  <div ref="dom" class="datav-full-sreen">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import { debounce } from "@/utils";
export default {
  name: "VFullSreen",
  props: {
    options: Object,
  },
  setup(props) {
    let dom = ref();
    let width = ref(0);
    let height = ref(0);
    let originalWidth = ref(0);
    let originalHeight = ref(0);
    let ready = ref(false);
    let observer;
    const updateScale = function () {
      // 获取真实的视口尺寸
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      // 获取大屏最终的宽高
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;
      dom.value &&
        (dom.value.style.transform = `scale(${widthScale}, ${heightScale})`);
    };
    const updateSize = function () {
      if (width.value && height.value) {
        dom.value.style.width = `${width.value}px`;
        dom.value.style.height = `${height.value}px`;
      } else {
        dom.value.style.width = `${originalWidth.value}px`;
        dom.value.style.height = `${originalHeight.value}px`;
      }
    };
    const init = function () {
      return new Promise((resolve) => {
        nextTick(() => {
          if (props.options && props.options.width && props.options.height) {
            width.value = props.options.width;
            height.value = props.options.height;
          } else {
            console.warn(
              "props.options.width||props.options.height no defined"
            );
            width.value = dom.value.clientWidth;
            height.value = dom.value.clientHeight;
          }
          // 视口宽度
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
          resolve();
        });
      });
    };
    const onResize = async function () {
      // 屏幕改变、分辨率改变都会触发
      await init();
      updateScale();
    };

    const initMutationObserver = function () {
      const MutationObserver = window.MutationObserver;
      // dom变化执行onResize【callback】
      observer = new MutationObserver(onResize);
      observer.observe(dom.value, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      });
    };
    const removeMutationObserver = function () {
      if (observer) {
        observer.disconnect();
        observer.takeRecords();
        observer = null;
      }
    };

    onMounted(async () => {
      ready.value = false;
      await init();
      updateSize();
      updateScale();
      window.addEventListener("resize", debounce(100, onResize));
      initMutationObserver();
      ready.value = true;
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
      removeMutationObserver();
    });

    return {
      ready,
      dom,
    };
  },
};
</script>

<style lang="scss" scoped>
.datav-full-sreen {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
