import type {
  DehydratedState,
  VueQueryPluginOptions,
} from "@tanstack/vue-query";
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from "@tanstack/vue-query";
import { useState } from "#app";

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>("vue-query");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30,
      },
    },
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (process.server) {
    nuxt.hooks.hook("app:rendered", () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (process.client) {
    nuxt.hooks.hook("app:created", () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});
