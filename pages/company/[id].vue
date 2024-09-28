<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <Spinner class="h-8 w-8 animate-spin" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    <CompanyDetail v-else-if="company" :company="company" />
    <div v-else class="text-center text-gray-500">Company not found.</div>
    <div class="mt-6 mx-auto max-w-4xl">
      <NuxtLink to="/">
        <Button>Back to Search</Button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import CompanyDetail from "@/components/CompanyDetail.vue";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const route = useRoute();
const company = ref<Company | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch(`/api/companies/${route.params.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch company details");
    }
    company.value = await response.json();
  } catch (err) {
    console.error("Error fetching company details:", err);
    error.value =
      "An error occurred while fetching company details. Please try again.";
  } finally {
    isLoading.value = false;
  }
});
</script>
