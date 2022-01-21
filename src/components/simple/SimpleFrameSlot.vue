<script>
import { users } from '~/utils/users'

export default {
  name: 'SimpleFrameSlot',
  props: {
    divider: {
      type: String,
      default: '2',
    },
  },
  data() {
    return {
      users,
    }
  },
  computed: {
    console: () => console,
  },
}
</script>

<template>
  <div class="yolo">
    <slot name="header">default table header</slot>
  </div>
  <div class="border-4 border-success-400">
    <slot>
      <div v-for="{ id, name, email } in users" :key="id">
        <template v-if="id % divider === 0">
          <p @click="console.log(`clicked on ${name}!`)">id: {{ id }} >> {{ email }}</p>
        </template>
      </div>
    </slot>
  </div>
</template>
