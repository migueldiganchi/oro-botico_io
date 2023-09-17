<template>
  <v-form @submit.prevent="send" class="auth-form">
    <v-card
      :disabled="isWaiting"
      class="box-flow-shadow pa-9 animate__animated bg-dark-gradient"
      :class="{
        animate__pulse: isWaiting,
      }"
    >
      <!-- Email input -->
      <div class="mb-3">
        <v-text-field
          v-model="form.email"
          :error="emailErrors.length > 0"
          :disabled="isWaiting"
          rounded
          autofocus
          outlined
          label="Correo electrónico"
          color="amber"
          @input="isValid('email')"
        />

        <!-- Email Input Validation -->
        <validation-errors :errors="emailErrors" />
      </div>

      <!-- Password Input -->
      <div class="mb-9">
        <v-text-field
          v-model="form.password"
          :type="!isPasswordVisible ? 'password' : 'text'"
          :append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :error="passwordErrors.length > 0"
          :disabled="isWaiting"
          rounded
          outlined
          label="Contraseña"
          color="amber"
          @click:append="isPasswordVisible = !isPasswordVisible"
          @input="isValid('password')"
        />

        <!-- Password Input Validation -->
        <validation-errors :errors="passwordErrors" />

        <div class="text-center mt-6">
          <nuxt-link to="/auth/reset" class="my-3 show-password-checkbox">
            Olvidé mi contraseña
          </nuxt-link>
        </div>
      </div>

      <!-- Actions -->
      <div class="text-center">
        <v-btn
          :disabled="isWaiting"
          :loading="isWaiting"
          :rounded="!isWaiting"
          :icon="isWaiting"
          :class="{
            'pl-2': !isWaiting,
          }"
          type="submit"
          large
          class="bg-gold text-light"
          outlined
          elevation="3"
        >
          <span>
            <v-icon class="mr-2 google-icon">mdi-arrow-right</v-icon>
            <span style="position: relative; top: 3px">Ingresar</span>
          </span>
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

const passwordMinLength = 6;
const passwordMaxLength = 18;

export default {
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(passwordMinLength),
        maxLength: maxLength(passwordMaxLength),
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
      isSessionRemembered: false,
      formCheckIn: false,
      form: {
        email: "",
        password: "",
      },
      emailErrors: [],
      passwordErrors: [],
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

      this.$emit("onAuth", this.form);
    },

    isValid(field) {
      if (!this.formCheckIn) {
        return true;
      }

      this.emailErrors = [];
      this.passwordErrors = [];

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
            text: "El título es necesario",
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

      return !this.emailErrors.length && !this.passwordErrors.length;
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

.show-password-checkbox {
  font-size: 15px !important;
  * {
    font-size: 15px !important;
  }
}
</style>
