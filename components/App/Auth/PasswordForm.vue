<template>
  <v-form @submit.prevent="send" class="reset-password-form">
    <v-card color="white" :disabled="isWaiting" class="pa-9">
      <!-- Password input -->
      <h4 class="mx-auto text-center text-white mb-9 App-xs-box">
        Ingresa las nuevas credenciales de tu cuenta
      </h4>

      <!-- Password input -->
      <div class="mb-3">
        <v-text-field
          v-model="form.password"
          :disabled="isWaiting"
          :type="!isPasswordVisible ? 'password' : 'text'"
          :append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          rounded
          outlined
          color="amber"
          label="Nueva Contraseña"
          @click:append="togglePassword()"
        />

        <!-- Password Validation Errors -->
        <validation-errors :errors="passwordErrors" />
      </div>

      <!-- New Password confirmation -->
      <div class="new-password-confirmation-box mb-6">
        <v-text-field
          v-model="form.passwordConfirmation"
          :disabled="isWaiting"
          :append-icon="
            isPasswordConfirmationVisible ? 'mdi-eye-off' : 'mdi-eye'
          "
          :type="!isPasswordConfirmationVisible ? 'password' : 'text'"
          rounded
          outlined
          color="amber"
          placeholder="Confirma la nueva contraseña"
          @click:append="togglePasswordConfirmation()"
        />

        <!-- Password Confirmation Validation Errors -->
        <validation-errors :errors="passwordConfirmationErrors" />
      </div>

      <!-- Actions -->
      <div class="text-center">
        <v-btn
          :disabled="isWaiting"
          outlined
          type="submit"
          rounded
          class="bg-golden pl-2"
          elevation="3"
        >
          <span>
            <v-icon class="mr-2 google-icon">mdi-arrow-right</v-icon>
            <span>Guardar</span>
          </span>
        </v-btn>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

const passwordMinLength = 6;
const passwordMaxLength = 18;

export default {
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(passwordMinLength),
        maxLength: maxLength(passwordMaxLength),
      },
      passwordConfirmation: {
        required,
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
      isPasswordVisible: false,
      isPasswordConfirmationVisible: false,
      formCheckIn: false,
      form: {
        password: "",
        passwordConfirmation: "",
      },
      passwordErrors: [],
      passwordConfirmationErrors: [],
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

      this.passwordErrors = [];
      this.passwordConfirmationErrors = [];

      // Password Validation
      if (!field || field === "password") {
        if (!this.$v.form.password.required) {
          this.passwordErrors.push({
            key: "required",
            text: "La contraseña es necesaria",
          });
        }
        if (!this.$v.form.password.minLength) {
          this.passwordErrors.push({
            key: "minLength",
            text: `La contraseña es demasiado corta (min: ${passwordMinLength})`,
          });
        }
        if (!this.$v.form.password.maxLength) {
          this.passwordErrors.push({
            key: "maxLength",
            text: `La contraseña es demasiado larga (max: ${passwordMaxLength})`,
          });
        }
      }

      // Password Confirmation Validation
      if (!field || field === "passwordConfirmation") {
        if (!this.$v.form.passwordConfirmation.required) {
          this.passwordConfirmationErrors.push({
            key: "required",
            text: "Por favor confirma la contraseña",
          });
        }

        if (this.form.passwordConfirmation != this.form.password) {
          this.passwordErrors.push({
            key: "equals",
            text: `Las contraseñas deben coincidir`,
          });
        }
      }

      return (
        !this.passwordErrors.length && !this.passwordConfirmationErrors.length
      );
    },

    close() {
      this.$emit("onClose");
    },
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    togglePasswordConfirmation() {
      this.isPasswordConfirmationVisible = !this.isPasswordConfirmationVisible;
    },
  },
};
</script>
