<template>
  <page
    name="dashboard"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <grid-menu :items="menuItems" />
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
        text: "Panel de Control",
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
      return "Panel de Control";
    },

    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : this.isSuperAuthenticated // SUPER USER
        ? "Socio de Oro Bótico"
        : this.isAuthenticated // SIMPLE USER
        ? "Entérate de las novedades de Oro Bótico y gestiona los datos de tu perfil"
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
