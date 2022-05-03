import { ref, nextTick } from "vue";
import bus from "@/bus";
const show = ref(false);
const contextmenu = ref();
const bindingValue = ref();

export function useContext() {
  async function showMenu(x, y, val) {
    show.value = true;
    bindingValue.value = { ...val };
    bus.emit("bindValue", bindingValue.value);
    await nextTick();

    if (contextmenu.value) {
      const el = contextmenu.value;
      const p = getPosition(x, y);
      if (p) {
        el.style.top = `${p.top + 5}px`;
        el.style.left = `${p.left + 5}px`;
      }
    }
  }
  function getPosition(x, y) {
    const style = { top: y, left: x };
    const { innerWidth, innerHeight } = window;

    if (contextmenu.value) {
      // dom
      const el = contextmenu.value;
      const { clientWidth: elWidth, clientHeight: elHeight } = el;
      if (y + elHeight > innerHeight) {
        style.top -= elHeight;
      }
      if (x + elWidth > innerWidth) {
        style.left -= elWidth;
      }
      if (style.top < 0) {
        style.top = elHeight < innerHeight ? (innerHeight - elHeight) / 2 : 0;
      }
      if (style.left < 0) {
        style.left = elWidth < innerWidth ? (innerWidth - elWidth) / 2 : 0;
      }
      return style;
    }
  }

  function hideMenu() {
    show.value = false;
  }
  return {
    bindingValue,
    contextmenu,
    getPosition,
    hideMenu,
    showMenu,
    show,
  };
}
