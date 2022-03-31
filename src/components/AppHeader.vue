<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="toggleSidebar">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav>
        <AppHeaderDropdownAccnt :authUser="authUser" :logout="logout" />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
  </CHeader>
</template>

<script setup>
import AppHeaderDropdownAccnt from "./AppHeaderDropdownAccnt.vue";
import { useSidebarStore } from "../store/sidebar";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";

const sidebarStore = useSidebarStore();

const { toggleSidebar } = sidebarStore;

const authStore = useAuthStore();
const { authUser, isAdmin } = storeToRefs(authStore);
const { logout } = authStore;
</script>
