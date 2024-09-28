<template>
  <div class="flex items-center space-x-2">
    <Button
      size="sm"
      :variant="modelValue === 'card' ? 'default' : 'outline'"
      @click="$emit('update:modelValue', 'card')"
    >
      <GridIcon class="h-4 w-4 mr-2" />
      Cards
    </Button>
    <Button
      size="sm"
      :variant="modelValue === 'table' ? 'default' : 'outline'"
      @click="$emit('update:modelValue', 'table')"
    >
      <TableIcon class="h-4 w-4 mr-2" />
      Table
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { GridIcon, TableIcon } from "lucide-vue-next";

defineProps<{
  modelValue: "card" | "table";
}>();

defineEmits<{
  (e: "update:modelValue", value: "card" | "table"): void;
}>();
</script>
