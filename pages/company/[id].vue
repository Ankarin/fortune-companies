<template>
  <div class="container mx-auto px-4 py-4">
    <div v-if="isPending" class="text-center">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"
      ></div>
      <p class="text-lg mt-2">Loading company details...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-600">
      <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-2" />
      <p class="text-lg">Error: {{ error.message }}</p>
    </div>
    <div
      v-else-if="company"
      class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div
        class="bg-primary text-primary-foreground p-4 cursor-pointer hover:bg-primary-600 transition-colors duration-300"
      >
        <div class="flex items-center justify-between">
          <h1
            class="text-2xl font-bold hover:underline break-words mr-2 flex-grow"
          >
            {{ company.company }}
          </h1>
          <div
            class="w-10 h-10 shrink-0 rounded-full bg-primary-foreground flex items-center justify-center text-primary font-bold text-lg"
          >
            {{ company.rank }}
          </div>
        </div>
        <p class="text-sm mt-1 text-primary-foreground/80">
          {{ company.ticker }} | {{ company.sector }}
        </p>
      </div>
      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <section>
          <h3 class="font-semibold mb-2 text-sm">Company Info</h3>
          <dl class="space-y-1">
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">CEO:</dt>
              <dd class="break-words">{{ company.ceo }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Type:</dt>
              <dd class="break-words">{{ company.companyType }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Industry:</dt>
              <dd class="break-words">{{ company.industry }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Location:</dt>
              <dd class="break-words">
                {{ company.headquartersState }}, {{ company.headquartersCity }}
              </dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Founder is CEO:</dt>
              <dd class="break-words">{{ company.founderIsCeo }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Female CEO:</dt>
              <dd class="break-words">{{ company.femaleCeo }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Growth in Jobs:</dt>
              <dd class="break-words">{{ company.growthInJobs }}</dd>
            </div>
          </dl>
        </section>
        <section>
          <h3 class="font-semibold mb-2 text-sm">Financial Info</h3>
          <dl class="space-y-1">
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Market Cap:</dt>
              <dd>${{ formatNumber(company.marketCapMarch28M) }}M</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Employees:</dt>
              <dd>{{ formatNumber(company.numberOfEmployees) }}</dd>
            </div>
            <div class="flex flex-wrap items-center">
              <dt class="font-medium mr-1">Profitable:</dt>
              <dd>
                <Badge variant="secondary">
                  {{ company.profitable ? "Yes" : "No" }}
                </Badge>
              </dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Profits:</dt>
              <dd>${{ formatNumber(company.profitsM) }}M</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Revenue:</dt>
              <dd>${{ formatNumber(company.revenuesM) }}M</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Assets:</dt>
              <dd>${{ formatNumber(company.assetsM) }}M</dd>
            </div>
          </dl>
        </section>
        <section>
          <h3 class="font-semibold mb-2 text-sm">Ranking Info</h3>
          <dl class="space-y-1">
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Change in Rank:</dt>
              <dd>{{ formatNumber(company.changeInRank) }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Gained in Rank:</dt>
              <dd>{{ company.gainedInRank }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Dropped in Rank:</dt>
              <dd>{{ company.droppedInRank }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Newcomer to Fortune 500:</dt>
              <dd>{{ company.newcomerToTheFortune500 }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Global 500:</dt>
              <dd>{{ company.global500 }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">World's Most Admired:</dt>
              <dd>{{ company.worldsMostAdmiredCompanies }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Best to Work For:</dt>
              <dd>{{ company.bestCompaniesToWorkFor }}</dd>
            </div>
          </dl>
        </section>
        <section>
          <h3 class="font-semibold mb-2 text-sm">Additional Info</h3>
          <dl class="space-y-1">
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Country:</dt>
              <dd>{{ company.country }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Footnote:</dt>
              <dd>{{ company.footnote }}</dd>
            </div>
            <div class="flex flex-wrap">
              <dt class="font-medium mr-1">Last Updated:</dt>
              <dd>{{ company.updated }}</dd>
            </div>
          </dl>
        </section>
      </div>
      <div class="p-4 border-t">
        <a
          v-if="company.website"
          :href="company.website"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary hover:underline text-sm break-all w-full"
        >
          {{ company.website }}
        </a>
      </div>
    </div>
    <div v-else class="text-center">
      <Icon name="lucide:file-question" class="w-12 h-12 mx-auto mb-2" />
      <p class="text-lg">No company data available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { Badge } from "@/components/ui/badge";
import type { Company } from "~/server/db/schema";
import { formatNumber } from "~/lib/utils";

const route = useRoute();
const companyId = route.params.id as string;

const fetchCompany = async (id: string): Promise<Company> => {
  const response = await fetch(`/api/companies/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch company details");
  }
  return response.json();
};

const {
  data: company,
  isPending,
  error,
} = useQuery<Company, Error>({
  queryKey: ["company", companyId],
  queryFn: () => fetchCompany(companyId),
});
</script>
