<template>
  <v-card
    class="notification-list-item"
    :dark="notification.readAt ? false : true"
    :color="notification.readAt ? 'white' : notification.kind"
  >
    <v-list-item :key="notification.title" class="px-2">
      <!-- FROM AVATAR -->
      <v-list-item-avatar class="mr-2">
        <v-img :src="fromUrl" :title="fromName" />
      </v-list-item-avatar>

      <!-- TEXT OF NOTIFICATION -->
      <v-list-item-content>
        <!-- TITLE -->
        <v-list-item-title>
          <span v-if="notification.readAt"
            ><small>{{ notification.title }}</small></span
          >
          <b v-else>
            <small>{{ notification.title }}</small>
          </b>
          <small
            v-if="notification.createdAt"
            class="grey--text"
            :class="{
              'text--lighten-1': notification.readAt != null,
              'text--lighten-2': notification.readAt == null,
            }"
            >{{ new Date(notification.createdAt).toLocaleDateString() }}</small
          >
        </v-list-item-title>
      </v-list-item-content>

      <!-- ACTIONS FOR NOTIFICATION -->
      <v-list-item-action class="d-inline-block">
        <v-tooltip v-if="notification.readAt" top color="amber">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="show(notification)"
              ><v-icon>mdi-eye-remove</v-icon>
            </v-btn>
          </template>
          <span>Marcar como no leído</span>
        </v-tooltip>

        <v-tooltip v-else top color="#d1a837">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon @click="show(notification)"
              ><v-icon>mdi-eye</v-icon></v-btn
            >
          </template>
          <span>Leer</span>
        </v-tooltip>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },

    isWaiting: {
      type: Boolean,
      default: () => false,
    },

    isRemoving: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    fromName() {
      return this.notification?.fromUser?.name
        ? this.notification.fromUser.name
        : "Sustentopia";
    },

    fromUrl() {
      const defaultUrl = require("~/assets/media/nano-bot.png");
      return this.notification?.fromUser?.pictureUrl
        ? this.notification.fromUser.pictureUrl
        : defaultUrl;
    },
  },

  methods: {
    actionClick(action) {
      this.$emit("onActionClick", action);
    },

    show(notification) {
      this.$emit("onShow", notification);
    },

    toggleReading(notificationId) {
      this.$emit("onToggleReading", notificationId);
    },

    startRemove(notification) {
      this.$emit("onStartRemove", notification);
    },
  },
};
</script>
