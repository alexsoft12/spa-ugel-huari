<template>
  <div>
    <div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
        v-if="message"
        key="message"
    >
      {{ message }}
      <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
      ></button>
    </div>
    <div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
        v-if="error && getType(error) === 'string'"
        key="error"
    >
      {{ error }}
      <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
      ></button>
    </div>
    <div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
        v-if="getType(error) === 'object'"
        key="error-list"
    >
      <ul>
        <li v-for="key in errorKeys()" :key="key">
          <b class="fw-bold text-capitalize">{{ key | titleCase }}</b>
          <ul class="ms-2">
            <li v-for="(item, index) in getErrors(key)" :key="`${index}-error`">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
      <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: null,
  },
  error: {
    type: [Object, String],
    default: null,
  },
})

const errorKeys = computed(() => {

  if (!this.error || this.getType(this.error) === "string") {
    return null;
  }
  return Object.keys(this.error);
});

const titleCase = computed(() => {
  return value.replace("_", " ");
})

const getErrors = (key) => {
  return this.error[key];
}
const getType = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}


</script>
