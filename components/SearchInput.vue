<template>
  <div class="w-full max-w-md space-y-2">
    <div class="relative">
      <Input
        v-model="localSearchQuery"
        type="search"
        placeholder="Search"
        @input="debouncedSearch"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Input } from "@/components/ui/input";
import { useCompanySearch } from "~/composables/useCompanySearch";

const { searchQuery, updateSearch } = useCompanySearch();
const localSearchQuery = ref(searchQuery.value);

const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const performSearch = () => {
  updateSearch(localSearchQuery.value);
};

const debouncedSearch = debounce(performSearch, 300);

watch(searchQuery, (newValue) => {
  if (newValue !== localSearchQuery.value) {
    localSearchQuery.value = newValue;
  }
});
</script>
