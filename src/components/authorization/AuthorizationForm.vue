<template>
  <div class="d-flex justify-content-end mb-3">
    <CButton
        type="button"
        color="primary"
        @click="() => visibleModal = true">
      Añadir
    </CButton>
    <CModal
        backdrop="static"
        :visible="visibleModal"
        @close="() =>  visibleModal = false"
        size="xl">
      <form @submit.prevent="create">
        <CModalHeader :closeButton="false">
          <CModalTitle>Nuevo autorización de descuentos</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FlashMessage :error="error" v-if="error" key="error"/>
          <FlashMessage :error="userError" v-if="userError" key="error"/>
          <div class="row g-4">
            <div class="col-auto">
              <CFormLabel for="dni" class="m-0">DNI:</CFormLabel>
              <CInputGroup class="mb-2">
                <CFormInput type="number" @input="updateValue" name="dni" id="dni" placeholder="DNI" aria-label="DNI"
                            v-model="form.dni" aria-describedby="button-addon-dni"/>
                <CButton
                    color="primary"
                    variant="outline"
                    id="button-addon-dni"
                    :disabled="isLoading"
                    @click="searchByDni(form.dni) ">
                  {{ isLoadingSearchBtn ? 'Cargando...' : 'Buscar' }}
                </CButton>
              </CInputGroup>
            </div>

            <div class="col-auto">
              <CFormLabel for="codigo_tercero">Código tercero:</CFormLabel>
              <CFormInput type="number" @input="updateValue" name="codigo_tercero" id="codigo_tercero"
                          placeholder="Código tercero"
                          v-model="form.codigo_tercero"/>

            </div>
            <div class="col-auto">
              <CFormLabel for="descuento_mensual">Descuento mensuel:</CFormLabel>
              <CFormInput type="number" @input="updateValue" name="descuento_mensual" step="0.01" id="descuento_mensual"
                          placeholder="Descuento mensuel" v-model="form.descuento_mensual"/>
            </div>
            <div class="col-auto">
              <CFormLabel for="numero_cuota">Numero de couta:</CFormLabel>
              <CFormInput type="number" @input="updateValue" name="numero_cuota" id="numero_cuota"
                          placeholder="Numero de couta"
                          v-model="form.numero_cuota"/>
            </div>
            <div class="col-auto">
              <CFormLabel for="total_descuento">Total descuento:</CFormLabel>
              <CFormInput type="number" @input="updateValue" name="total_descuento" step="0.01" id="total_descuento"
                          placeholder="Total descuento" v-model="form.total_descuento"/>
            </div>
            <div class="col-auto">
              <CFormLabel for="fecha_compromiso">Fecha de compromiso:</CFormLabel>
              <CFormInput type="date" @input="updateValue" name="fecha_compromiso" id="fecha_compromiso"
                          placeholder="Fecha de compromiso"
                          v-model="form.fecha_compromiso"/>
            </div>
            <div class="col-auto">
              <CFormLabel for="fecha_inicio">Fecha de inicio:</CFormLabel>
              <CFormInput type="date" @input="updateValue" name="fecha_inicio" id="fecha_inicio"
                          placeholder="Fecha de inicio"
                          v-model="form.fecha_inicio"/>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
              type="button"
              color="secondary"
              @click="() => visibleModal = false">
            Cancelar
          </CButton>
          <CButton type="submit" color="primary" :disabled="isLoading || !userSave">Guardar</CButton>
        </CModalFooter>
      </form>
    </CModal>
    <CModal

        :visible="visibleModalUser"
        @close="() =>  visibleModalUser = false"
        size="xl"
    >
      <CModalHeader>
        <CModalTitle>Nuevo usuario</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="row g-4">
          <div class="col-auto">
            <CFormLabel for="userDni">DNI:</CFormLabel>
            <CFormInput type="text" @input="updateValue" name="userDni" id="userDni"
                        placeholder="DNI"
                        disabled
                        v-model="userData.numeroDocumento"/>
          </div>
          <div class="col-auto">
            <CFormLabel for="userName">Nombre:</CFormLabel>
            <CFormInput type="text" @input="updateValue" name="userName" id="userName"
                        placeholder="Nombre"
                        disabled
                        v-model="userData.nombre"/>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton
            type="button"
            color="secondary"
            @click="() => visibleModalUser = false">
          Cancelar
        </CButton>
        <CButton type="button" @click="saveUser" color="primary" :disabled="isLoadingSaveUserBtn">Guardar</CButton>
      </CModalFooter>

    </CModal>
  </div>
</template>

<script setup>
import {useAuthorizationStore} from "../../store/authorization";
import {useUserStore} from "../../store/user";
import FlashMessage from "../FlashMessage.vue";
import {getError} from "../../utils/helpers";
import {ref} from "vue";
import router from "../../router/index";
import {storeToRefs} from "pinia";

let visibleModal = ref(false)
let visibleModalUser = ref(false)


const form = ref({
  dni: '12345678',
  codigo_tercero: '0026',
  descuento_mensual: '993.49',
  numero_cuota: '73',
  total_descuento: '71531.28',
  fecha_compromiso: '2020-02-13',
  fecha_inicio: '2020-03-01'
})

let isLoading = ref(false)
let isLoadingSearchBtn = ref(false)
let isLoadingSaveUserBtn = ref(false)


const authorizationStore = useAuthorizationStore()
const userStore = useUserStore();
const {error} = storeToRefs(authorizationStore)

const {userError, userData, loading, userSave} = storeToRefs(userStore)

const {getUserFromAPI} = userStore;

const create = async () => {
  const payload = {
    user_id: userSave.value.id,
    codigo_tercero: form.value.codigo_tercero,
    descuento_mensual: form.value.descuento_mensual,
    numero_cuotas: form.value.numero_cuota,
    total_descuento: form.value.total_descuento,
    fecha_compromiso: form.value.fecha_compromiso,
    fecha_inicio: form.value.fecha_inicio,
    fecha_final: form.value.fecha_inicio
  }
  try {
    isLoading.value = true
    await authorizationStore.create(payload)
    isLoading.value = false
    error.value = null
    visibleModal.value = false
    // redirect to /authorizations
    userData.value = null
    userSave.value = null

    router.push("/authorizations?page=1")
  } catch (e) {
    isLoading.value = false
    error.value = getError(e)
  }
}

const searchByDni = async (dni) => {

  try {
    userData.value = null
    isLoadingSearchBtn.value = true
    await getUserFromAPI(dni)
    if (userData.value) {
      loading.value = false
      visibleModalUser.value = true
      isLoadingSearchBtn.value = false
    }
  } catch (e) {
    visibleModalUser.value = false
    userError.value = getError(e)
  }
}
const saveUser = async () => {
  userSave.value = null
  isLoadingSaveUserBtn.value = true
  const payload ={
    name: userData.value.nombre,
    dni: userData.value.numeroDocumento
  }

  try {
    await userStore.createUser(payload)
    if (userSave.value){
      visibleModalUser.value = false
      isLoadingSaveUserBtn.value = false
    }
  } catch (e) {
    userError.value = getError(e)
  }
}

const emit = defineEmits(["input"])

const updateValue = (event) => {
  return emit("input", event.target.value);
}

</script>

