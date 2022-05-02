import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:windi.css";

import VueDragResize from "vue-drag-resize";

const app = createApp(App);
app.use((Vue) => {
  Vue.component("Dragger", VueDragResize);
});
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount("#app");
