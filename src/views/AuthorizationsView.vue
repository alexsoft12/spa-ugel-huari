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
          <strong>Autorzaciones </strong><small> Autorizaciones de descuento mediante la planilla única de pago</small>
        </CCardHeader>
        <CCardBody>
            <AuthorizationForm/>
          <AuthorizationTable :data="authorizations" :loading="loading" :error="error"  />
          <Pagination path="/authorizations" v-if="meta && meta.last_page > 1" :action="paginated" :links="links" :meta="meta"/>

        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script setup>
import AuthorizationTable from "../components/authorization/AuthorizationTable.vue";
import AuthorizationForm from "../components/authorization/AuthorizationForm.vue";
import {useAuthorizationStore} from "../store/authorization";
import Pagination from "../components/Pagination.vue";
import FlashMessage from "../components/FlashMessage.vue";
import {storeToRefs} from "pinia";

const authorizationStore = useAuthorizationStore();
const {authorizations, loading, error, links, meta} = storeToRefs(authorizationStore);
const {paginated} = authorizationStore;

</script>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    const authorizationStore = useAuthorizationStore();
    const currentPage = parseInt(to.query.page) || 1;
    authorizationStore.fetchAuthorizations(currentPage).then(() => {
      to.query.page = currentPage;
      next();
    });
  },
}

</script>
