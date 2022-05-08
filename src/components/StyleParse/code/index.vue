<script setup>
import { ref, watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
import * as data from "@/components/custom/echarts";
import Codemirror from "codemirror-editor-vue3";
// language
import "codemirror/mode/javascript/javascript.js";
// theme
import "codemirror/theme/dracula.css";

let { current, currentForm } = usePanel();
let key = currentForm.value[0]["key"];

let code =
  JSON.stringify(current.value?.value, null, 2) ||
  JSON.stringify(data[key], null, 2);
let val = ref(code);
watch(
  () => current?.value?.value,
  () => {
    if (!current?.value) return;
    key = currentForm.value[0]["key"];
    code =
      JSON.stringify(current.value?.value, null, 2) ||
      JSON.stringify(data[key], null, 2);
    val.value = code;
  }
);

watch(
  () => val.value,
  () => {
    current.value.value = JSON.parse(val.value);
  }
);

const cmOptions = {
  mode: "text/javascript", // Language mode
  theme: "dracula", // Theme
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
};
</script>

<template>
  <Codemirror v-model:value="val" :options="cmOptions" :height="200" />
</template>

<style scoped></style>
