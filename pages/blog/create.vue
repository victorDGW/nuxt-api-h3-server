<template>
    <div>
        <h1 class="text-2xl">add Blog</h1>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2">
            <NuxtLink to="/blog">BACK</NuxtLink>

        </button>
        <form class="my-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="onsubmit">
            <div class=" flex gap-10">
                <label class="min-w-1/8 p-2" for="title">Title</label>
                <input class="lg:w-lg block mb-2  color-blue-600 text-gray-900 dark:text-white p-2" type="text" id="title"
                    name="title" placeholder="Enter title" required v-model="form.title" />
            </div>
            <div class="flex gap-10">

                <label class="min-w-1/8 p-2" for="content">Content</label>
                <textarea class=" lg:w-lg resize-y min-h-40 p-2" id="content" name="content"
                    placeholder="write your content" required v-model="form.content"></textarea>
            </div>
            <div class="flex gap-10">
                <label class="min-w-1/8 p-2" for="picture">picture</label>
                <input class="lg:w-lg p-2" type="text" id="picture" name="picture" placeholder="Enter url" required
                    v-model="form.picture" />
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">Submit
                post</button>


        </form>

    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'add Blog',

})
const BASE_URL = useRuntimeConfig().public.BASE_URL
const router = useRouter()

const form = reactive({
    title: '',
    content: '',
    picture: 'https://placehold.co/400'
})

const onsubmit = async () => {
    try {
        await $fetch(`${BASE_URL}/api/blog/`, {
            method: 'POST',
            body: JSON.stringify(form)
        })
        router.push('/blog')

    } catch (error) {
        alert('error to create blog')
        console.log(error)
        throw error

    }
    console.log(form)


}

</script>

<style scoped></style>