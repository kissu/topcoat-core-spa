<script>
import { h, resolveComponent } from 'vue'
// import { users } from '~/utils/users'

import RenderImage from '~/components/render/RenderImage.vue'
import RenderFrameSlot from '~/components/render/RenderFrameSlot.vue'
const dynamicNamedSlot = 'header'

export default {
  setup() {
    const globalComponent = resolveComponent('GlobalComponent')

    return () => [
      h(globalComponent),
      h(RenderImage),
      h(
        RenderFrameSlot,
        { divider: '4' },
        {
          [dynamicNamedSlot]: () => h('div', { class: 'text-warning-400 font-bold' }, 'custom here'),
          // default: () => h('p', 'test default'),
        },
      ),
    ]
  },
}
</script>
