<template>
  <page
    name="dashboard"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="App-sm-box">
      <grid-menu :items="menuItems" />
    </div>
  </page>
</template>

<script>
export default {
  middleware: ["auth"],

  data: () => ({
    waitingMessage: "",
    breadcrumbItems: [
      {
        text: "Inicio",
        icon: "mdi-home-heart",
        to: "/",
      },
      {
        text: "Mi Panel",
        icon: "mdi-gamepad",
        to: "/dashboard",
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

    isWaiting() {
      return this.waitingMessage != "";
    },

    pageTitle() {
      return "Mi Panel";
    },

    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : this.isSuperAuthenticated // SUPER USER
        ? "Socio de Oro Bótico"
        : this.isAuthenticated // SIMPLE USER
        ? "Administra tu Mi Panel en Oro Bótico"
        : "[]";
    },

    menuItems() {
      return this.isSuperAuthenticated
        ? [
            {
              key: "1",
              title: "Notificaciones",
              icon: "mdi-bell",
              to: "/dashboard/notifications",
            },
            {
              key: "2",
              title: "Miembros",
              icon: "mdi-account-multiple",
              to: "/dashboard/members",
            },
            {
              key: "3",
              title: "Preguntas Frecuentes",
              icon: "mdi-head-question",
              to: "/dashboard/qa",
            },
            {
              key: "4",
              title: "Consejos",
              icon: "mdi-lightbulb",
              to: "/dashboard/tips",
            },
            {
              key: "5",
              title: "Mi Cuenta",
              icon: "mdi-account-check",
              to: "/dashboard/settings",
            },
            {
              key: "6",
              title: "Bot",
              icon: "mdi-robot",
              to: "/bot",
            },
          ]
        : this.isAuthenticated
        ? [
            {
              key: "2",
              title: "Notificaciones",
              icon: "mdi-bell",
              to: "/dashboard/notifications",
            },

            {
              key: "6",
              title: "Bot",
              icon: "mdi-robot",
              to: "/bot",
            },
            // {
            //   key: "3",
            //   title: "Asistentes",
            //   icon: "mdi-robot",
            //   to: "/dashboard/assistants",
            // },
            {
              key: "1",
              title: "Mi Cuenta",
              icon: "mdi-account-check",
              to: "/dashboard/settings",
            },
          ]
        : [
            /**/
          ];
    },
  },
};
</script>
