<template>
  <v-dialog v-model="dialog" max-width="300px" @input="handleDialogStatus">
    <v-card color="teal darken-3">
      <v-card-title
        class="title py-3 px-4"
        style="border-bottom: solid 1px #ffffff33"
      >
        <div class="text-center" style="text-align: center !important">
          <v-icon class="mr-2 ml-0">mdi-whatsapp</v-icon>
          Whatsapp DirectOro
        </div>
      </v-card-title>

      <div
        class="green--text text--lighten-1 pa-3"
        style="border-bottom: solid 1px #ffffff33"
      >
        <v-textarea
          autofocus
          v-model="whatsappMessage"
          placeholder="Por favor ingresa el mensaje que deseas enviar"
          background-color="teal darken-1"
          solo
          rows="3"
        />
      </div>

      <v-card-actions class="pa-2 white">
        <v-btn
          color="teal darken-3"
          text
          @click="handleDialogStatus(false)"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          color="teal darken-3"
          text
          @click="openExternalWhatsapp()"
          rounded
          class="teal darken-2"
          elevation="3"
        >
          <v-icon class="white--text mr-2">mdi-whatsapp</v-icon>
          <span class="white--text">Enviar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const defaultWhatsappMessage =
  "Hola, me interesa aprender Trading y tener la posibilidad de generar ingresos en dólares";

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
      whatsappMessage: defaultWhatsappMessage,
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
  methods: {
    handleDialogStatus(value) {
      this.dialog = value;
      if (!value) {
        this.$emit("onClose");
      }
    },
    openExternalWhatsapp() {
      const wpMessageUrl = this.getLinkWhastapp(this.whatsappMessage);
      window.open(wpMessageUrl, "_blank");
      this.handleDialogStatus(false);
      this.$bus.$emit("notify", {
        message: "I hope we will be talking soon",
      });
    },
    getLinkWhastapp(message) {
      const number = "+5491135077622";
      var url =
        "https://api.whatsapp.com/send?phone=" +
        number +
        "&text=" +
        encodeURIComponent(message);

      return url;
    },
  },
};
</script>

<style>
.v-text-field__details {
  display: none !important;
}
</style>
