
<template>
  <div>
    <h1 class="text-2xl ">Blog List</h1>
    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      <NuxtLink to="/blog/create">Add Blog</NuxtLink>
    </button>
    <div class=" flex  flex-wrap rounded bg-blue-200 p-2 m-2 gap-10">

      <div class="flex-1  max-w-300px min-w300px m-4 p-6 bg-gray-200 rounded-lg" v-for="blog in itemsOrderByDesc"
        :key="blog.id">
        <div class="flex flex-col  ">
          <div>
            <h2 class="text-xl font-bold">{{ blog?.title ? blog.title : `Aucun titre #${blog.id}` }}</h2>
            <p>{{ blog.content }}</p>
            <img class="rounded " width="" :src="blog.picture" :alt="`image-${blog.title}.jpg `" />
            <br />
          </div>

          <div class="toto flex-1">

            <span>crée le : {{ blog.createdAt }}</span>
            <br />
            <span>modifé le : {{ blog.updatedAt }}</span>


            <br />
            <button class=" flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <NuxtLink :to="`/blog/${blog.id}`">Detail / edit</NuxtLink>
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
import type BlogModel from '~/types/blog';
const BASE_URL = useRuntimeConfig().public.BASE_URL
interface Idata {
  data: BlogModel[]
}
console.log(BASE_URL)
const { data: items, error } = await useFetch<Idata>(`${BASE_URL}/api/blog/`, {
  pick: ['data']

})
const itemsOrderByDesc = computed(() => {
  if (items.value) {
    return items.value.data.slice().sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    });
  } else {
    return [];
  }
});

if (error.value) {
  console.log(error.value)
}

watch(() => items.value, (newVal, oldVal) => {
  console.log('---', newVal?.data)
  console.log(oldVal)
})





</script>


<style scoped></style>
