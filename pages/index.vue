<template>
  <div class="space-y-6">
    <div v-if="isLoading && !data" class="text-center">
      <Spinner class="h-8 w-8 animate-spin" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    <template v-else>
      <CompanyCards v-if="view === 'card'" :companies="data || []" />
      <CompanyTable v-else :companies="data || []" />
      <div v-if="isFetching" class="text-center mt-4">
        <Spinner class="h-6 w-6 animate-spin" />
        <p class="text-sm text-gray-500">Updating...</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import CompanyCards from "@/components/cards-view/CompanyCards.vue";
import CompanyTable from "@/components/table-view/CompanyTable.vue";
import { Spinner } from "@/components/ui/spinner";
import { useCompanySearch } from "~/composables/useCompanySearch";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

const route = useRoute();
const view = computed(() => (route.query.view as "card" | "table") || "card");

const {
  searchQuery,
  data,
  isLoading,
  error,
  isFetching,
  refetch,
  prefetchCompanies,
} = useCompanySearch();

// Prefetch initial data on the server
if (process.server) {
  await prefetchCompanies();
}

watch(searchQuery, () => {
  refetch();
});
</script>
