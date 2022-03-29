<template>
  <a class="nav-link text-white btn btn-danger" v-on:click="logout">
    Cerrar sesión
  </a>
</template>

<script setup>
import {useAuthStore} from "../store/auth";

const authStore = useAuthStore();
const {logout} = authStore;

</script>

<style scoped></style>
