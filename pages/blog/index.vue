
<template>
  <div>
    <h1>HOME PAGE</h1>
    <button>
      <NuxtLink to="/blog/create">Add Blog</NuxtLink>
    </button>
    <div v-for="blog in items?.data" :key="blog.id">
      <h2>{{ blog?.title ? blog.title : `Aucun titre #${blog.id}` }}</h2>
      <p>{{ blog.content }}</p>
      <NuxtLink :to="`/blog/${blog.id}`">Detail / edit</NuxtLink>

    </div>
  </div>
</template>
<script lang="ts" setup>
import type BlogModel from '~/types/blog';

interface Idata {
  data: BlogModel[]
}

const { data: items, error } = await useFetch<Idata>('./api/blog/', {
  pick: ['data']

})

if (error.value) {
  console.log(error.value)
}

watch(() => items.value, (newVal, oldVal) => {
  console.log('---', newVal?.data)
  console.log(oldVal)
})





</script>


<style scoped></style>
