<script>
import { h } from 'vue'
import SimpleFullyFeaturedSetup from '~/components/experimentations/generateComponent/SimpleFullyFeaturedSetup.vue'
import SimpleFullyFeaturedOptions from '~/components/experimentations/generateComponent/SimpleFullyFeaturedOptions.vue'

export default {
  setup() {
    // const response = ref({})

    return () => [
      h(
        SimpleFullyFeaturedSetup,
        { class: 'border-2 border-secondary-400' },
        {
          default: () => 'hehe',
          footer: ({ footerPlaceholder }) => `${footerPlaceholder} big foot ${footerPlaceholder}`,
        },
      ),
      h(
        SimpleFullyFeaturedOptions,
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
