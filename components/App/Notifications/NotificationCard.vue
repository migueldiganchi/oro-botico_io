<template>
  <v-card light class="notification-card">
    <v-card-body class="red">
      <v-card-title class="pl-4 text-left text-dark">
        <small style="font-size: 15px; line-height: 19.9px">{{
          notification.title
        }}</small>
      </v-card-title>

      <v-card-subtitle v-if="false" class="pb-6 ml-0 pl-4 ma-0 text-left">
        {{ notification.message }}
      </v-card-subtitle>
    </v-card-body>

    <v-card-actions class="bg-dark-gradient pr-2">
      <small class="text-light ml-2">{{
        isDescriptionVisible ? "Leído a las 12:00" : "Mensaje no leído"
      }}</small>
      <v-spacer />
      <v-btn icon class="bg-gradient" light>
        <v-icon>mdi-eye</v-icon>
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
};
</script>
