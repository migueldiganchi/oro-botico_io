<template>
  <v-dialog
    v-model="dialog"
    :persistent="persistent"
    scrollable
    max-width="333px"
  >
    <question-form
      :question="question"
      :disabled="loading"
      @onClose="$emit('onClose')"
      @onSave="saveQuestion"
    />
  </v-dialog>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: () => null,
    },

    active: {
      type: Boolean,
      default: () => false,
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

    saveQuestion(questionToSave) {
      this.$emit("onSave", questionToSave);
    },
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
