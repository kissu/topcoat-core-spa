<script>
export default {
  name: 'TestScopedSlot',
  data() {
    return {
      placeholderData: '⭐ very place, much holder ⭐',
    }
  },
}
</script>

<template>
  <div>
    <slot name="header" :placeholderData="placeholderData">default content</slot>
  </div>
</template>
