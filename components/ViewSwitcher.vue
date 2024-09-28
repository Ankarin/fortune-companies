<template>
  <div class="flex items-center space-x-2">
    <Button
      size="icon"
      :variant="modelValue === 'card' ? 'default' : 'outline'"
      @click="$emit('update:modelValue', 'card')"
      class="w-10 h-10"
    >
      <LayoutGridIcon class="h-5 w-5" />
    </Button>
    <Button
      size="icon"
      :variant="modelValue === 'table' ? 'default' : 'outline'"
      @click="$emit('update:modelValue', 'table')"
      class="w-10 h-10"
    >
      <TableIcon class="h-5 w-5" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { LayoutGridIcon, TableIcon } from "lucide-vue-next";

defineProps<{
  modelValue: "card" | "table";
}>();

defineEmits<{
  (e: "update:modelValue", value: "card" | "table"): void;
}>();
</script>
