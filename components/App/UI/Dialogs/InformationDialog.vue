<template>
  <v-dialog
    v-model="dialog"
    @input="handleDialogStatus"
    scrollable
    max-width="450px"
  >
    <v-card class="mx-auto bg-dark-gradient" max-width="450px" dark>
      <v-card-text class="bg-dark pa-6 text-center">
        <h3 class="text-h5 text-center mb-9 mt-3 text-light">
          <b v-text="title" />
        </h3>

        <!-- Media URL -->
        <div class="mb-6 text-center">
          <logo :url="mediaUrl" />
        </div>

        <!-- Introduction text -->
        <b
          class="ma-0 pa-0 mt-3 mb-3 d-block text-light text-lg-h5 text-sm-h6 x-small-box mx-auto"
          style="word-break: normal !important"
        >
          <span v-html="subtitle" />
        </b>

        <!-- Description text -->
        <div class="text-light mt-3 mb-6 mx-auto x-small-box">
          <h3 class="text-thin">{{ description }}</h3>
        </div>

        <!-- Details -->
        <div v-if="text" class="text-lg-h6 text-sm-h7">
          <span class="text-light">{{ text }}</span>
        </div>
      </v-card-text>

      <v-card-actions
        class="bg-light pa-4"
        :class="{
          'text-center d-block': !href && !to,
        }"
      >
        <v-btn
          @click="dialog = false"
          class="d-inline-block pl-2 pr-3"
          text
          light
          rounded
        >
          <v-icon class="mt-1">mdi-close</v-icon>
          <span class="ml-1">Cerrar</span>
        </v-btn>

        <v-spacer />

        <!-- Spacer -->
        <v-spacer v-if="href || to" />

        <div v-if="href || to" class="d-inline-block">
          <v-btn
            v-if="href"
            :href="href"
            :target="hrefTarget"
            class="d-inline-block bg-gold ml-2 pl-2 pr-3 float-right"
            outlined
            rounded
            elevation="3"
          >
            <div class="d-inline-block mt-1">
              <v-icon>{{ hrefIcon || toIcon || "mdi-arrow-right" }}</v-icon>
              <span class="ml-1" style="position: relative; top: 3px">{{
                hrefCaption
              }}</span>
            </div>
          </v-btn>

          <v-btn
            v-if="to"
            :to="to"
            class="d-inline-block bg-gold ml-2 pl-3 float-right"
            large
            outlined
            rounded
            elevation="3"
            @click.stop="dialog = false"
          >
            <div class="d-inline-block mt-2">
              <v-icon>{{ hrefIcon || toIcon || "mdi-arrow-right" }}</v-icon>
              <span class="ml-2" style="position: relative; top: 3px">{{
                toCaption
              }}</span>
            </div>
          </v-btn>
        </div>
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
    mediaUrl: {
      type: String,
      default: null,
    },
    mediaMaxWidth: {
      type: String,
      default: () => null,
    },
    subtitle: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: "/",
    },
    hrefIcon: {
      type: String,
      default: () => "mdi-arrow-right",
    },
    hrefTarget: {
      type: String,
      default: () => "_blank",
    },
    hrefCaption: {
      type: String,
      default: () => "Ver perfil",
    },
    to: {
      type: String,
      default: () => "",
    },
    toIcon: {
      type: String,
      default: () => "mdi-arrow-right",
    },
    toCaption: {
      type: String,
      default: () => "Abrir",
    },
    closeCaption: {
      type: String,
      default: () => "",
    },
    rating: {
      type: Number,
      default: () => -1,
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
    },
    dialog(isOpen) {
      if (!isOpen) {
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
    },
  },
};
</script>
