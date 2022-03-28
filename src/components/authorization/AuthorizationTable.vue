<template>
  <div>
    <CTable striped hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Usuario</CTableHeaderCell>
          <CTableHeaderCell scope="col">Código de tercero</CTableHeaderCell>
          <CTableHeaderCell scope="col">Descuento mensual</CTableHeaderCell>
          <CTableHeaderCell scope="col">Número de cuotas</CTableHeaderCell>
          <CTableHeaderCell scope="col">Total descuento</CTableHeaderCell>
          <CTableHeaderCell scope="col">Fecha de compromiso</CTableHeaderCell>
          <CTableHeaderCell scope="col">Fecha inicio</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>

        <CTableRow v-for="authorization in data">
          <CTableDataCell>{{ authorization.user }}</CTableDataCell>
          <CTableDataCell>{{ authorization.codigo_tercero }}</CTableDataCell>
          <CTableDataCell>{{ authorization.descuento_mensual }}</CTableDataCell>
          <CTableDataCell>{{ authorization.nuemero_cuotas }}</CTableDataCell>
          <CTableDataCell>{{ authorization.total_descuento }}</CTableDataCell>
          <CTableDataCell>{{ authorization.fecha_compromiso }}</CTableDataCell>
          <CTableDataCell>{{ authorization.fecha_inicio }}</CTableDataCell>
        </CTableRow>

      </CTableBody>
    </CTable>

  </div>

</template>

<script setup>

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

</script>

