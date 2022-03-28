<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="toggleSidebar">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
  </CHeader>
</template>



<script setup>
import AppHeaderDropdownAccnt from "./AppHeaderDropdownAccnt.vue";
import { useSidebarStore } from "@/store/sidebar";

const sidebarStore = useSidebarStore();

const { toggleSidebar } = sidebarStore;
</script>
