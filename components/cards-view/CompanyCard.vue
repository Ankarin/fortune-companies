<template>
  <Card class="overflow-hidden">
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <span>{{ company.company }}</span>
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
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div>CEO: {{ company.ceo }}</div>
        <div>Type: {{ company.companyType }}</div>
        <div>Industry: {{ company.industry }}</div>
        <div>
          Location: {{ company.headquartersState }},
          {{ company.headquartersCity }}
        </div>
        <div>Market Cap: ${{ formatNumber(company.marketCapMarch28M) }}M</div>
        <div>Employees: {{ formatNumber(company.numberOfEmployees) }}</div>
        <div>
          Profitable:
          <Badge :variant="company.profitable ? 'success' : 'destructive'">
            {{ company.profitable ? "Yes" : "No" }}
          </Badge>
        </div>
        <div>Profits: ${{ formatNumber(company.profitsM) }}M</div>
        <div>Revenue: ${{ formatNumber(company.revenuesM) }}M</div>
        <div>
          <a
            v-if="company.website"
            :href="company.website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline"
          >
            {{ company.website }}
          </a>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button
        variant="outline"
        size="sm"
        @click="navigateToCompanyDetails(company.id)"
      >
        View Details
      </Button>
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
import { Button } from "@/components/ui/button";
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
