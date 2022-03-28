<template>
  <CRow>
    <CCol :md="12">
      <FlashMessage :error="error" v-if="error" key="error"/>
      <FlashMessage
          message="Cargando..."
          v-if="loading && authorizations && !authorizations.length"
          key="loading"
      />
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Autorzaciones </strong><small> Autorizaciones de descuento mediante la planilla única de pago</small>
        </CCardHeader>
        <CCardBody>
          <div class="d-flex justify-content-end mb-3">
            <CButton
                color="primary"
                @click="() => visibleLiveDemo = true">
              Añadir
            </CButton>
            <CModal
                :visible="visibleLiveDemo"
                @close="() =>  visibleLiveDemo = false"
                size="xl">
              <CModalHeader>
                <CModalTitle>Nuevo autorización de descuentos</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <AuthorizationForm/>
              </CModalBody>
              <CModalFooter>
                <CButton
                    color="secondary"
                    @click="() => visibleLiveDemo = false">
                  Cancelar
                </CButton>
                <CButton color="primary">Guardar</CButton>
              </CModalFooter>
            </CModal>
          </div>
          <AuthorizationTable :data="authorizations" :loading="loading" :error="error"  />
          <Pagination path="/authorizations" v-if="meta && meta.last_page > 1" :action="paginated" :links="links" :meta="meta"/>

        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script setup>
import AuthorizationTable from "../components/authorization/AuthorizationTable.vue";
import AuthorizationForm from "../components/admin/AuthorizationForm.vue";
import {useAuthorizationStore} from "@/store/authorization";
import Pagination from "../components/Pagination.vue";
import FlashMessage from "../components/FlashMessage.vue";
import {storeToRefs} from "pinia";
import {ref} from 'vue'

const authorizationStore = useAuthorizationStore();
const {authorizations, loading, error, links, meta} = storeToRefs(authorizationStore);
const {paginated} = authorizationStore;

let visibleLiveDemo = ref(false)

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
