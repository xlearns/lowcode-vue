<script setup>
import { ref, watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
import { useStyle } from "@/hooks/useStyleSider";
let { current, currentForm: form, scalc, rootStyle: size } = usePanel();
let { PosAndSize, rootStyle } = useStyle();
</script>

<template>
  <div class="h-100% bg-[#212c3d] text-[#fff] relative">
    <div v-if="current">
      <div class="box">{{ current.label }}</div>
      <div class="box">
        <div class="title">位置和尺寸</div>
        <div
          class="flex justify-center"
          v-for="(item, index) in PosAndSize"
          :key="index"
        >
          <el-row v-for="(v, i) in item" :key="i">
            <span class="ml-3 inline-flex items-center text-[#fff]">{{
              v.label
            }}</span>
            <el-input type="number" v-model="current[v.key]" class="w-20 m-4" />
          </el-row>
        </div>
      </div>
      <div class="box">
        <div class="title">颜色</div>
      </div>
      <div class="box">
        <div class="title">文字</div>
      </div>
    </div>
    <div v-else>
      <div class="box">
        <div class="title">画布尺寸</div>
        <div
          class="flex justify-center"
          v-for="(item, index) in rootStyle"
          :key="index"
        >
          <el-row v-for="(v, i) in item" :key="i">
            <span class="ml-3 inline-flex items-center text-[#fff]">{{
              v.label
            }}</span>

            <el-input type="number" v-model="size[v.key]" class="w-20 m-3" />
          </el-row>
        </div>
      </div>
      <div class="box">
        <div class="title">页面颜色</div>
      </div>
      <div class="box">
        <div class="title">背景图</div>
      </div>
      <div class="slider-demo-block absolute bottom-[25px] left-[-20px]">
        <el-slider v-model="scalc" vertical height="100px" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  padding: 10px 12px;
  border-bottom: 1px solid #303247;
}
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
