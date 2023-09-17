<template>
  <div class="notification-set">
    <div
      v-for="(notification, nIndex) in notifications"
      :key="nIndex"
      :class="{
        'mb-6': nIndex < notifications.length - 1,
      }"
      class="notification-set_item"
    >
      <notification-card :notification="notification" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
