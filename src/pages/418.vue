<template>
  <global-component />
  <render-image />
  <section>
    <simple-frame-slot>
      <template #header><p class="text-warning-400 font-bold">custom header here</p></template>
    </simple-frame-slot>
  </section>
</template>
