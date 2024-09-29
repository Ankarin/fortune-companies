import { computed, ref, watch } from "vue";
import { useInfiniteQuery } from "@tanstack/vue-query";
import type { QueryFunctionContext } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import type { CompanyShort } from "~/server/db/schema";

interface CompanyResponse {
  companies: CompanyShort[];
  total: number;
  nextPage: number | null;
}

export const useCompanySearch = () => {
  const route = useRoute();
  const router = useRouter();

  const searchQuery = ref((route.query.search as string) || "");

  const fetchCompanies = async ({
    pageParam = 1,
  }: QueryFunctionContext): Promise<CompanyResponse> => {
    return await $fetch<CompanyResponse>("/api/companies", {
      params: { search: searchQuery.value, page: pageParam },
    });
  };

  const query = useInfiniteQuery<CompanyResponse, Error>({
    queryKey: computed(() => ["companies", searchQuery.value]),
    queryFn: fetchCompanies,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const updateSearch = async (newQuery: string) => {
    searchQuery.value = newQuery;
    await updateRouteQuery(newQuery);
  };

  const updateRouteQuery = async (search: string) => {
    try {
      const query: Record<string, string | undefined> = {
        ...route.query,
        search: search || undefined,
      };

      await router.push({ query });
    } catch (err) {
      console.error("Failed to update route query:", err);
    }
  };

  watch(
    () => route.query,
    () => {
      searchQuery.value = (route.query.search as string) || "";
    },
  );

  const companies = computed(
    () => query.data.value?.pages.flatMap((page) => page.companies) || [],
  );
  const total = computed(() => query.data.value?.pages[0]?.total ?? 0);

  return {
    searchQuery,
    companies,
    total,
    isPending: query.isLoading,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    updateSearch,
  };
};
