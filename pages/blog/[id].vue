<template>
    <div>
        <h1>Blog detail</h1>
        <div v-if="blog && !isEdit">
            <h2>{{ blog?.title ? blog.title : `Aucun titre #${blog.id}` }}</h2>
            <p>{{ blog.content }}</p>

            <button @click="isEdit = !isEdit">Edit</button>
        </div>


        <div v-else-if="blog && isEdit">
            <form>
                <input v-model="blog.title" />
                <textarea v-model="blog.content" />
                <button type="submit" @click="onSubmit">Save</button>
            </form>
        </div>
        <div v-else>
            <h2>Blog not found</h2>
        </div>
        <button>Delete</button>
        <br />
        <span>crée le : {{ blog?.createdAt }}</span>
        <br />
        <span>modifé le : {{ blog?.updatedAt }}</span>

    </div>
</template>

<script setup lang="ts">

import type BlogModel from '~/types/blog';

useHead({
    title: 'Blog Page',

})

const isEdit = ref(false)
const formData = reactive({
    title: '',
    content: ''
})
const route = useRoute()
interface IBlogModel {
    data: BlogModel
}
const { data: item, error } = await useFetch<IBlogModel>('/api/blog/' + route.params.id, {
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
        const { data: item } = await useFetch<{ data: number }>('/api/blog/' + route.params.id, {
            method: 'PUT',
            body: JSON.stringify({
                title: blog.value?.title,
                content: blog.value?.content
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

</script>

<style scoped></style>