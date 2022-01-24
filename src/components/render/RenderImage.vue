<script>
import { h } from 'vue'

export default {
  name: 'RenderImage',
  setup(_props, { slots }) {
    const wrappingDiv = h('div', { class: 'border border-error-500 w-72' }, () => slots.default())
    const title = h('h1', {}, 'This is a nice title')
    const section = h('section', {}, [
      h('img', { src: 'https://source.unsplash.com/random/200x200', class: 'h-auto' }),
      h('p', { class: 'text-successuy-700 font-bold' }, 'Interesting piece of image'),
    ])

    return () => [h(wrappingDiv, null, [title, section])]
  },
}
</script>
