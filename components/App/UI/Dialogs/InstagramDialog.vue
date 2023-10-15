<template>
  <v-dialog v-model="dialog" max-width="300px" @input="handleDialogStatus">
    <v-card class="bg-instagram">
      <v-card-title class="subtitle" style="border-bottom: solid 1px #ffffff33">
        <v-icon class="mr-2">mdi-instagram</v-icon>
        Instagram
      </v-card-title>

      <div
        class="text-light pa-6 text-center"
        style="border-bottom: solid 1px #ffffff33"
      >
        <img
          :src="botPictureUrl"
          alt="Oro Bótico Bot"
          style="max-width: 120px"
          class="d-inline-block"
        />
        <h4 class="mt-6">¡Hola! ¡También estamos en Instagram!</h4>
      </div>

      <v-card-actions class="pa-2 white">
        <v-btn @click="handleDialogStatus(false)" color="#E4405F" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          class="bg-instagram"
          href="https://instagram.com/neutron.bot"
          target="_blank"
          rounded
          elevation="3"
          style="border: solid 1px #fff !important"
          outlined
        >
          <v-icon class="mr-2 mt-1">mdi-instagram</v-icon>
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
      return (
        require("~/assets/media/trading.png") + "?key=" + new Date()
      );
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
