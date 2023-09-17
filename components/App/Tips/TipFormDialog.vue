<template>
  <v-dialog
    v-model="dialog"
    :persistent="persistent"
    scrollable
    max-width="333px"
  >
    <tip-form
      :tip="tip"
      :disabled="loading"
      @onClose="$emit('onClose')"
      @onSave="saveTip"
    />
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: () => false,
    },

    tip: {
      type: Object,
      default: () => null,
    },

    loading: {
      type: Boolean,
      default: () => false,
    },

    persistent: {
      type: Boolean,
      default: () => true,
    },
  },

  data: () => ({
    dialog: false,
  }),

  methods: {
    close() {
      this.dialog = false;
    },

    saveTip(tipToSave) {
      this.$emit("onSave", tipToSave);
    }
  },

  watch: {
    active(v) {
      this.dialog = v;
    },

    dialog(v) {
      if (!v) {
        this.$emit("onClose");
      }
    },
  },
};
</script>
