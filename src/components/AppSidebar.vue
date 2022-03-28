<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="(event) => updateSidebarVisible(event)"
  >
    <CSidebarNav color-scheme="light">
      <AppSidebarNav />
    </CSidebarNav>
    <CSidebarToggler class="d-none d-lg-flex" @click="toggleUnfoldable" />
  </CSidebar>
</template>

<script setup>
import { AppSidebarNav } from "./AppSidebarNav";
import { useSidebarStore } from "@/store/sidebar";
import { storeToRefs } from "pinia";

const store = useSidebarStore();
const { sidebarVisible, sidebarUnfoldable } = storeToRefs(store);
const { updateSidebarVisible, toggleUnfoldable } = store;
</script>

<style scoped></style>
