<template>
  <div>
    <template>
      <notification-list-item
        v-for="(notification, nIndex) in notifications"
        :notification="notification"
        :key="nIndex"
        :class="{
          'mb-3': nIndex < notifications.length - 1,
        }"
        @onActionClick="handleKeyClick"
        @onToggleReading="toggleReading"
        @onShow="showNotification"
        @onStartRemove="startRemove"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },

    isWaiting: {
      type: Boolean,
      default: () => false,
    },

    removingNotificationId: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    handleKeyClick(actionKey) {
      this.$emit("onActionClick", actionKey);
    },

    toggleReading(notificationId) {
      this.$emit("onToggleReading", notificationId);
    },

    showNotification(notification) {
      this.$emit("onShowNotification", notification);
    },

    startRemove(notification) {
      this.$emit("onStartRemove", notification);
    },

    isRemoving(notificationId) {
      return this.removingNotificationId == notificationId;
    },
  },
};
</script>
