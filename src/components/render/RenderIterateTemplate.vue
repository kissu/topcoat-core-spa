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
      h('section', {}, [
        h('h1', { class: 'text-3xl font-bold text-secondary-400' }, 'Render-function rendered template'),
        h('article', { class: 'mx-auto w-48' }, [
          h('p', { class: 'text-successuy-700 font-bold' }, 'Interesting image'),
          h('img', { src: 'https://source.unsplash.com/random/200x200', class: 'h-auto' }),
        ]),
        h('br', {}, []),
        h('br', {}, []),
        h('p', {}, [
          'We do have some ',
          h('span', { class: 'font-black text-error-400' }, 'fancy users'),
          ' below',
        ]),
        h(
          'ul',
          null,
          users.value.map((user) => {
            return [
              h(
                'li',
                {
                  key: user.id,
                },
                [h('span', { class: 'italic text-success-200' }, 'user >> '), user.email],
              ),
            ]
          }),
        ),
      ]),
      h('div', null, 'okay'),
      h('p', null, ["I'm deeply ", h('span', null, 'nested')]),
    ]
  },
}
</script>
