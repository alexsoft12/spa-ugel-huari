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

import {mapGetters} from 'vuex'
import Header from "../components/admin/Header.vue";
import Main from "../components/admin/Main.vue";
import Sidebar from "../components/admin/Sidebar.vue";

export default {
  name: 'DashboardView',
  components: {Main, Header},
  computed: {
    ...mapGetters(["authUser"])
  }
}
</script>