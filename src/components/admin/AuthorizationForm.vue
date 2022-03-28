<template>
  <form class="row g-4">
    <div class="col-auto">
      <label for="dni">DNI:</label>
      <div class="input-group">
        <BaseInput
          type="text"
          name="dni"
          v-model="form.dni"
          class="mb-2"
          placeholder="DNI"
        />
        <BaseBtn type="button" text="Buscar" />
      </div>
    </div>

    <div class="col-auto">
      <BaseInput
        type="number"
        name="codigo_tercero"
        label="Código tercero:"
        v-model="form.codigo_tercero"
        class="mb-2"
      />
    </div>
    <div class="col-auto">
      <BaseInput
        type="number"
        name="descuento_mensual"
        label="Descuento mensuel:"
        v-model="form.descuento_mensual"
        class="mb-2"
      />
    </div>
    <div class="col-auto">
      <BaseInput
        type="number"
        name="numero_cuota"
        label="Numero de couta:"
        v-model="form.numero_cuota"
        class="mb-2"
      />
    </div>
    <div class="col-auto">
      <BaseInput
        type="number"
        name="total_descuento"
        label="total descuento:"
        v-model="form.total_descuento"
        class="mb-2"
      />
    </div>
    <div class="col-auto">
      <BaseInput
        type="date"
        name="fecha_compromiso"
        label="Fecha de compromiso:"
        v-model="form.fecha_compromiso"
        class="mb-2"
      />
    </div>
    <div class="col-auto">
      <BaseInput
        type="date"
        name="fecha_inicio"
        label="Fecha de inicio:"
        v-model="form.fecha_inicio"
        class="mb-2"
      />
    </div>
  </form>
</template>

<script>
import BaseInput from "../BaseInput.vue";
import BaseBtn from "../BaseBtn.vue";

export default {
  name: "AuthorizationForm",
  components: { BaseBtn, BaseInput },
  data() {
    return {
      form: {
        dni: "",
        codigo_tercero: "",
        descuento_mensual: "",
        numero_cuota: "",
        total_descuento: "",
        fecha_compromiso: "",
        fecha_inicio: "",
      },
      error: null,
    };
  },
};
</script>

<style scoped></style>
