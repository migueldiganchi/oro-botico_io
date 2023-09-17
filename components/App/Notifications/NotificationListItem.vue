<template>
  <v-card
    class="notification-list-item"
    :dark="notification.readAt ? false : true"
    :color="notification.readAt ? 'white' : notification.kind"
  >
    <v-list-item :key="notification.title">
      <!-- FROM AVATAR -->
      <v-list-item-avatar>
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

        <!-- MESSAGE -->
        <v-list-item-subtitle v-if="notification.readAt">
          <i><v-icon style="font-size: 18px !important">mdi-eye</v-icon></i>
          <span class="text--primary">
            Leído =>
            {{ $moment(notification.readAt).format("DD/MM/YYYY hh:mm") }}</span
          >
          &mdash;
          <span v-html="notification.message" />
        </v-list-item-subtitle>
      </v-list-item-content>

      <!-- ACTIONS FOR NOTIFICATION -->
      <v-list-item-action class="d-inline-block">
        <v-tooltip v-if="notification.readAt" top color="#d1a837">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click="startRemove(notification)"
              ><v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar</span>
        </v-tooltip>

        <v-tooltip v-if="notification.readAt" top color="green">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="show(notification)"
              ><v-icon>mdi-eye-remove</v-icon>
            </v-btn>
          </template>
          <span>Marcar como no leído</span>
        </v-tooltip>

        <v-tooltip v-else top color="green">
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
