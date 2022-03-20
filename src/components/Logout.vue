<template>
  <a class="nav-link text-white btn btn-danger"
      v-on:click="logout">
    Cerrar sesión
  </a>

</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
}
</script>

<style scoped>

</style>