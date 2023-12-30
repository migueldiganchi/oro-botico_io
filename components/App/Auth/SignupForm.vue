<template>
  <v-form @submit.prevent="send" class="auth-form signup-form">
    <v-card :disabled="isWaiting" class="pa-9 bg-dark-gradient border-gold">
      <!-- Email input -->
      <div class="mb-3">
        <v-text-field
          v-model="form.email"
          :error="emailErrors.length > 0"
          :disabled="isWaiting"
          autofocus
          type="email"
          rounded
          outlined
          color="amber"
          label="Correo electrónico"
          @input="isValid('email')"
        />

        <!-- Email Input Validation -->
        <validation-errors :errors="emailErrors" />
      </div>

      <!-- Name input -->
      <div class="mb-3">
        <v-text-field
          v-model="form.name"
          :error="nameErrors.length > 0"
          :disabled="isWaiting"
          type="email"
          rounded
          outlined
          color="amber"
          label="Nombre"
          placeholder="Puede ser solo el primer nombre"
          @input="isValid('name')"
        />

        <!-- Name Input Validation -->
        <validation-errors :errors="nameErrors" />
      </div>

      <!-- Password input -->
      <div class="mb-3">
        <v-text-field
          v-model="form.password"
          :type="!isPasswordVisible ? 'password' : 'text'"
          :error="passwordErrors.length > 0"
          :append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :disabled="isWaiting"
          rounded
          outlined
          @click:append="isPasswordVisible = !isPasswordVisible"
          color="amber"
          label="Contraseña"
          @input="isValid('password')"
        />

        <!-- Password Input Validation -->
        <validation-errors :errors="passwordErrors" />
      </div>

      <!-- Password confirmation input -->
      <div class="mb-9">
        <v-text-field
          v-model="form.passwordConfirmation"
          :type="!isPasswordConfirmationVisible ? 'password' : 'text'"
          :error="passwordConfirmationErrors.length > 0"
          :disabled="isWaiting"
          :append-icon="
            isPasswordConfirmationVisible ? 'mdi-eye-off' : 'mdi-eye'
          "
          rounded
          outlined
          color="amber"
          label="Confirma contraseña"
          @click:append="
            isPasswordConfirmationVisible = !isPasswordConfirmationVisible
          "
          @input="isValid('passwordConfirmation')"
        />

        <!-- Password Confirmation Input Validation -->
        <validation-errors :errors="passwordConfirmationErrors" />
      </div>

      <div class="d-flex align-center mb-9 px-3 text-left">
        <v-switch
          v-model="isAccepted"
          color="#d1a837"
          class="mr-3 text-left"
          style="height: 33px; top: -9px; position: relative"
        />
        <small>
          {{ isAccepted ? "Acepto" : "No acepto" }}
          los <a href="/terms" target="_blank">Términos de Uso</a> y
          <a href="/privacy" target="_blank">Políticas de Privacidad</a>
        </small>
      </div>

      <!-- Actions -->
      <div class="text-center">
        <v-btn
          :disabled="isWaiting || !isAccepted"
          :rounded="isAccepted || !isWaiting"
          :icon="!isAccepted || isWaiting"
          :class="{
            'pl-2': isAccepted && !isWaiting,
          }"
          type="submit"
          outlined
          class="bg-gold text-light"
          elevation="3"
        >
          <v-icon
            class="google-icon text-light"
            :class="{
              'mr-2': isAccepted && !isWaiting,
            }"
            >mdi-check</v-icon
          >
          <span v-if="isAccepted && !isWaiting">Crear Cuenta</span>
        </v-btn>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

const nameMinLength = 3;
const nameMaxLength = 33;
const passwordMinLength = 6;
const passwordMaxLength = 21;

export default {
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(nameMinLength),
        maxLength: maxLength(nameMaxLength),
      },
      email: {
        required,
        email,
      },
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
      isAccepted: false,
      isPasswordVisible: false,
      isPasswordConfirmationVisible: false,
      formCheckIn: false,
      form: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      nameErrors: [],
      emailErrors: [],
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

      this.nameErrors = [];
      this.emailErrors = [];
      this.passwordErrors = [];
      this.passwordConfirmationErrors = [];

      // Name Validation
      if (!field || field === "name") {
        if (!this.$v.form.name.required) {
          this.nameErrors.push({
            key: "required",
            text: "El nombre es necesario",
          });
        }
        if (!this.$v.form.name.minLength) {
          this.nameErrors.push({
            key: "minLength",
            text: `El nombre es demasiado corto (min: ${nameMinLength})`,
          });
        }
        if (!this.$v.form.name.maxLength) {
          this.nameErrors.push({
            key: "maxLength",
            text: `El nombre es demasiado largo (max: ${nameMaxLength})`,
          });
        }
      }

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
            text: "Debes confirmar la contraseña",
          });
        }

        if (this.form.password != this.form.passwordConfirmation) {
          this.passwordConfirmationErrors.push({
            key: "equalTo",
            text: "Las contraseñas no coinciden",
          });
        }
      }

      return (
        !this.nameErrors.length &&
        !this.emailErrors.length &&
        !this.passwordErrors.length &&
        !this.passwordConfirmationErrors.length
      );
    },
  },
};
</script>

<style lang="scss">
.signup-form {
  .v-btn.v-btn--disabled {
    color: #333 !important;
    border-color: #b3b3b3 !important;
  }

  .theme--dark.v-btn.v-btn--disabled .v-icon {
    color: #999 !important;
  }
}
</style>
