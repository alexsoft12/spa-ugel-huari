<template>
  <div>
    <label :for="name" :class="{ 'sr-only': !showLabel }" v-if="label">
      {{ label }}
    </label>
    <input
        :id="name"
        :type="type"
        :value="value"
        :required="required"
        @input="updateValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="form-control"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Number],
  },
  type: {
    type: String,
    default: "text",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  autocomplete: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(["input"])

const updateValue = (event) => {
      return emit("input", event.target.value);
    }


</script>
