// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: true,
	modules: ["@unocss/nuxt", "@nuxtjs/tailwindcss"],
	devServer: {
		port: process.env.PORT ? Number(process.env.PORT) : 3000,
	},

	runtimeConfig: {
		public: {
			BASE_URL: `http://localhost:${process.env.PORT}`,
		},
	},
})
