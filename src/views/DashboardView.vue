<template>
  <div class="container-fluid">
    <div class="row">
      <Main>
        <h1>hola</h1>
      </Main>

    </div>
  </div>
</template>

<script>


import Header from "../components/admin/Header.vue";
import Main from "../components/admin/Main.vue";
import {useAuthStore} from "../store/auth";

export default {
  name: 'DashboardView',
  components: {Main, Header},
  setup() {
    const authState = useAuthStore();
    return {
      authUser: authState.authUser
    }
  }
}
</script>