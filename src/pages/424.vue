<script>
import { h } from 'vue'
import SimplyFullyFeaturedSetup from '~/components/experimentations/generateComponent/SimpleFullyFeaturedSetup.vue'
import SimplyFullyFeaturedOptions from '~/components/experimentations/generateComponent/SimpleFullyFeaturedOptions.vue'

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
      h(
        SimplyFullyFeaturedOptions,
        { class: 'border-2 border-success-600' },
        {
          default: () => 'hehe',
          footer: ({ footerPlaceholder }) => `${footerPlaceholder} big foot ${footerPlaceholder}`,
        },
      ),
    ]
  },
}
</script>
