<template>

  <Main>
    <h1>Autorzaciones</h1>
    <FlashMessage
        message="Cargando..."
        v-if="loading && !authorizations.length"
        key="loading"
    />
    <FlashMessage :error="error" v-if="error" key="error"/>
    <AuthorizationForm/>
    <ejs-grid ref='grid' id='Grid' :dataSource='authorizations' :allowPaging="true" :pageSettings='pageSettings'
              :toolbar='toolbarOptions'
              :allowPdfExport='true' :toolbarClick='toolbarClick' height=542>
      <e-columns>
        <e-column field='user' headerText='Usuario' width=100></e-column>
        <e-column field='codigo_tercero' headerText='Código de tercero' width=120></e-column>
        <e-column field='descuento_mensual' headerText='Descuento mensual' width=150></e-column>
        <e-column field='nuemero_cuotas' headerText='Número de cuotas' width=150></e-column>
        <e-column field='total_descuento' headerText='Total descuento' width=150></e-column>
        <e-column field='fecha_compromiso' headerText='Fecha de compromiso' width=150></e-column>
        <e-column field='fecha_inicio' headerText='Fecha inicio' width=150></e-column>
      </e-columns>
    </ejs-grid>
    <BasePagination :action="paginated" :links="links" :meta="meta" v-if="meta && meta.last_page > 1"/>
  </Main>

</template>

<script>
import Main from "../components/admin/Main.vue";
import BasePagination from "../components/admin/BasePagination.vue";
import {useAuthorizationStore} from "../store/authorization";
import FlashMessage from "../components/FlashMessage.vue";
import AuthorizationForm from "../components/admin/AuthorizationForm.vue";
import {storeToRefs} from "pinia";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Edit,
  Toolbar,
  Group,
  Sort,
  ContextMenu,
  PdfExport,
  ExcelExport
} from '@syncfusion/ej2-vue-grids';

export default {
  name: "AuthorizationsView",
  components: {
    AuthorizationForm,
    FlashMessage,
    Main,
    BasePagination,
    'ejs-grid': GridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  },
  setup() {
    const authorizationStore = useAuthorizationStore();
    const {authorizations, loading, error, links, meta} = storeToRefs(authorizationStore);
    const   { paginated } = authorizationStore ;
    return {
      authorizations,
      loading,
      error,
      links,
      meta,
      paginated,
    }
  },
  data() {
    return {
      pageSettings: {pageSize: 15},
      toolbarOptions: ['PdfExport']
    };
  },
  methods: {
    toolbarClick(args) {
      if (args.item.id === 'Grid_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.pdfExport();
      }
    }
  },
  provide: {
    grid: [Page, Edit, Toolbar, Group, Sort, ContextMenu, PdfExport, ExcelExport]
  },
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

<style scoped>

</style>