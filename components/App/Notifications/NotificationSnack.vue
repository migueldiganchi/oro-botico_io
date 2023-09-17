<template>
  <div v-if="notification !== null">
    <v-snackbar
      :color="notificationColor"
      top
      left
      rounded="pill"
      shaped
      v-model="isNotificationOpened"
      :timeout="notification.timeout"
    >
      <div class="d-inline-block px-3">
        <span class="text-light" v-html="notification.message" />
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          text
          v-bind="attrs"
          @click="isNotificationOpened = false"
          class="text-light"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    notificationColor() {
      if (!this.notification) {
        return;
      }

      switch (this.notification.color) {
        case "info":
          return "blue darken-3";
        case "danger":
        case "red":
          return "red darken-1";
        case "orange":
          return "orange darken-1";
        case "success":
        case "green":
          return "green darken-1";
        default:
          return "blue darken-3";
      }
    },
  },
  data() {
    return {
      isNotificationOpened: false,
    };
  },
  watch: {
    notification(notificationValue) {
      if (this.isNotificationOpened) {
        return;
      }
      this.isNotificationOpened = notificationValue !== null;
    },
  },
};
</script>
