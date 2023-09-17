<template>
  <v-dialog
    v-model="dialog"
    :persistent="persistent"
    scrollable
    max-width="333px"
  >
    <member-status-form
      :member="member"
      :is-waiting="loading"
      :disabled="loading"
      @onClose="close"
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

    member: {
      type: Object,
      default: () => null,
    },

    loading: {
      type: Boolean,
      default: () => false,
    },

    persistent: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    logoUrl() {
      return require("~/assets/media/trading.png") + "?" + new Date();
    },
  },

  methods: {
    close() {
      this.dialog = false;
    },
  },

  watch: {
    active(value) {
      this.dialog = value;
    },

    dialog(value) {
      if (!value) {
        this.$emit("onClose");
      }
    },
  },
};
</script>
