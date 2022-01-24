<script>
import { h } from 'vue'
import TestScopedSlot from '~/components/experimentations/TestScopedSlot.vue'

export default {
  setup() {
    return () => [
      h(TestScopedSlot, null, {
        header: ({ placeholderData }) =>
          `This is a named slot + scoped slot: ${placeholderData} from the parent`,
      }),
    ]
  },
}
</script>
