<script setup lang="ts">
import { watch } from "vue";

const props = defineProps({
  current: {
    type: Object,
    default: () => {
      return null;
    },
  },
  form: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>

<template>
  <div v-if="current">
    <div class="title">{{ current.label }}</div>
    <el-form label-width="120px">
      <el-form-item
        v-for="formItem in form"
        :key="formItem?.key"
        :label="formItem?.label"
      >
        <el-input></el-input>
        <!-- <component v-model="styles[formItem.key]" :is="formItem.component" /> -->
      </el-form-item>
      <el-button>保存</el-button>
    </el-form>
  </div>
</template>

<style scoped></style>
