<template>
    <div>
        <h1 class="text-2xl">add Blog</h1>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <NuxtLink to="/blog">BACK</NuxtLink>

        </button>
        <form class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="onsubmit">
            <div class=" flex gap-10">
                <label for="title">Title</label>
                <input class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" type="text" id="title"
                    name="title" placeholder="Enter title" required v-model="form.title" />
            </div>
            <div class="flex gap-10">

                <label for="content">Content</label>
                <textarea id="content" name="content" placeholder="write your content" required
                    v-model="form.content"></textarea>
            </div>
            <div class="flex gap-10">
                <label for="picture">picture</label>
                <input type="text" id="picture" name="picture" placeholder="Enter url" required v-model="form.picture" />
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit
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
    title: 'Add title',
    content: 'default content ',
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