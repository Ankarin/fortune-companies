<template>
  <Card class="w-full max-w-4xl mx-auto">
    <CardHeader>
      <CardTitle class="text-3xl font-bold">{{ company.name }}</CardTitle>
      <CardDescription class="text-lg">
        {{ company.ticker }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">Company Overview</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-sm font-medium text-muted-foreground">CEO:</dt>
                <dd class="text-base">{{ company.ceo }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Company Type:
                </dt>
                <dd class="text-base">{{ company.companyType }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Industry:
                </dt>
                <dd class="text-base">{{ company.industry }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Sector:
                </dt>
                <dd class="text-base">{{ company.sector }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Location:
                </dt>
                <dd class="text-base">{{ company.location }}</dd>
              </div>
            </dl>
          </div>

          <!-- Contact Information -->
          <div>
            <h3 class="text-lg font-semibold mb-2">Contact Information</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Website:
                </dt>
                <dd class="text-base">
                  <a
                    :href="company.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary hover:underline inline-flex items-center"
                  >
                    {{ company.website }}
                    <ExternalLink class="h-4 w-4 ml-1" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">Financial Information</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Revenue:
                </dt>
                <dd class="text-base font-semibold">
                  ${{ company.revenue.toLocaleString() }} million
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Profits:
                </dt>
                <dd class="text-base font-semibold">
                  ${{ company.profits.toLocaleString() }} million
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Market Cap:
                </dt>
                <dd class="text-base font-semibold">
                  ${{ company.marketCap.toLocaleString() }} million
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Profitable:
                </dt>
                <dd>
                  <Badge
                    :variant="company.profitable ? 'default' : 'destructive'"
                  >
                    {{ company.profitable ? "Yes" : "No" }}
                  </Badge>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Additional Information</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Number of Employees:
                </dt>
                <dd class="text-base">
                  {{ company.employees.toLocaleString() }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-muted-foreground">
                  Ticker:
                </dt>
                <dd class="text-base">{{ company.ticker }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-vue-next";
import type { CompanyShort } from "~/server/db/schema";

defineProps<{
  company: CompanyShort;
}>();
</script>
