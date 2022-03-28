<template>
  <div class="container-fluid mb-5">
    <div class="row">
      <Sidebar />

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
export default {
  name: "Main",
  components: { Sidebar },
};
</script>

<style scoped></style>
