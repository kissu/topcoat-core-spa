<script>
import { h, defineComponent } from 'vue'

export default {
  setup() {
    const SimpleButton = defineComponent({
      name: 'CookieTest',
      setup() {
        return () =>
          h(
            'button',
            {
              onClick: () => console.log('clicked'),
            },
            'click on me',
          )
      },
    })

    return () => [h('h2', 'nice'), h(SimpleButton)]
  },
}
</script>
