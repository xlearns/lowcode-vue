<script setup>
defineProps({
  w: Number,
  h: Number,
  x: Number,
  y: Number,
  z: Number,
});
</script>

<template>
  <div
    :style="{
      width: `${w}px`,
      height: `${h}px`,
      left: `${x}px`,
      top: `${y}px`,
      zIndex: z,
    }"
    class="absolute"
  >
    <slot />
  </div>
</template>

<style scoped></style>
