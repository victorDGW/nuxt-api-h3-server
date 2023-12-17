<template>
    <div>
        <h1>add Blog</h1>
        <form @submit.prevent="onsubmit">
            <div>
                <label for="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Enter title" required v-model="form.title" />
            </div>
            <div>

                <label for="content">Content</label>
                <textarea id="content" name="content" placeholder="write your content" required
                    v-model="form.content"></textarea>
            </div>
            <button type="submit">Submit post</button>
            <NuxtLink to="/blog">Back</NuxtLink>

        </form>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'add Blog',

})
const router = useRouter()

const form = reactive({
    title: 'Add title',
    content: 'default content '
})

const onsubmit = async () => {
    try {
        await $fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify(form)
        })
        router.push('/blog')

    } catch (error) {
        console.log(error)
        throw error

    }
    console.log(form)


}

</script>

<style scoped></style>