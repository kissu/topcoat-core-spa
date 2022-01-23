<script>
import { h } from 'vue'

export default {
  setup() {
    /* eslint-disable */
    //* should not be viable!
    return () => h('div', null, [
      h('p'),
      h('div'),
      h('p'),
      h('div')
    ])
  },
}
</script>
