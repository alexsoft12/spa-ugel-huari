<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">

          <RouterLink class="nav-link active" aria-current="page" to="/authorizations">
            <span data-feather="home"></span>
            Autorizaciones
          </RouterLink>

          <RouterLink class="nav-link" to="/authorizations">
            <span data-feather="home"></span>
            Autorizaciones
          </RouterLink>
        </li>

      </ul>

    </div>
  </nav>
</template>

<script>
export default {
name: "Sidebar"
}
</script>

<style scoped>

</style>