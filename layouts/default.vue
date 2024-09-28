<template>
  <div class="min-h-screen bg-background">
    <header class="border-b fixed top-0 left-0 right-0 bg-background z-10">
      <div class="container mx-auto h-16 flex justify-between items-center">
        <h1 class="text-2xl font-bold hidden md:block">Fortune Companies</h1>
        <div class="flex items-center space-x-4 w-full md:w-auto">
          <div class="flex-grow md:flex-grow-0 md:w-64">
            <SearchInput />
          </div>
          <ViewSwitcher v-model="view" />
        </div>
      </div>
    </header>
    <main class="container mx-auto py-6 pt-20">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import SearchInput from "@/components/SearchInput.vue";
import ViewSwitcher from "@/components/ViewSwitcher.vue";

const router = useRouter();
const route = useRoute();
const view = ref<"card" | "table">(
  (route.query.view as "card" | "table") || "card",
);

watch(view, (newView) => {
  router.push({ query: { ...router.currentRoute.value.query, view: newView } });
});
</script>
