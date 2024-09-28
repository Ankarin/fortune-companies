import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { CompanyShort } from "~/server/db/schema";

export const useCompanySearch = () => {
  const route = useRoute();
  const router = useRouter();

  const searchQuery = ref((route.query.search as string) || "");

  const {
    data: companies,
    error,
    refresh,
    status,
  } = useLazyAsyncData<CompanyShort[]>(
    "companies",
    () => $fetch("/api/companies", { params: { search: searchQuery.value } }),
    {
      watch: [searchQuery],
      server: true,
      default: () => [],
    },
  );

  const updateSearch = async (newQuery: string) => {
    searchQuery.value = newQuery;
    try {
      await router.push({
        query: { ...route.query, search: newQuery || undefined },
      });
    } catch (err) {
      console.error("Failed to update search query:", err);
    }
  };

  watch(
    () => route.query.search,
    (newSearch) => {
      if (newSearch !== searchQuery.value) {
        searchQuery.value = newSearch as string;
      }
    },
  );

  return {
    searchQuery,
    companies,
    error,
    isLoading: status.value === "pending",
    refresh,
    updateSearch,
  };
};
