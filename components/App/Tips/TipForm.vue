<template>
  <v-form @submit.prevent="save" class="tip-form">
    <v-card :loading="isLoading" class="bg-dark-gradient">
      <v-card-title
        class="text-center d-block bg-gold text-h5"
        :class="{
          'text-gold': isLoading,
          'text-primary': !isLoading,
        }"
      >
        Consejo
      </v-card-title>

      <div class="pa-6">
        <v-text-field
          v-model="form.title"
          :disabled="isLoading"
          label="Título"
          autofocus
          color="amber"
          class="mb-6"
        />

        <v-textarea
          v-model="form.description"
          :disabled="isLoading"
          label="Consejo"
          placeholder="Por favor ingresa la descripción un consejo"
          rows="2"
          color="amber"
          class="mb-3"
        />
      </div>

      <!-- TIP ACTIONS -->
      <v-card-actions class="pa-3 bg-gradient">
        <v-btn
          :disabled="isLoading"
          text
          icon
          class="text-dark"
          @click="close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-spacer />

        <v-btn :disabled="isLoading" type="submit" rounded class="bg-gold">
          <span :class="isLoading ? 'text-disabled' : 'text-primary'">
            <v-icon class="mr-2">mdi-check</v-icon>
            {{ "Guardar" }}
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
const EMPTY_TIP = {
  title: "",
  description: "",
};

export default {
  props: {
    tip: {
      type: Object,
      default: () => EMPTY_TIP,
    },

    isLoading: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      form: EMPTY_TIP,
    };
  },

  watch: {
    tip(v) {
      console.log("[entering tip?]", v);

      if (!v) {
        this.form = EMPTY_TIP;
        return;
      }

      this.form = { ...v };
    },
  },

  methods: {
    save() {
      this.$emit("onSave", this.form);
    },
    close() {
      this.$emit("onClose");
    },
  },
};
</script>
