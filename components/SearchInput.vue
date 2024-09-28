<template>
  <div class="w-full max-w-sm space-y-2">
    <form @submit.prevent="onSubmit">
      <div class="relative">
        <Input
          v-model="searchQuery"
          type="search"
          placeholder="Search companies..."
        />
        <Button type="submit" class="absolute right-0 top-0 h-full">
          <SearchIcon class="h-4 w-4" />
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-vue-next";

const searchQuery = ref("");
const queryClient = useQueryClient();

const onSubmit = () => {
  queryClient.invalidateQueries(["companies"]);
};
</script>
