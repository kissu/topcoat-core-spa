<script>
import { h } from 'vue'
import SimplyFullyFeaturedSetup from '~/components/experimentations/SimpleFullyFeaturedSetup.vue'

export default {
  setup() {
    // const response = ref({})

    return () => [
      h(
        SimplyFullyFeaturedSetup,
        { class: 'border-2 border-secondary-400' },
        {
          default: () => 'hehe',
          footer: ({ footerPlaceholder }) => `${footerPlaceholder} big foot ${footerPlaceholder}`,
        },
      ),
    ]
  },
}
</script>
