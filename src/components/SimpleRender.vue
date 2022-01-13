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

<style>
/* <div class="border border-error-500 w-72">
    <h1>This is a nice title</h1>
    <section>
      <img src="https://source.unsplash.com/random/200x200" class="h-auto" />
      <p class="text-successuy-700 font-bold">Interesting piece of image</p>
    </section>
  </div> */
</style>
