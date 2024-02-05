<template>
  <page
    name="auth-new"
    title="Nueva contraseña"
    back-text="Inicio"
    icon="mdi-home"
  >
    <div class="px-6 mt-12 mx-auto App-xs-box">
      <!--Token Status Message -->
      <v-card
        v-if="tokenStatusMessage"
        class="pa-6 text-center bg-dark-gradient"
        :class="{
          'color-green': isWaiting,
          'text-light': isTokenValid && !isWaiting,
          'red--text text--darken-1': !isTokenValid && !isWaiting,
        }"
      >
        <b>{{ tokenStatusMessage }}</b>

        <!-- Error Result -->
        <div v-if="!isWaiting && !isTokenValid" class="mt-6 text-center">
          <v-btn
            rounded
            class="ml-3 pl-2 bg-gold"
            dark
            elevation="3"
            to="/auth/reset"
          >
            <v-icon class="mt-1">mdi-restart</v-icon>
            <span class="ml-2">Reintentar</span>
          </v-btn>
        </div>
      </v-card>

      <!-- Password Form -->
      <password-form
        v-else-if="isTokenValid && !isSuccessfullChanged"
        :is-waiting="isWaiting"
        @onSave="saveNewPassword"
      />

      <!-- After saving password -->
      <div v-if="isFormSent">
        <!-- Success Result -->
        <v-card
          v-if="isSuccessfullChanged"
          class="auth-page-box bg-double-color pa-4 radius-3 text-center"
        >
          <!-- Check Icon -->
          <v-icon class="amber--text" size="90px">mdi-check</v-icon>

          <!-- Success Message -->
          <div class="pa-6">
            <b>La contraseña se ha guardado exitosamente</b>
          </div>

          <!-- Actions -->
          <div class="my-6">
            <v-btn rounded class="pl-3 bg-gold" dark elevation="3" to="auth">
              <v-icon class="mr-2">mdi-key</v-icon>
              <span>Entrar</span>
            </v-btn>
          </div>

          <div class="pa-3">
            <nuxt-link to="/">Ir al Inicio</nuxt-link>
          </div>
        </v-card>

        <!-- Bad Result -->
        <v-card
          v-else
          class="auth-page-box bg-double-color pa-4 radius-3 text-center"
        >
          <div class="pa-6">
            Algo no salió como esperábamos al guardar la nueva contraseña. Vamos
            a intentarlo nuevamente
          </div>
          <div class="mt-6">
            <v-btn rounded class="pl-2 bg-gradient text-dark" elevation="3">
              <v-icon>mdi-home</v-icon>
              <span class="ml-2">Ir al Inicio</span>
            </v-btn>

            <v-btn icon elevation="3" to="/auth/reset">
              <v-icon>mdi-restart</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  async asyncData({ route, store }) {},

  mounted() {
    const resetToken = this.$route.params.token;
    this.validateToken(resetToken);
  },

  data() {
    return {
      currentUser: null,
      isTokenValid: false,
      isFormSent: false,
      isSuccessfullChanged: false,
      waitingMessage: "Aguarda un momento por favor...",
      tokenStatusMessage: "Verificando los permisos para realizar el cambio...",
    };
  },

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },
  },

  methods: {
    validateToken(resetToken) {
      setTimeout(() => {
        return this.$store
          .dispatch("validatePasswordReset", resetToken)
          .then((validationData) => {
            const { status, user } = validationData;
            this.isTokenValid = status && status == true;
            this.currentUser = user;
            this.tokenStatusMessage = "";
          })
          .catch((error) => {
            this.tokenStatusMessage =
              "El token es incorrecto. Por favor intente nuevamente";
          })
          .finally(() => {
            this.waitingMessage = "";
          });
      }, 3999);
    },

    saveNewPassword(newPasswordData) {
      const { password: newPassword } = newPasswordData;
      const resetToken = this.$route.params.token;
      const userId = this.currentUser._id;

      this.waitingMessage = "Guardando nueva contraseña...";
      return this.$store
        .dispatch("savePassword", {
          password: newPassword,
          userId: userId,
          resetToken: resetToken,
        })
        .then((savedPasswordData) => {
          this.isSuccessfullChanged = true;
          this.$bus.$emit("notify", {
            type: "info",
            message: "La contraseña se ha cambiado exitosamente",
          });
        })
        .catch((error) => {
          this.$bus.$emit("notify", {
            type: "danger",
            message:
              "Ha ocurrido un inconveniente al guardar la nueva contraseña",
          });
        })
        .finally(() => {
          this.isFormSent = true;
          this.waitingMessage = "";
        });
    },
  },
};
</script>
