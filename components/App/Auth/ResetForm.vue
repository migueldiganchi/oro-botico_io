<template>
  <v-form @submit.prevent="send" class="auth-form">
    <v-card :disabled="isWaiting" class="pa-9 bg-dark-gradient">
      <!-- Email input -->
      <div class="mb-6">
        <v-text-field
          v-model="form.email"
          :error="emailErrors.length > 0"
          :disabled="isWaiting"
          type="email"
          rounded
          autofocus
          outlined
          color="amber"
          label="Correo electrónico"
          @input="isValid('email')"
        />

        <validation-errors :errors="emailErrors" />
      </div>

      <!-- Actions -->
      <div class="text-center">
        <v-btn
          :disabled="isWaiting"
          type="submit"
          large
          rounded
          class="bg-golden pl-2"
          outlined
          elevation="3"
        >
          <span>
            <v-icon class="mr-2 google-icon">mdi-arrow-right</v-icon>
            <span>Enviar</span>
          </span>
        </v-btn>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
  props: {
    isWaiting: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      formCheckIn: false,
      form: {
        email: "",
      },
      emailErrors: [],
    };
  },
  methods: {
    send() {
      if (!this.formCheckIn) {
        this.formCheckIn = true;
      }

      // Validate form
      if (!this.isValid()) {
        return this.$notify({
          message: "El formulario tiene errores",
          timeout: 1999,
          color: "red",
        });
      }

      this.$emit("onSave", this.form);
    },

    isValid(field) {
      if (!this.formCheckIn) {
        return true;
      }

      this.emailErrors = [];

      // Email Validation
      if (!field || field === "email") {
        if (!this.$v.form.email.required) {
          this.emailErrors.push({
            key: "required",
            text: "El correo es necesario",
          });
        }
        if (!this.$v.form.email.email) {
          this.emailErrors.push({
            key: "email",
            text: `El correo electrónico tiene el formato incorrecto`,
          });
        }
      }

      return !this.emailErrors.length;
    },
  },
};
</script>

<style lang="scss">
.v-btn.v-btn--disabled {
  color: #b6b6b6 !important;
  border-color: #b3b3b3 !important;
  * {
    color: #333 !important;
  }
}
</style>
