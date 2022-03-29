<template>
  <div class="form-signin">
    <form @submit.prevent="login">
      <h1 class="h3 mb-3 fw-normal">Inicio de sesión <small></small></h1>
      <div class="form-floating">
        <input
            type="email"
            class="form-control"
            id="email"
            v-model="form.email"
            placeholder="Correo..."
        />
        <label for="email">Correo</label>
      </div>
      <div class="form-floating">
        <input
            type="password"
            class="form-control"
            id="password"
            v-model="form.password"
            placeholder="Cotraseña"
        />
        <label for="password">Contraseña</label>
      </div>
      <button type="submit" class="w-100 btn btn-lg btn-primary my-3" :disabled="isLoading">
        INGRESAR
      </button>
      <FlashMessage :error="error"/>
    </form>
  </div>
</template>

<script setup>
import authService from "../services/AuthService";
import {getError} from "../utils/helpers";
import FlashMessage from "../components/FlashMessage.vue";
import {useAuthStore} from "../store/auth";
import router from "../router/index";
import {ref} from 'vue'

const form = ref({
  email: "yuleralex1@gmail.com",
  password: "admin123",
})
let error = ref(null)
let isLoading = ref(false)

const authStore = useAuthStore();

const login = async () => {
  const payload = {
    email: form.value.email,
    password: form.value.password,
  };

  error.value = null;
  isLoading.value = true;
  try {
    await authService.login(payload);

    const authUser = await authStore.getAuthUser();
    if (authUser) {
      authStore.setGuest({value: "isNotGuest"});
      router.push("/dashboard");
    } else {
      const error = Error(
          "Unable to fetch user after login, check your API settings."
      );
      error.name = "Fetch User";
      throw error;
    }
    isLoading.value = false;
  } catch (errors) {
    error.value = getError(errors);
    isLoading.value = false;
  }

}

</script>
