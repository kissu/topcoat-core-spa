<script>
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

export default {
  async setup() {
    const randomImage = ref('')
    const { data } = await useFetch('https://picsum.photos/v2/list?limit=1').get().json()
    randomImage.value = data.value[0].download_url

    const counter = ref(0)
    const footerPlaceholder = ref('👣 hehe 👣')

    const incrementCounter = () => {
      counter.value++
    }

    return {
      counter,
      incrementCounter,
      footerPlaceholder,
      randomImage,
    }
  },
}
</script>

<template>
  <div>
    <div>I'm a fully featured component tbh!</div>
    <button @click="incrementCounter">Increment counter</button>
    <p>{{ counter }}</p>
    <p>
      <slot>default slot</slot>
    </p>
    <main class="flex justify-center">
      <img class="h-48" :src="randomImage" />
    </main>
    <footer>
      <slot name="footer" :footerPlaceholder="footerPlaceholder">
        default footer slot: {{ footerPlaceholder }}
      </slot>
    </footer>
  </div>
</template>
