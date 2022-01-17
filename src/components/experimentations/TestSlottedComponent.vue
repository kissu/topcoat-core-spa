<template>
  <div class="yolo">
    <slot name="header">default table header</slot>
  </div>
  <slot> iterated content </slot>
</template>

<style scoped>
.yolo :slotted(*) {
  @apply text-primary-500;
}
</style>
