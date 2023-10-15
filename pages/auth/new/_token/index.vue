<template>
  <page
    name="auth-new"
    title="Verificación de cuenta"
    back-text="Inicio"
    icon="mdi-home"
  >
    <div class="App-xs-box mx-auto pa-6">
      <v-card class="pa-7 mt-3 radius-3 text-center text-light">
        <div v-html="statusMessage" />
        <div v-if="statusAccountValidationIsFinished && statusAccountIsActive">
          <v-btn
            to="/auth"
            :disabled="isWaiting"
            :loading="isWaiting"
            rounded
            class="mt-9 bg-gold pl-2 text-light"
            elevation="3"
            outlined
            dark
            large
          >
            <span>
              <v-icon>mdi-key</v-icon>
              <span class="ml-2">Entrar</span>
            </span>
          </v-btn>
        </div>

        <div v-else-if="statusAccountValidationIsFinished" class="mt-3">
          Escríbenos a <b>hello@ciudadbotica.com</b> para más información.

          <div class="text-xs-center mt-9">
            <v-btn
              to="/"
              rounded
              class="bg-gradient pl-2 ma-2"
              elevation="3"
              outlined
              dark
              large
            >
              <v-icon class="text-dark">mdi-home</v-icon>
              <span class="ml-3 text-dark">Ir al Inicio</span>
            </v-btn>

            <v-btn
              to="/auth"
              rounded
              class="bg-gradient pl-2 ma-2"
              elevation="3"
              outlined
              dark
              large
            >
              <v-icon class="text-dark">mdi-key</v-icon>
              <span class="ml-3 text-dark">Iniciar Sesión</span>
            </v-btn>
          </div>
        </div>

        <div class="mt-9 text-center">
          Desde ya muchas gracias por utilizar nuestro servicio
        </div>
      </v-card>
    </div>
  </page>
</template>

<script>
export default {
  async asyncData({ route }) {
    const { token: signupToken } = route.params;
    return {
      signupToken: signupToken,
    };
  },
  mounted() {
    this.validateAccount(this.signupToken);
  },
  data() {
    const defaultMessage =
      "Aguarda un momento por favor, estamos verificando tu cuenta...";

    return {
      isWaiting: false,
      statusAccountValidationIsFinished: false,
      statusAccountIsActive: false,
      statusMessage: defaultMessage,
      statusMessageType: "default",
      pathItems: [
        { _id: 1, path: "/", iconPrefix: "fas", icon: "home" },
        { _id: 2, path: "/auth/new", iconPrefix: "fas", icon: "user-plus" },
        { _id: 3, path: "/auth/new/token", iconPrefix: "fas", icon: "check" },
      ],
    };
  },
  methods: {
    validateAccount(signupToken) {
      this.isWaiting = true;
      setTimeout(() => {
        return this.$store
          .dispatch("activateUserAccount", signupToken)
          .then((accountValidationData) => {
            const isActive =
              accountValidationData && accountValidationData.status;
            this.statusAccountIsActive = isActive;
            this.statusMessageType = isActive ? "success" : "danger";
            this.statusMessage =
              "¡<b>Felicitaciones</b>! Puedes acceder a todas las funcionalidades de <b>Oro Bótico</b>";
          })
          .catch((error) => {
            this.statusMessageType = "danger";
            this.statusMessage =
              "Lamentamos informarte que se ha presentado un inconveniente durante la activación de tu cuenta.";
          })
          .finally(() => {
            this.isWaiting = false;
            this.statusAccountValidationIsFinished = true;
          });
      }, 3000);
    },
  },
};
</script>
