<script>
import { useFetch } from '@vueuse/core'
import { useListElementsStore } from '~/stores/listElements'

export default {
  async setup() {
    const listElementsStore = useListElementsStore()

    const { data } = await useFetch('https://picsum.photos/v2/list?limit=10').get().json()
    listElementsStore.$patch((state) => {
      state.allListElements['xyz-images'] = data // unique ID here
    })
  },
}
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <router-view />
    <the-footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">[Default Layout]</div>
  </main>
</template>
