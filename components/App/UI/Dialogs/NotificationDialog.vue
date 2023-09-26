<template>
  <v-dialog
    v-model="dialog"
    scrollable
    transition="dialog-top-transition"
    max-width="450"
  >
    <v-card class="white">
      <!-- begin:: Notification title -->
      <v-card-title class="text-center d-block text-h6 text-gold" :class="headerClass">
        <h2 v-if="notificationIcon" class="m-0 my-3">
          <v-icon class="text-h3">{{ notificationIcon }}</v-icon>
        </h2>
        <b>{{ notification?.title }}</b>
      </v-card-title>
      <!-- end:: Notification title -->

      <!-- begin:: Notification messge -->
      <v-card-text
        class="text-center mt-5"
        :class="`${notificationColor}--text`"
      >
        <div v-html="notification?.message" style="font-size: 18px" />
      </v-card-text>
      <!-- end:: Confirmation content -->

      <!-- begin:: Reading details -->
      <div v-if="notification?.readAt" class="mx-6 mb-3 text-center">
        <small :class="`${notificationColor}--text`"
          >Leído&nbsp;<v-icon
            :class="`${notificationColor}--text`"
            style="font-size: 14.4px"
            >mdi-eye</v-icon
          >&nbsp;
          <b>{{
            $moment(notification.readAt).format("DD/MM/YYYY hh:mm")
          }}</b></small
        >
      </div>
      <!-- end:: Reading details -->

      <!-- begin:: Confirmation actions -->
      <v-card-actions class="pa-3 bg-tr" :class="footerClass">
        <!-- begin:: Cancel buttom -->
        <v-btn
          color="bg-gold"
          @click.prevent.stop="close()"
          rounded
          :loading="isLoading"
        >
          <span :class="`${notificationColor}--text`">
            <v-icon>mdi-close</v-icon>
            Cerrar
          </span>
        </v-btn>
        <!-- end:: Cancel buttom -->

        <v-spacer />

        <!-- begin:: Ok button -->
        <v-btn
          v-if="notification.readAt"
          color="bg-gold"
          @click="toggleReading()"
          rounded
          :loading="isLoading"
        >
          <span :class="`${notificationColor}--text`">
            <v-icon>mdi-eye-remove</v-icon>
            {{ "Marcar como no leído" }}
          </span>
        </v-btn>
        <!-- end:: Ok button -->
      </v-card-actions>
      <!-- end:: Confirmation actions -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: () => false,
    },
    notification: {
      type: Object,
      default: () => {},
    },
    isLoading: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    notificationColor() {
      switch (this.notification?.kind) {
        case "success":
          return "#d1a837";
        case "danger":
          return "red";
        case "warning":
          return "amber";
        case "info":
          return "blue";
        default:
          return "blue";
      }
    },
    headerClass() {
      return `${this.notificationColor} lighten-4 ${this.notificationColor}--text`;
    },
    footerClass() {
      return `${this.notificationColor} darken-1`;
    },
    notificationIcon() {
      return "mdi-bell";
    },
  },

  watch: {
    isActive(isActiveValue) {
      this.dialog = isActiveValue;
    },

    dialog(isOpened) {
      if (!isOpened) {
        this.close();
      }
    },
  },

  methods: {
    close() {
      this.$emit("onClose");
    },

    toggleReading() {
      if (!this.notification) {
        return null;
      }

      this.$emit("onToggleReading", this.notification?._id);
    },
  },
};
</script>
