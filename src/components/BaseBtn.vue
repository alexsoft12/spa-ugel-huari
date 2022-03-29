<template>
  <button :type="type" class="btn btn-primary">
    {{ text }}
  </button>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: "submit",
  },
  text: {
    type: String,
    default: "Submit",
  },
});
</script>
