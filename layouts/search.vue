<template>
  <div class="min-h-screen bg-background flex flex-col" @scroll="handleScroll">
    <header class="border-b fixed top-0 left-0 right-0 bg-background z-10">
      <div
        class="md:container px-4 mx-auto h-14 flex justify-between items-center"
      >
        <div class="flex items-center space-x-2 mr-4">
          <router-link to="/" class="flex items-center space-x-2">
            <img
              src="/logo.svg"
              alt="Fortune Companies Logo"
              class="w-10 h-10"
            />
            <h1 class="text-2xl font-bold hidden md:block">
              Fortune Companies
            </h1>
          </router-link>
        </div>
        <div class="flex items-center space-x-4 flex-grow md:flex-grow-0">
          <div class="flex-grow md:w-64">
            <SearchInput />
          </div>
          <ViewSwitcher v-model="view" />
        </div>
      </div>
    </header>
    <main class="md:container px-4 mx-auto py-6 pt-20 pb-16">
      <slot />
      <div v-if="isFetchingNextPage" class="text-center">
        <p class="mt-2 text-sm text-gray-500">Loading more companies...</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import SearchInput from "@/components/SearchInput.vue";
import ViewSwitcher from "@/components/ViewSwitcher.vue";
import { useCompanySearch } from "~/composables/useCompanySearch";

const router = useRouter();
const route = useRoute();
const view = ref<"card" | "table">(
  (route.query.view as "card" | "table") || "card",
);
const loading = ref(true);

onMounted(() => {
  loading.value = false;
});

watch(view, (newView) => {
  router.push({ query: { ...router.currentRoute.value.query, view: newView } });
});

const { fetchNextPage, hasNextPage, isFetchingNextPage } = useCompanySearch();

const handleScroll = () => {
  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
  if (bottom && hasNextPage.value) {
    fetchNextPage();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
