<template>
  <page
    name="notifications"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="xs-box mx-auto">
      <!-- Empty Notifications -->
      <div v-if="!notifications.length" class="mx-auto my-15">
        <div
          class="py-16 mb-16 mt-3 mx-auto text-center App-xxs-box px-3 px-sm-9"
        >
          <v-icon
            style="font-size: 108px; opacity: 0.63"
            class="mb-6 text-gold"
            >mdi-bell-off-outline</v-icon
          >
          <h5 style="opacity: 0.63" class="px-3 text-gold">
            Hasta el momento no se han encontrado notificaciones
          </h5>
        </div>
      </div>

      <!-- Notifications -->
      <div v-if="notifications.length">
        <notification-cards :notifications="notifications" />

        <!-- Loader button -->
        <div v-if="notificationsNextPage" class="text-center mt-6">
          <v-btn
            :loading="isWaiting"
            rounded
            class=" bg-gradient"
            outlined
            elevation="3"
            @click="loadNotifications(notificationsNextPage)"
            >Ver más</v-btn
          >
        </div>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  middleware: ["auth"],

  mounted() {
    this.$bus.$on("load-notifications", this.loadNotifications);

    this.loadNotifications();
  },

  destroyed() {
    this.$bus.$off("load-notifications");
  },

  data() {
    return {
      waitingMessage: "",
      notifications: [],
      notificationsPage: 1,
      notificationsPageSize: 6,
      notificationsTotalRecords: 0,
      notificationsTotalPages: 0,
      notificationsNextPage: 0,
      notificationToRemoveId: null,

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
          text: "Notificaciones",
          icon: "mdi-bell",
          to: "/dashboard/notifications",
          disabled: true,
        },
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isWaiting() {
      return this.waitingMessage != "";
    },

    pageTitle() {
      return "Notificaciones";
    },

    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : "Mensajes desde la plataforma Oro Bótico";
    },
  },

  methods: {
    loadNotifications(page) {
      const token = this.isAuthenticated ? this.$store.getters.token : null;
      this.waitingMessage = "Cargando notificaciones...";
      this.$store
        .dispatch("getNotifications", {
          token,
          page,
          pageSize: this.notificationsPageSize,
        })
        .then((notificationsData) => {
          const { notifications, total, totalPages, nextPage } =
            notificationsData;

          this.notifications =
            page && page > 1
              ? this.notifications.concat(notifications)
              : [...notifications];
          this.notificationsTotalRecords = total;
          this.notificationsTotalPages = totalPages;
          this.notificationsNextPage = nextPage;
        })
        .catch((error) => {
          this.$notify({
            message:
              "Ha ocurrido un inconveniente al cargar las notificaciones",
            color: "red",
          });
        })
        .finally(() => {
          this.waitingMessage = "";
        });
    },

    startRemoving(notificationToRemove) {
      const { _id: notificationId, message } = notificationToRemove;

      this.$confirm({
        title: "¿Estas seguro que deseas eliminar esta notificación?",
        message: message,
        color: "red",
        onConfirm: () => {
          this.notificationToRemoveId = notificationId;
          this.removeNotification(notificationId);
        },
        onClose: () => {
          this.notificationToRemoveId = null;
          this.$stopConfirm();
        },
      });
    },

    removeNotification(notificationId) {
      this.$bus.$emit("remove-notification", notificationId);
    },

    toggleReading(notificationId) {
      this.$bus.$emit("toggle-notification-reading", notificationId);
    },

    showNotification(notification) {
      this.$bus.$emit("open-notification-dialog", notification);
    },
  },
};
</script>

<!-- <script>
export default {
  middleware: ["auth"],

  asyncData({ store, env }) {
    const notificationList = [
      {
        _id: 1,
        title: "Actualización",
        description:
          "El partner 'Luis Cavadini' ha modificado su perfil y necesita aprobación",
      },
      {
        _id: 2,
        title: "Actualización",
        description:
          "El partner 'Jorge Nuñez' ha modificado su perfil y necesita aprobación",
      },
      {
        _id: 3,
        title: "Eliminación",
        description:
          "El partner 'Jorge Nuñez' ha solicitado dar de baja su cuenta",
      },
    ];

    return {
      notifications: notificationList,
    };
  },
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
      },
      {
        text: "Notificaciones",
        icon: "mdi-bell",
        to: "/dashboard/notifications",
        disabled: true,
      },
    ],
  }),
  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },

    pageTitle() {
      return "Notificaciones";
    },

    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : "Mensajes desde la plataforma Oro Bótico";
    },
  },
};
</script> -->
