<script setup>
import { watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
let { current, currentForm: form } = usePanel();
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
    </el-form>
  </div>
</template>

<style scoped></style>
