<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <CompanyCard
      v-for="company in companies"
      :key="company.id"
      :company="company"
    />
  </div>
</template>

<script setup lang="ts">
import CompanyCard from "./CompanyCard.vue";
import type { CompanyShort } from "~/server/db/schema";

defineProps<{
  companies: CompanyShort[];
}>();
</script>
