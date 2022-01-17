<template>
  <section>
    <test-slotted-component>
      <template #header><p class="nice">custom header here</p></template>
      <!-- <p>nice</p> -->
      <!-- <div v-for="user in users" :key="user.id">{{ user.email }}</div> -->
    </test-slotted-component>
  </section>
</template>

<script>
import { users } from '~/utils/users'

export default {
  data() {
    return {
      users,
    }
  },
}
</script>

<style scoped>
:deep(.nice) {
  background: #f00;
}
</style>
