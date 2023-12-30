<template>
  <v-dialog v-model="dialog" max-width="300px" @input="handleDialogStatus">
    <v-card color="blue darken-1">
      <v-card-title class="subtitle" style="border-bottom: solid 1px #ffffff33">
        <v-icon class="mr-2">mdi-facebook-messenger</v-icon>
        Facebook Messenger
      </v-card-title>

      <div
        class="text-light pa-6 text-center"
        style="border-bottom: solid 1px #ffffff33"
      >
        <v-img
          :src="botPictureUrl"
          alt="DirectOro Bot"
          style="max-width: 120px"
          class="d-inline-block"
        />
        <h5 class="mt-6">¡Hola! Estamos en Facebook Messenger</h5>
      </div>

      <v-card-actions class="pa-2">
        <v-btn color="white" text="" @click="handleDialogStatus(false)" rounded>
          <v-icon class="mr-2">mdi-close</v-icon>
          <span>Cerrar</span>
        </v-btn>
        <v-spacer />
        <v-btn
          color="white"
          text=""
          href="https://facebook.com/migueldiganchi"
          target="_blank"
          rounded
        >
          <v-icon class="mr-2">mdi-facebook-messenger</v-icon>
          <span>Ir</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    active(showDialog) {
      this.dialog = showDialog;
      if (!showDialog) {
        this.$emit("onClose");
      }
    },
  },
  computed: {
    botPictureUrl() {
      return require("~/assets/media/nano-bot.png");
    },
  },
  methods: {
    handleDialogStatus(value) {
      this.dialog = value;
      if (!value) {
        this.$emit("onClose");
      }
    },
  },
};
</script>
