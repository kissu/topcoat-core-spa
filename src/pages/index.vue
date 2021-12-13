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
    <search-filter outlined rounded clearIcon label="Outlined, Clear Icon & Animated Label"></search-filter>
    <search-filter error outlined rounded label="Outlined, Animated Label & Error"></search-filter>
    <search-filter outlined rounded label="Outlined & Fixed Label" fixedLabel></search-filter>
    <search-filter label="No Outline"></search-filter>
  </div>
</template>
