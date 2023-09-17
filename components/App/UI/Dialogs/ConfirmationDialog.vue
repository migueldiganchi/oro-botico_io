<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="dialog-top-transition"
    max-width="450"
  >
    <v-card color="white">
      <!-- begin:: Confirmation title -->
      <v-card-title
        class="text-center d-block bg-dark-gradient text-h6"
        :class="headerClass"
      >
        <h2 v-if="icon" class="m-0 my-3">
          <v-icon class="text-h3">{{ icon }}</v-icon>
        </h2>
        <b>{{ title }}</b>
      </v-card-title>
      <!-- end:: Confirmation title -->

      <!-- begin:: Confirmation content -->
      <v-card-text class="text-center mt-5" :class="`${color}--text`">
        <div style="font-size: 18px" class="text-dark">
          <b v-html="message" />
        </div>
      </v-card-text>
      <!-- end:: Confirmation content -->

      <!-- begin:: Confirmation actions -->
      <v-card-actions class="pa-3 bg-dark-gradient" :class="footerClass">
        <!-- begin:: Cancel buttom -->
        <v-btn
          :loading="isLoading"
          dark
          text
          rounded
          @click.prevent.stop="close()"
        >
          <span>
            <v-icon>mdi-close</v-icon>
            {{ cancelButtonText }}
          </span>
        </v-btn>
        <!-- end:: Cancel buttom -->

        <v-spacer />

        <!-- begin:: Ok button -->
        <v-btn
          :loading="isLoading"
          color="white"
          class="bg-gold"
          rounded
          @click="confirm()"
        >
          <span>
            <v-icon>mdi-check</v-icon>
            {{ confirmButtonText }}
          </span>
        </v-btn>
        <!-- end:: Ok button -->
      </v-card-actions>
      <!-- end:: Confirmation actions -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: () => false,
    },
    icon: {
      type: String,
      default: () => "",
    },
    title: {
      type: String,
      default: () => "",
    },
    message: {
      type: String,
      default: () => "",
    },
    color: {
      type: String,
      default: () => "red",
    },
    confirmButtonText: {
      type: String,
      default: () => "Si",
    },
    cancelButtonText: {
      type: String,
      default: () => "Mejor no",
    },
    isLoading: {
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
    headerClass() {
      // return `${this.color} lighten-4 ${this.color}--text`;
      return "";
    },
    footerClass() {
      return `${this.color} darken-1`;
    },
  },
  watch: {
    isActive(isActiveValue) {
      this.dialog = isActiveValue;
      if (!isActiveValue) {
        this.close();
      }
    },
  },
  methods: {
    close() {
      this.$emit("onClose");
    },
    confirm() {
      this.$emit("onConfirm");
    },
  },
};
</script>
