<script>
import { h, resolveComponent } from 'vue'

import RenderImage from '~/components/render/RenderImage.vue'
import RenderFrameSlot from '~/components/render/RenderFrameSlot.vue'
const dynamicNamedSlot = 'header'

export default {
  setup() {
    const globalComponent = resolveComponent('GlobalComponent')

    return () => [
      h(globalComponent),
      h(RenderImage),
      h(RenderFrameSlot, null, {
        [dynamicNamedSlot]: () => h('p', { class: 'text-warning-400 font-bold' }),
        // default: () => h('p', 'test default'),
      }),
    ]
  },
}
</script>
