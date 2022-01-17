<script>
import { h, Fragment } from 'vue'
import { users } from '~/utils/users'

export default {
  name: 'RenderFrameSlot',
  setup(_props, { slots }) {
    return () => [
      h('div', { class: 'yolo' }, [h(Fragment, null, slots.header() || 'default table header')]),
      h('div', { class: 'border-4 border-success-400' }, [
        h(
          'div',
          null,
          slots.default?.() ||
            users.map(({ id, email }) => {
              return h('p', { key: id }, email)
            }),
        ),
      ]),
    ]
  },
}
</script>
