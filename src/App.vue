<script setup>
import {RouterLink, RouterView} from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header/>
  <Footer/>

  <RouterView/>
</template>

<style>
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/bootstrap5.css";
</style>
