<template>
  <div>
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<style scoped></style>
