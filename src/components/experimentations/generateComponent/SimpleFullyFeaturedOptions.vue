<script>
import { useFetch } from '@vueuse/core'

export default {
  data() {
    return {
      randomImage: '',
      counter: 0,
      footerPlaceholder: '👣 hehe 👣',
    }
  },
  async mounted() {
    const { data } = await useFetch('https://picsum.photos/v2/list?limit=1').get().json()
    this.randomImage = data.value[0].download_url
  },
  methods: {
    incrementCounter() {
      this.counter++
    },
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
