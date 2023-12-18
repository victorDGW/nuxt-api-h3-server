// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: true,
	modules: ["@unocss/nuxt", "@nuxtjs/tailwindcss"],
})
