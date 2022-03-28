<template>
  <!--  modal bootstrap 5-->
  <div class="modal fade" ref="{{id}}" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" v-if="title">
          <h5 class="modal-title" id="{{id}}Label">{{ title }}</h5>
          <slot name="btn-close"></slot>
          <!--          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>-->
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseBtn from "../BaseBtn.vue";

export default {
  name: "BaseModal",
  components: { BaseBtn },
  props: {
    ref: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
