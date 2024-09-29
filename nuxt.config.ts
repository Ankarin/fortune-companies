export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "nuxt-security"],
  ssr: true,
  app: {
    head: {
      title: "Fortune Companies",
      meta: [{ name: "application-name", content: "Fortune Companies" }],
    },
  },
  plugins: ["~/plugins/vue-query.ts"],
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

  shadcn: {
    prefix: "",
    componentDir: "/components/ui",
  },

  compatibilityDate: "2024-09-27",

  devtools: {
    enabled: true,
  },

  security: {
    rateLimiter: {
      driver: {
        name: "redis",
        options: {
          url: process.env.REDIS_URL as string,
        },
      },
    },
  },
});
