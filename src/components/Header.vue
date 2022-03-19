<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <img src="http://sisecon.ugelhuari.gob.pe/assets/imagenes/logo_ugel.png" alt="" width="60">
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/about">About</RouterLink>
          </li>
        </ul>
        <div class="d-flex">
          <RouterLink class="btn btn-outline-success" to="/login">Login</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'Header',
}
</script>