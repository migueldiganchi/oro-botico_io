<template>
  <v-form @submit.prevent="save" class="question-form">
    <v-card :loading="isLoading" class="bg-dark-gradient">
      <v-card-title
        class="text-center bg-gold d-block text-h5"
        :class="{
          'text-gold': isLoading,
          'text-primary': !isLoading,
        }"
      >
        Pregunta Frecuente
      </v-card-title>

      <div class="px-6 pb-9">
        <v-textarea
          v-model="form.question"
          :disabled="isLoading"
          autofocus
          rows="2"
          label="Pregunta"
          color="amber"
          placeholder="Por favor ingresa la pregunta"
          class="mb-6"
        />

        <v-textarea
          v-model="form.answer"
          :disabled="isLoading"
          color="amber"
          autofocus
          rows="2"
          label="Respuesta"
          placeholder="Por favor ingresa la respuesta"
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

        <v-btn
          :disabled="isLoading"
          type="submit"
          rounded
          class="bg-gold"
          color="white"
        >
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
const EMPTY_QUESTION = {
  question: "",
  answer: "",
};

export default {
  props: {
    question: {
      type: Object,
      default: () => EMPTY_QUESTION,
    },

    isLoading: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      form: EMPTY_QUESTION,
    };
  },

  watch: {
    question(v) {
      if (!v) {
        this.form = { ...EMPTY_QUESTION };
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
