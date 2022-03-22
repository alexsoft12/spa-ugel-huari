<template>
  <a class="nav-link text-white btn btn-danger"
      v-on:click="logout">
    Cerrar sesión
  </a>

</template>

<script>
import {useAuthStore} from "../store/auth";
export default {
  name: "Logout",

  setup() {
    const  authStore = useAuthStore()
    const {logout} = authStore

    return {
      logout
    }
  },

}
</script>

<style scoped>

</style>