<template>
    <div>
        <h1 class="text-2xl">Blog detail</h1>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <NuxtLink to="/blog">BACK</NuxtLink>

        </button>
        <div v-if="blog && !isEdit">
            <h2>{{ blog?.title ? blog.title : `Aucun titre #${blog.id}` }}</h2>
            <p>{{ blog.content }}</p>
            <img class="rounded" width='400px' :src="blog.picture" alt="blog picture" />
            <br />
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="isEdit = !isEdit">Edit</button>

        </div>


        <div v-else-if="blog && isEdit">
            <form class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class=" flex gap-10">

                    <label for="title">Title</label>
                    <input class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" v-model="blog.title" />
                </div>
                <div class="flex gap-10">
                    <label for="content">Content</label>
                    <textarea v-model="blog.content" />
                </div>
                <div class="flex gap-10">
                    <label for="picture">picture</label>
                    <input v-model="blog.picture" />
                </div>
                <br />
                <span>crée le : {{ blog?.createdAt }}</span>
                <br />
                <span>modifé le : {{ blog?.updatedAt }}</span>
                <br />
                <button class="text-white bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                    @click="onSubmit">Save</button>
            </form>
        </div>
        <div v-else>
            <h2>Blog not found</h2>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="onDelete">Delete</button>
        <br />


    </div>
</template>

<script setup lang="ts">

import type BlogModel from '~/types/blog';
const BASE_URL = useRuntimeConfig().public.BASE_URL
console.log(BASE_URL)
useHead({
    title: 'Blog Page',

})

const isEdit = ref(false)
const formData = reactive({
    title: '',
    content: '',
    picture: ''
})
const route = useRoute()
const router = useRouter()
interface IBlogModel {
    data: BlogModel
}
const { data: item, error } = await useFetch<IBlogModel>(`${BASE_URL}/api/blog/${route.params.id}`, {
    pick: ['data'],


})

if (error.value) {
    console.log(error.value)
}
const blog = computed(() => item.value?.data ? item.value.data : undefined)

const onSubmit = async (e: Event) => {
    e.preventDefault()
    try {
        console.debug('submit', blog.value)
        const { data: item } = await useFetch<{ data: number }>(`${BASE_URL}/api/blog/${route.params.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: blog.value?.title,
                content: blog.value?.content,
                picture: blog.value?.picture
            })

        })
        if (item.value?.data) {
            isEdit.value = false
        }
    }



    catch (error: any) {
        isEdit.value = true
        console.error(error)
        throw error
    }



}

const onDelete = async () => {
    try {
        console.log('delete', route.params.id)
        const { data: item } = await useFetch<{ data: number }>(`${BASE_URL}/api/blog/${route.params.id}`, {
            method: 'DELETE',

        })
        console.log(item)
        if (item.value?.data) {
            router.push('/blog')
        }
    } catch (error: any) {
        console.error(error)
        alert('error to delete blog')
        throw error
    }
}

</script>

<style scoped></style>