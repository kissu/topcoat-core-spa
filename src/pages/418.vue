<template>
  <global-component />
  <render-image />
  <section>
    <simple-frame-slot divider="3">
      <template #header><p class="text-warning-400 font-bold">custom header here</p></template>
    </simple-frame-slot>
  </section>
</template>
