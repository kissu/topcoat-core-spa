<script>
import { h, ref } from 'vue'
import { useFetch } from '@vueuse/core'

export default {
  name: 'RenderIterateTemplate',
  async setup() {
    const users = ref([])
    const { data } = await useFetch('https://jsonplaceholder.typicode.com/users').get().json()
    users.value = data.value

    return () => [
      h('section', null, [
        h(
          'h1',
          { class: 'text-3xl font-bold text-secondary-400' },
          'Render-function rendered template hardcoded',
        ),
        h('article', { class: 'mx-auto w-48' }, [
          h('p', { class: 'text-successuy-700 font-bold' }, 'Interesting image'),
          h('img', { src: 'https://source.unsplash.com/random/200x200', class: 'h-auto' }),
        ]),
        h('br', null),
        h('br', null),
        h('p', { onClick: () => console.log('regular click') }, [
          'We do have some ',
          h('span', { class: 'font-black text-error-400' }, 'fancy users'),
          ' below',
        ]),
        h(
          'ul',
          null,
          users.value.map((user) => {
            if (user.id % 2 === 0) {
              return [
                h(
                  'li',
                  {
                    key: user.id,
                  },
                  [h('span', { class: 'italic text-success-200' }, 'user >> '), user.email],
                ),
              ]
            }
          }),
        ),
      ]),
      h('div', null, 'i am at root level'),
      h('p', null, ['same here ', h('span', null, 'nested')]),
    ]
  },
}
</script>
