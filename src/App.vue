<template>
  <suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div style="background-color: teal">Loading the page async...</div>
    </template>
  </suspense>
</template>
