<template>
  <v-dialog
    v-model="dialog"
    scrollable
    transition="dialog-top-transition"
    max-width="450"
  >
    <v-card light>
      <!-- begin:: Notification title -->
      <v-card-title class="text-center d-block text-h6 pb-6" :class="headerClass">
        <h2 v-if="notificationIcon" class="mt-3 mb-6">
          <v-icon class="text-h2" :class="`${notificationColor}--text`">{{
            notificationIcon
          }}</v-icon>
        </h2>
        <b>{{ notification?.title }}</b>
      </v-card-title>
      <!-- end:: Notification title -->

      <!-- begin:: Notification messge -->
      <v-card-text class="text-center mt-9 pb-3">
        <div
          v-html="notification?.message"
          style="font-size: 18px"
          class="black--text"
        />
      </v-card-text>
      <!-- end:: Confirmation content -->

      <!-- begin:: Reading details -->
      <div v-if="notification?.readAt" class="mx-6 mb-9 text-center">
        <small class="grey--text"
          >Leído&nbsp;<v-icon class="grey--text" style="font-size: 14.4px"
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
          :color="notificationColor"
          @click.prevent.stop="close()"
          rounded
          text
          :loading="isLoading"
        >
          <span class="white--text">
            <v-icon>mdi-close</v-icon>
            Cerrar
          </span>
        </v-btn>
        <!-- end:: Cancel buttom -->

        <v-spacer />

        <!-- begin:: Ok button -->
        <v-btn
          v-if="notification.readAt"
          color="white"
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
          return "green";
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
      return `${this.notificationColor} lighten-5 ${this.notificationColor}--text`;
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
