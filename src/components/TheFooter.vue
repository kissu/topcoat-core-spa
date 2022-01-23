<script setup>
import { toggleDark } from '~/composables'
</script>

<script>
export default {
  name: 'TheFooter',
}
</script>

<template>
  <hr />
  <br />
  <br />
  <button class="icon-btn mx-2 !outline-none" @click="toggleDark">
    <button class="i-carbon-sun dark:i-carbon-moon" text="primary-300 dark:secondary-500"></button>
  </button>
</template>
