<template>
  <page
    :breadcrumbs="breadcrumbItems"
    :title="pageTitle"
    :description="pageDescription"
    name="password-reset"
  >
    <!-- Reset form -->
    <div class="px-6 mt-12 mb-15 mx-auto App-xs-box text--white">
      <reset-form
        v-if="!isSent"
        :is-waiting="isWaiting"
        @onSave="startPasswordReset"
      />

      <!-- Sent -->
      <v-card v-if="isSent" class="App-xs-box mx-auto pa-3 pa-sm-9">
        <div class="mb-3 text-center">
          <!-- Error Message -->
          <v-icon
            v-if="errorMessage"
            style="font-size: 90px"
            class="red--text text--darken-1"
            >mdi-alert-circle</v-icon
          >

          <!-- Success Message -->
          <v-icon
            v-else-if="successMessage"
            style="font-size: 90px"
            class="text-gold"
            >mdi-check</v-icon
          >
        </div>

        <!-- Error Message -->
        <p
          v-if="errorMessage"
          v-html="errorMessage"
          class="red--text text--darken-1 text-center"
        />

        <!-- Success Message -->
        <p
          v-else-if="successMessage"
          v-html="successMessage"
          class="text-light text-center"
        />

        <!-- Result Actions -->
        <div class="text-center mt-9">
          <div class="mt-6">
            <v-btn
              rounded
              outlined
              class="pr-4 pl-3 bg-gradient text-dark"
              large
              elevation="3"
              to="/"
            >
              <v-icon>mdi-home</v-icon>
              <span class="ml-2"> Ir al Inicio </span>
            </v-btn>

            <v-btn
              v-if="errorMessage"
              rounded
              outlined
              class="pr-4 pl-3 bg-gradient text-dark mx-2 my-4"
              large
              elevation="3"
              @click="clearResults"
            >
              <v-icon>mdi-restart</v-icon>
              <span class="ml-2"> Volver a intentar </span>
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>

    <div class="text-center text-h7 mb-0 text-dark">
      <div class="App-xxs-box mx-auto">
        <h4>¿Tienes tu contraseña o quieres crearte una nueva?</h4>
      </div>

      <p class="App-container App-xxs-box my-9 mx-auto text-dark">
        Si tienes tu contraseña aquí o quieres crearte una, por favor dale click
        a cualquiera de los siguientes enlaces
      </p>

      <nuxt-link to="/auth" class="text-dark">
        <b>Iniciar Sesión</b>
      </nuxt-link>
      o
      <nuxt-link to="/auth/new" class="text-dark">
        <b>Registrarme</b>
      </nuxt-link>
    </div>
  </page>
</template>

<script>
export default {
  data: () => ({
    errorMessage: "",
    successMessage: "",
    waitingMessage: "",
    isSent: false,
    breadcrumbItems: [
      {
        text: "Inicio",
        disabled: false,
        icon: "mdi-home-heart",
        to: "/",
      },
      {
        text: "Iniciar sesión",
        disabled: false,
        icon: "mdi-key",
        to: "/auth",
      },
      {
        text: "Reinicio de Contraseña",
        disabled: true,
        icon: "mdi-lock-reset",
        to: "/auth/reset",
      },
    ],
  }),
  computed: {
    pageTitle() {
      return "Reinicia tu contraseña";
    },
    pageDescription() {
      return (
        this.waitingMessage ||
        "Ingresa tu correo electrónico para que te enviemos el link de recuperación de contraseña"
      );
    },
    isWaiting() {
      return this.waitingMessage != "";
    },
  },
  methods: {
    startPasswordReset(emailData) {
      const { email } = emailData;
      this.waitingMessage = "Enviando formulario de reinicio de contraseña...";
      return this.$store
        .dispatch("sendPasswordReset", { email })
        .then((resetData) => {
          console.log("[resetData]", resetData);
          this.successMessage =
            "El link de reinicio se ha enviado correctamente";

          this.$notify({
            message: "¡Excelente!",
          });
        })
        .catch((error) => {
          console.error("[error]", error);
          const errorStatus =
            error && error.response && error.response.status
              ? error.response.status
              : null;

          const errorMessage =
            errorStatus == 401 || errorStatus == 403
              ? "El pedido no está autorizado"
              : "Ha ocurrido un inconveniente al enviar el reinicio de contraseña";

          this.errorMessage = errorMessage;

          this.$notify({
            message: errorMessage,
            color: "red",
            timeout: 4500,
          });
        })
        .finally(() => {
          this.isSent = true;
          this.waitingMessage = "";
        });
    },

    clearResults() {
      this.isSent = false;
      this.errorMessage = "";
      this.successMessage = "";
    },
  },
};
</script>
