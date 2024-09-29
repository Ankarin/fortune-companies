import { defineStore } from "pinia";

export const useViewSwitcherStore = defineStore("viewSwitcher", {
  state: () => ({
    viewMode: "card" as "card" | "table",
  }),
  actions: {
    setViewMode(mode: "card" | "table") {
      this.viewMode = mode;
    },
  },
});
