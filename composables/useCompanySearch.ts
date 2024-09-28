import { ref } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { CompanyShort } from "~/server/db/schema";

export const useCompanySearch = () => {
  const searchQuery = ref("");
  const queryClient = useQueryClient();

  const fetchCompanies = async (query: string): Promise<CompanyShort[]> => {
    const url = query
      ? `/api/companies?search=${encodeURIComponent(query)}`
      : "/api/companies";

    if (process.server) {
      return $fetch(url);
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  };

  const query = useQuery({
    queryKey: ["companies", searchQuery],
    queryFn: () => fetchCompanies(searchQuery.value),
  });

  const prefetchCompanies = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["companies", ""],
      queryFn: () => fetchCompanies(""),
    });
  };

  return {
    searchQuery,
    ...query,
    prefetchCompanies,
  };
};
