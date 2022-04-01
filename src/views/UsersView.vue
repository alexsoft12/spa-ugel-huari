<template>
  <CRow>
    <CCol :md="12">
      <FlashMessage :error="error" v-if="error" key="error"/>
      <FlashMessage
          message="Cargando..."
          v-if="loading  && !authorizations.length"
          key="loading"
      />
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Usuarios </strong><small> Todos los usuarios</small>
        </CCardHeader>
        <CCardBody>

          <UsersTable :data="users" :loading="loading" :error="error"  />
          <Pagination path="/authorizations" v-if="meta && meta.last_page > 1" :action="paginated" :links="links" :meta="meta"/>

        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script setup>

import FlashMessage from "../components/FlashMessage.vue";
import Pagination from "../components/Pagination.vue";
import UsersTable from "../components/users/UsersTable.vue";
import {useUserStore} from "../store/user";
import {storeToRefs} from "pinia/dist/pinia";

const userStore = useUserStore()
const {users, loading, error, meta} = storeToRefs(userStore)
const {paginated} = userStore
</script>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    const userStore = useUserStore();
    const currentPage = parseInt(to.query.page) || 1;
    userStore.getUsers(currentPage).then(() => {
      to.query.page = currentPage;
      next();
    });
  },
}

</script>