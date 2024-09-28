<template>
  <Card class="overflow-hidden hover:shadow-md transition-shadow duration-300">
    <CardHeader
      @click="navigateToCompanyDetails(company.id)"
      class="cursor-pointer hover:bg-secondary/50 transition-colors duration-300"
    >
      <CardTitle class="flex items-center justify-between">
        <span class="hover:underline">{{ company.company }}</span>
        <div
          class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg"
        >
          {{ company.rank }}
        </div>
      </CardTitle>
      <CardDescription
        >{{ company.ticker }} | {{ company.sector }}</CardDescription
      >
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-2 gap-6">
        <section>
          <h3 class="font-semibold mb-2 text-sm">Company Info</h3>
          <dl class="space-y-1 text-sm">
            <div>
              <dt class="font-medium inline">CEO:</dt>
              <dd class="inline ml-1">{{ company.ceo }}</dd>
            </div>
            <div>
              <dt class="font-medium inline">Type:</dt>
              <dd class="inline ml-1">{{ company.companyType }}</dd>
            </div>
            <div>
              <dt class="font-medium inline">Industry:</dt>
              <dd class="inline ml-1">{{ company.industry }}</dd>
            </div>
            <div>
              <dt class="font-medium inline">Location:</dt>
              <dd class="inline ml-1">
                {{ company.headquartersState }}, {{ company.headquartersCity }}
              </dd>
            </div>
          </dl>
        </section>
        <section>
          <h3 class="font-semibold mb-2 text-sm">Financial Info</h3>
          <dl class="space-y-1 text-sm">
            <div>
              <dt class="font-medium inline">Market Cap:</dt>
              <dd class="inline ml-1">
                ${{ formatNumber(company.marketCapMarch28M) }}M
              </dd>
            </div>
            <div>
              <dt class="font-medium inline">Employees:</dt>
              <dd class="inline ml-1">
                {{ formatNumber(company.numberOfEmployees) }}
              </dd>
            </div>
            <div>
              <dt class="font-medium inline">Profitable:</dt>
              <dd class="inline ml-1">
                <Badge
                  :variant="company.profitable ? 'success' : 'destructive'"
                >
                  {{ company.profitable ? "Yes" : "No" }}
                </Badge>
              </dd>
            </div>
            <div>
              <dt class="font-medium inline">Profits:</dt>
              <dd class="inline ml-1">
                ${{ formatNumber(company.profitsM) }}M
              </dd>
            </div>
            <div>
              <dt class="font-medium inline">Revenue:</dt>
              <dd class="inline ml-1">
                ${{ formatNumber(company.revenuesM) }}M
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </CardContent>
    <CardFooter>
      <a
        v-if="company.website"
        :href="company.website"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary hover:underline text-sm"
      >
        {{ company.website }}
      </a>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CompanyShort } from "~/server/db/schema";

const router = useRouter();

const props = defineProps<{
  company: CompanyShort;
}>();

const formatNumber = (num: number | null) => {
  return num !== null ? num.toLocaleString() : "";
};

const navigateToCompanyDetails = (companyId: string) => {
  router.push(`/company/${companyId}`);
};
</script>
