<template>
  <div class="container">
    <div class="form-signin">
      <form @submit.prevent="login">
        <h1 class="h3 mb-3 fw-normal">Inicio de sesión <small></small></h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Correo..."/>
          <label for="email">Correo</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Cotraseña"/>
          <label for="password">Contraseña</label>
        </div>
        <button type="submit" class="w-100 btn btn-lg btn-primary mt-3">INGRESAR</button>
        <FlashMessage :error="error" />
      </form>
    </div>

  </div>
</template>

<script>
import authService from "../services/AuthService";
import {getError} from "../utils/helpers";
import FlashMessage from "../components/FlashMessage.vue";

export default {
  components: {
    FlashMessage
  },
  data() {
    return {
      form: {
        email: 'yuleralex1@gmail.com',
        password: 'admin123'
      },
      error: null
    }
  },
  methods: {
    async login() {
      const payload = {
        email: this.form.email,
        password: this.form.password
      }
      this.error = null
      try {
        await authService.login(payload);
        this.$router.push("/");
        // const authUser = await this.$store.dispatch("auth/getAuthUser");
        // if (authUser) {
        //   this.$store.dispatch("auth/setGuest", {value: "isNotGuest"});
        //   this.$router.push("/");
        // } else {
        //   const error = Error(
        //       "Unable to fetch user after login, check your API settings."
        //   );
        //   error.name = "Fetch User";
        //   throw error;
        // }
      } catch (error) {
        this.error = getError(error);
      }
    },
  }
}

</script>