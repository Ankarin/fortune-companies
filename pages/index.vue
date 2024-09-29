<template>
  <NuxtLayout name="search">
    <div v-if="error" class="text-center text-red-500">
      "Sorry, something went wrong. Please try again later."
    </div>
    <template v-else>
      <div v-if="isPending && !companies.length" class="text-center">
        <p class="text-lg mt-2">Loading companies...</p>
      </div>
      <div v-else-if="!isPending && !companies.length" class="text-center">
        <p class="text-lg font-semibold text-gray-700">No companies found</p>
        <p class="mt-2 text-sm text-gray-500">
          Try adjusting your search criteria
        </p>
      </div>
      <template v-else>
        <CompanyCards v-if="view === 'card'" :companies="companies" />
        <CompanyTable :companies="companies" v-else />
      </template>
    </template>
    <div v-if="isFetchingNextPage" class="text-center">
      <p class="text-lg mt-2">Loading more companies...</p>
    </div>
    <div ref="sentinel" class="h-10" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import CompanyCards from "@/components/cards-view/CompanyCards.vue";
import CompanyTable from "@/components/table-view/CompanyTable.vue";
import { useCompanySearch } from "~/composables/useCompanySearch";

definePageMeta({
  layout: false,
});

const route = useRoute();
const view = computed(() => (route.query.view as "card" | "table") || "card");

const {
  companies,
  isPending,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useCompanySearch();

const sentinel = ref<HTMLElement | null>(null);

onMounted(() => {
  if (sentinel.value) {
    const { stop } = useIntersectionObserver(
      sentinel,
      ([{ isIntersecting }]) => {
        if (isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    onUnmounted(stop);
  }
});
</script>
