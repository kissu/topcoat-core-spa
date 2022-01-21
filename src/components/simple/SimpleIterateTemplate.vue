<script>
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

export default {
  async setup() {
    const users = ref([])
    const { data } = await useFetch('https://jsonplaceholder.typicode.com/users').get().json()
    users.value = data.value

    return { users }
  },
}
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold text-secondary-400">Template rendered template</h1>
    <article class="mx-auto w-48">
      <p class="text-successuy-700 font-bold">Interesting image</p>
      <img src="https://source.unsplash.com/random/200x200" class="h-auto" />
    </article>
    <br />
    <br />

    <p>We do have some <span class="font-black text-error-400">fancy users</span> below</p>
    <ul>
      <li v-for="user in users" :key="user.id">
        <span class="italic text-success-200">user >></span> {{ user.email }}
      </li>
    </ul>
  </section>

  <div>
    okay
    <p>
      I'm deeply
      <span>nested</span>
    </p>
  </div>
</template>
