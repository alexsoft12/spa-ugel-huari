import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => {
    return {
      sidebarVisible: "",
      sidebarUnfoldable: false,
    };
  },
  actions: {
    updateSidebarVisible(value) {
      this.sidebarVisible = value;
    },
    toggleUnfoldable() {
      this.sidebarUnfoldable = !this.sidebarUnfoldable;
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
});
