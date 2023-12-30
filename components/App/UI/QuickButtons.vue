<template>
  <div class="App-quick-buttons" :class="{ hidden: hidden }">
    <!-- left-Bottom Button -->
    <v-btn
      @click="startInstagram()"
      fixed
      dark
      left
      bottom
      fab
      elevation="9"
      class="box-shadow bg-instagram left-bottom"
      :class="{ 'hidden-quick-button': hidden }"
    >
      <v-icon class="mt-1">mdi-instagram</v-icon>
    </v-btn>

    <!-- Right-Bottom Button -->
    <v-btn
      @click="startWhatsapp()"
      color="green"
      fixed
      dark
      right
      bottom
      fab
      elevation="9"
      class="box-shadow right-bottom"
      :class="{ 'hidden-quick-button': hidden }"
    >
      <v-icon>mdi-whatsapp</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    hidden: {
      type: Boolean,
      
      default: () => false,
    },
  },
  methods: {
    startWhatsapp() {
      this.$emit("onStartWhatsapp");
    },
    startFacebookMessenger() {
      this.$emit("onStartFacebookMessenger");
    },
    startInstagram() {
      this.$emit("onStartInstagram");
    },
  },
};
</script>
