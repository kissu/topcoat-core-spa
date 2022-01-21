<script>
import { h, ref, Fragment } from 'vue'
import { useFetch } from '@vueuse/core'

export default {
  name: 'RenderFrameSlot',
  props: {
    divider: {
      type: String,
      default: '2',
    },
  },
  async setup(props, { slots }) {
    const users = ref([])
    const { data } = await useFetch('https://jsonplaceholder.typicode.com/users').get().json()
    users.value = data.value

    return () => [
      h('p', props.divider),
      h('div', { class: 'yolo' }, [h('div', null, slots.header?.() || 'default table header')]),
      // h('div', { class: 'yolo' }, [h(Fragment, null, slots.header?.() || 'default table header')]),
      h('div', { class: 'border-4 border-success-400' }, [
        h(
          'div',
          null,
          slots.default?.() ||
            users.value.map(({ id, name, email }) => {
              if (id % props.divider === 0) {
                return h(
                  'p',
                  {
                    key: id,
                    onClick: () => console.log(`clicked on ${name}!`),
                    // onMouseover: () => console.warn(`HOVER ${name}!`),
                  },
                  `id: ${id} >> ${email}`,
                )
              }
            }),
        ),
      ]),
    ]
  },
}
</script>
