<template>
  <CPagination aria-label="Page navigation example">

    <CPaginationItem v-if="links && links.prev" @click="firstPage">Primero</CPaginationItem>
    <CPaginationItem v-for="link in meta.links" @click="changePage(link )"
                     :class="link.active === true ? 'active': '' ">
      {{ quoToString(link.label) }}

    </CPaginationItem>
    <CPaginationItem v-if="links && links.next" @click="lastPage">Último</CPaginationItem>
  </CPagination>
</template>

<script setup>
import router from "../router/index";

const props = defineProps({
  action: {
    type: Function,
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
  }
})

const firstPage = () => {
  props.action(props.links.first).then(() => {
    if (props.path) {
      router.push({
        path: props.path,
        query: {page: 1},
      });
    }
  });
}
const lastPage = () => {
  props.action(props.links.last).then(() => {
    if (props.path) {
      router.push({
        path: props.path,
        query: {page: props.meta.last_page},
      });
    }
  });
}
const changePage = (link) => {
  if (!link.url) {
    return;
  }
  let page = 1;
  if (quoToString(link.label) === "Anterior") {
    page = props.meta.current_page - 1;
  } else if (quoToString(link.label) === "Siguiente") {
    page = props.meta.current_page + 1;
  } else {
    page = parseInt(quoToString(link.label));
  }
  props.action(link.url).then(() => {
    if (props.path) {
      router.push({
        path: props.path,
        query: {page: page},
      });
    }
  });
}
//Special Symbols and Math Symbols
const quoToString = (label) => {
  if (label === "&laquo; Previous") {
    return "Anterior";
  } else if (label === "Next &raquo;") {
    return "Siguiente";
  } else {
    return label;
  }
};
</script>