<template>
  <div class="container">
<!--    <div>Usuario autenicado: {{ user.name }}</div>-->
    <button class="btn btn-danger m-3" @click="logout">Logout</button>
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
      </form>
    </div>

  </div>
</template>

<script>

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
export default {
  data: () => ({
    user: {},
    form: {
      email: 'yuleralex1@gmail.com',
      password: 'admin123'
    }
  }),
  created() {
/*
    axios.get('/users/1')
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });*/
  },


  methods: {
    logout() {
      axios.post('/logout')
          .then(response => {
            console.log(response);
            this.user = {};
            //this.$router.push('/login');
          })
          .catch(error => {
            console.log(error);
          });
    },
    login() {
      axios.get('/sanctum/csrf-cookie').then(resp => {
        axios.post('/login', this.form)
            .then(response => {
              console.log(response);
              //this.$router.push('/');
            })
            .catch(error => {
             console.log(error);
            });
      });

    }
  }

};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

