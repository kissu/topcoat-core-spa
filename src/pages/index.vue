<script setup>
import vueLogo from '~/assets/images/vue_logo.png'
</script>

<script>
export default {
  data() {
    return {
      envVariable: import.meta.env.VITE_TEST,
    }
  },
}
</script>

<template>
  <div>
    <!-- Note: need to make a library like page for all components -->
    <h1>Search Filters</h1>
    <search-filter outlined rounded label="Outlined & Animated Label"></search-filter>
    <search-filter disableLabelAnimation label="Flat & Fixed Label with Error" error></search-filter>
    <search-filter label="Flat & Animated Label"></search-filter>
  </div>
</template>
