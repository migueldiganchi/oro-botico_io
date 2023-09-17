<template>
  <page
    name="settings"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="mx-auto">
      <!-- PERSONAL INFORMATION -->
      <v-row class="pa-0 ma-0" justify="center">
        <!-- MEMBER FOR INFORMATION -->
        <v-col cols="12" md="6" class="pa-0 pr-sm-3 ma-0 pb-9">
          <member-form :user="authUser" :is-waiting="isWaiting" />
        </v-col>

        <!-- BUSINESS INFORMATION -->
        <v-col
          v-if="authUser?.isLandingUser"
          cols="12"
          md="6"
          class="pa-0 pl-sm-3 ma-0"
        >
          <member-business-form :user="authUser" :is-waiting="isWaiting" />
        </v-col>
      </v-row>
    </div>
  </page>
</template>

<script>
export default {
  middleware: ["auth"],

  mounted() {
    if (!this.authenticatedUser) {
      this.loadAuthUser();
    }
  },

  data: () => ({
    waitingMessage: "",
    authUser: null,
    breadcrumbItems: [
      {
        text: "Inicio",
        icon: "mdi-home-heart",
        to: "/",
      },
      {
        text: "Panel de Control",
        icon: "mdi-gamepad",
        to: "/dashboard",
      },
      {
        text: "Mi Cuenta",
        icon: "mdi-account-check",
        to: "/dashboard/settings",
        disabled: true,
      },
    ],
  }),

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isSuperAuthenticated() {
      return this.$store.getters.isSuperAuthenticated;
    },

    authenticatedUser() {
      return this.$store.authenticatedUser;
    },

    authenticatedToken() {
      return this.$store.getters.token;
    },

    isWaiting() {
      return this.waitingMessage != "";
    },

    pageTitle() {
      return "Mi Cuenta";
    },

    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : "Administra información de tu cuenta";
    },
  },

  methods: {
    loadAuthUser() {
      this.waitingMessage = "Cargando información...";

      return this.$store
        .dispatch("getAuthenticatedUser", this.authenticatedToken)
        .then((authUser) => {
          this.authUser = { ...authUser };
        })
        .catch((error) => {
          console.error("[error]", error);
          const errorStatus =
            error && error.response && error.response.status
              ? error.response.status
              : null;

          const errorMessage =
            errorStatus == 401
              ? "Necesita autorización"
              : errorStatus == 403
              ? "Las credenciales para ver esta información son incorrectas"
              : "Ha ocurrido un inconveniente al cargar los datos del usuario";

          this.$notify({
            message: errorMessage,
            color: "red",
            timeout: 4500,
          });
        })
        .finally(() => {
          this.waitingMessage = "";
        });
    },
  },
};
</script>
