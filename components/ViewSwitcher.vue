<template>
  <div class="flex items-center space-x-2">
    <Button
      size="icon"
      :variant="viewMode === 'card' ? 'default' : 'outline'"
      @click="setViewMode('card')"
      class="w-10 h-10"
    >
      <LayoutGridIcon class="h-5 w-5" />
    </Button>
    <Button
      size="icon"
      :variant="viewMode === 'table' ? 'default' : 'outline'"
      @click="setViewMode('table')"
      class="w-10 h-10"
    >
      <TableIcon class="h-5 w-5" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useViewSwitcherStore } from "~/stores/switcherStore";
import { Button } from "@/components/ui/button";
import { LayoutGridIcon, TableIcon } from "lucide-vue-next";

const viewSwitcherStore = useViewSwitcherStore();
const { viewMode } = storeToRefs(viewSwitcherStore);
const { setViewMode } = viewSwitcherStore;
</script>
