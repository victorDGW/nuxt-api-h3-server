
<template>
  <div>
    <h1 class="text-2xl ">Blog List</h1>
    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      <NuxtLink to="/blog/create">Add Blog</NuxtLink>
    </button>
    <div class="flex flex-wrap rounded bg-blue-200 p-2 m-2 gap-10">
      <div class="flex-1 m-4 p-6 bg-gray-200 rounded-lg" v-for="blog in items?.data" :key="blog.id">
        <div>
          <h2 class="text-xl font-bold">{{ blog?.title ? blog.title : `Aucun titre #${blog.id}` }}</h2>
          <p>{{ blog.content }}</p>
          <img width="120" :src="blog.picture" :alt="`image-${blog.title}.jpg `" />
          <br />
          <span>crée le : {{ blog.createdAt }}</span>
          <br />
          <span>modifé le : {{ blog.updatedAt }}</span>


          <br />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <NuxtLink :to="`/blog/${blog.id}`">Detail / edit</NuxtLink>
          </button>
        </div>


      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
import type BlogModel from '~/types/blog';

interface Idata {
  data: BlogModel[]
}

const { data: items, error } = await useFetch<Idata>('http://localhost:3001/api/blog/', {
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
