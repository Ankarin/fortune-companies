export default defineNuxtConfig({
  app: {
    head: {
      title: "Fortune Companies",
      meta: [{ name: "application-name", content: "Fortune Companies" }],
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
      },
    },
  },

  build: {
    transpile: ["@heroicons/vue"],
  },

  runtimeConfig: {
    public: {
      apiBase: "/api",
    },
  },

  nitro: {
    preset: "vercel",
  },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "/components/ui",
  },

  // ignore: ['/components/ui/*'],
  compatibilityDate: "2024-09-27",
});
