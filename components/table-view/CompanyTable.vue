<template>
  <div class="rounded-md border overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Ticker</TableHead>
          <TableHead>CEO</TableHead>
          <TableHead>Company Type</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Sector</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Market Cap (M)</TableHead>
          <TableHead>Employees</TableHead>
          <TableHead>Profitable</TableHead>
          <TableHead>Profits (M)</TableHead>
          <TableHead>Revenue (M)</TableHead>
          <TableHead>Website</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="company in companies"
          :key="company.id"
          @click="navigateToCompanyDetails(company.id)"
          class="cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <TableCell>{{ company.rank }}</TableCell>
          <TableCell>{{ company.company }}</TableCell>
          <TableCell>{{ company.ticker }}</TableCell>
          <TableCell>{{ company.ceo }}</TableCell>
          <TableCell>{{ company.companyType }}</TableCell>
          <TableCell>{{ company.industry }}</TableCell>
          <TableCell>{{ company.sector }}</TableCell>
          <TableCell>
            {{ company.headquartersState }}, {{ company.headquartersCity }}
          </TableCell>
          <TableCell>{{ formatCurrency(company.marketCapMarch28M) }}</TableCell>
          <TableCell>{{ formatNumber(company.numberOfEmployees) }}</TableCell>
          <TableCell>
            <Badge :variant="company.profitable ? 'default' : 'destructive'">
              {{ company.profitable ? "Yes" : "No" }}
            </Badge>
          </TableCell>
          <TableCell>{{ formatCurrency(company.profitsM) }}</TableCell>
          <TableCell>{{ formatCurrency(company.revenuesM) }}</TableCell>
          <TableCell>
            <a
              v-if="company.website"
              :href="company.website"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
              @click.stop
            >
              {{ company.website }}
            </a>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "vue-router";
import type { CompanyShort } from "~/server/db/schema";
import { formatNumber, formatCurrency } from "~/lib/utils";

const router = useRouter();

defineProps<{
  companies: CompanyShort[];
}>();

const navigateToCompanyDetails = (companyId: string) => {
  router.push(`/company/${companyId}`);
};
</script>
