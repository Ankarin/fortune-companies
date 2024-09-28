<template>
  <Card class="overflow-hidden hover:shadow-md transition-shadow duration-300">
    <CardHeader
      @click="navigateToCompanyDetails(company.id)"
      class="cursor-pointer hover:bg-secondary/50 transition-colors duration-300"
    >
      <CardTitle class="flex items-center justify-between">
        <span class="hover:underline break-words mr-2 flex-grow">{{
          company.company
        }}</span>
        <div
          class="w-10 h-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg"
        >
          {{ company.rank }}
        </div>
      </CardTitle>
      <CardDescription class="break-words">
        {{ company.ticker }} | {{ company.sector }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <section>
          <h3 class="font-semibold mb-2 text-sm">Company Info</h3>
          <dl class="space-y-1 text-sm">
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
          </dl>
        </section>
        <section>
          <h3 class="font-semibold mb-2 text-sm">Financial Info</h3>
          <dl class="space-y-1 text-sm">
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
        class="text-primary hover:underline text-sm break-all w-full"
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
import { formatNumber } from "~/lib/utils";

const router = useRouter();

const props = defineProps<{
  company: CompanyShort;
}>();

const navigateToCompanyDetails = (companyId: string) => {
  router.push(`/company/${companyId}`);
};
</script>
