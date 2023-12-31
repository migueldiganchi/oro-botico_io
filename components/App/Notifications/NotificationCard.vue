<template>
  <v-card light class="notification-card">
    <v-card-title
      class="px-4 text-left text-dark grey lighten-4"
      :class="{ 'mb-2': isDescriptionVisible }"
    >
      <small style="font-size: 15px; line-height: 19px">{{
        notification.title
      }}</small>
    </v-card-title>

    <v-card-subtitle
      v-if="notification.readAt"
      class="pa-6 ml-0 ma-0 text-left"
    >
      {{ notification.message }}
    </v-card-subtitle>

    <v-card-actions class="bg-dark pr-2">
      <small class="white--text ml-2">{{
        notification.readAt
          ? `Leido: ${$moment(notification.readAt).format("DD/MM/YYYY hh:mm")}`
          : "Mensaje no leído"
      }}</small>
      <v-spacer />
      <v-btn icon dark @click="show">
        <v-icon v-if="!notification.readAt">mdi-eye</v-icon>
        <v-icon v-if="notification.readAt">mdi-eye-remove</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    isDescriptionVisible: false,
  }),

  methods: {
    show() {
      this.$emit("onShow", this.notification);
    },
  },
};
</script>
