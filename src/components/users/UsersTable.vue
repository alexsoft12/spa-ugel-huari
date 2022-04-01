<template>
  <div>
    <CTable striped hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">DNI</CTableHeaderCell>
          <CTableHeaderCell scope="col">Nombres y apellidos</CTableHeaderCell>
<!--          <CTableHeaderCell scope="col">Fecha creada</CTableHeaderCell>-->
        </CTableRow>
      </CTableHead>
      <CTableBody>

        <CTableRow v-for="user in data">
          <CTableDataCell>{{ user.dni }}</CTableDataCell>
          <CTableDataCell>{{ user.name }}</CTableDataCell>
<!--          <CTableDataCell>{{ user.created_at }}</CTableDataCell>-->
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

