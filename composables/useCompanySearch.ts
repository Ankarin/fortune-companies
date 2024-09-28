import { computed, ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
import type { CompanyShort } from "~/server/db/schema";

interface CompanyResponse {
  companies: CompanyShort[];
  total: number;
}

export const useCompanySearch = () => {
  const route = useRoute();
  const router = useRouter();

  const searchQuery = ref((route.query.search as string) || "");
  const currentPage = ref(parseInt(route.query.page as string, 10) || 1);

  const fetchCompanies = async (
    search: string,
    page: number,
  ): Promise<CompanyResponse> => {
    return await $fetch("/api/companies", {
      params: { search, page },
    });
  };

  const query = useQuery<CompanyResponse, Error>({
    queryKey: computed(() => [
      "companies",
      searchQuery.value,
      currentPage.value,
    ]),
    queryFn: () => fetchCompanies(searchQuery.value, currentPage.value),
  });

  const updateSearch = async (newQuery: string) => {
    searchQuery.value = newQuery;
    currentPage.value = 1;
    await updateRouteQuery(newQuery, 1);
  };

  const updatePage = async (newPage: number) => {
    currentPage.value = newPage;
    await updateRouteQuery(searchQuery.value, newPage);
  };

  const updateRouteQuery = async (search: string, page: number) => {
    try {
      const query: Record<string, string | undefined> = {
        ...route.query,
        search: search || undefined,
      };

      if (route.name === "index") {
        query.page = page.toString();
      } else {
        delete query.page;
      }

      await router.push({ query });
    } catch (err) {
      console.error("Failed to update route query:", err);
    }
  };

  watch(
    () => route.query,
    () => {
      searchQuery.value = (route.query.search as string) || "";
      currentPage.value = parseInt(route.query.page as string, 10) || 1;
    },
  );

  const total = ref(0);

  watch(
    () => query.data.value,
    (newData) => {
      if (newData) {
        total.value = newData.total;
      }
    },
  );

  const companies = computed(() => query.data.value?.companies || []);
  console.log(currentPage.value);
  return {
    searchQuery,
    currentPage,
    companies,
    total,
    isPending: query.isPending,
    error: query.error,
    updateSearch,
    updatePage,
  };
};
