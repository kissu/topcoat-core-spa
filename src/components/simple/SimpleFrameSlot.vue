<template>
  <div class="yolo">
    <slot name="header">default table header</slot>
  </div>
  <div class="border-4 border-success-400">
    <slot>
      <div v-for="user in users" :key="user.id">{{ user.email }}</div>
    </slot>
  </div>
</template>

<script>
import { users } from '~/utils/users'

export default {
  name: 'SimpleFrameSlot',
  data() {
    return {
      users,
    }
  },
}
</script>
