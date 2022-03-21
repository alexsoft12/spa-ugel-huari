<template>
  <nav class="mt-2" aria-label="Page navigation example">
    <div class="row justify-content-between">
      <div class="col-4">
        <p class="text-sm text-gray-500">
          Pagina {{ meta.current_page }} de {{ meta.last_page }}
        </p>
      </div>
      <div class="col-8">
        <ul class="pagination justify-content-end">
          <li class="page-item">
            <button
                type="button"
                @click="firstPage"
                v-if="links.prev"
                class="page-link"
            >
              Primero
            </button>
          </li>
          <li class="page-item">
            <button
                type="button"
                @click="prevPage"
                v-if="links.prev"
                class="page-link"
            >
              Anterior
            </button>
          </li>

          <li class="page-item">
            <button
                type="button"
                @click="nextPage"
                v-if="links.next"
                class="page-link"
            >
              Siguiente
            </button>
          </li>

          <li class="page-item">
            <button
                type="button"
                @click="lastPage"
                v-if="links.next"
                class="page-link"
            >
              Ultimo
            </button>
          </li>
          <!--            <li class="page-item"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>-->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      default: null,
    },
    meta: {
      type: Object,
      required: true,
    },
    links: {
      type: Object,
      required: true,
    },
  },
  methods: {
    firstPage() {
      this.$store.dispatch(this.action, this.links.first).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: {page: 1},
          });
        }
      });
    },
    prevPage() {
      this.$store.dispatch(this.action, this.links.prev).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: {page: this.meta.current_page - 1},
          });
        }
      });
    },
    nextPage() {
      this.$store.dispatch(this.action, this.links.next).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: {page: this.meta.current_page + 1},
          });
        }
      });
    },
    lastPage() {
      this.$store.dispatch(this.action, this.links.last).then(() => {
        if (this.path) {
          this.$router.push({
            path: this.path,
            query: {page: this.meta.last_page},
          });
        }
      });
    },
  },
}
</script>