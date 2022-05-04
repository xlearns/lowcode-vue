<script setup>
import { ref, watch } from "vue";
import { usePanel } from "@/hooks/usePanel";
import { useStyle } from "@/hooks/useStyleSider";
let { current, currentForm: form, scalc, rootStyle: size } = usePanel();
let { PosAndSize, rootStyle, beforeAvatarUpload, change, bgImg } = useStyle();
</script>

<template>
  <div class="h-100% bg-[#212c3d] text-[#fff] relative" @mousedown.stop>
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
        <div class="title mb-1em">背景图</div>
        <el-upload
          action=""
          class="avatar-uploader"
          @change="change"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="bgImg" :src="bgImg" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /> </el-icon>
        </el-upload>
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
.avatar-uploader ::v-deep(.el-upload) {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
}

.avatar-uploader ::v-deep(.el-upload:hover) {
  border-color: #409eff;
}

::v-deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 104px;
  height: 104px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 104px;
  height: 104px;
  display: block;
}
</style>
