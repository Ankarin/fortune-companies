<template>
  <div class="space-y-6">
    <div v-if="error" class="text-center text-red-500">
      "Sorry, something went wrong. Please try again later."
    </div>
    <template v-else>
      <div v-if="isLoading && !companies.length" class="text-center">
        <p class="mt-2 text-sm text-gray-500">Loading companies...</p>
      </div>
      <div v-else-if="!isLoading && !companies.length" class="text-center">
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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import CompanyCards from "@/components/cards-view/CompanyCards.vue";
import CompanyTable from "@/components/table-view/CompanyTable.vue";
import { useCompanySearch } from "~/composables/useCompanySearch";

const route = useRoute();
const view = computed(() => (route.query.view as "card" | "table") || "card");

const { companies, isLoading, error } = useCompanySearch();
</script>
