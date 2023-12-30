<template>
  <v-dialog
    v-model="dialog"
    :persistent="persistent"
    scrollable
    max-width="300px"
  >
    <v-card>
      <!-- Title -->
      <v-card-title class="bg-light">
        <div class="text-center d-block py-3" style="min-width: 100%">
          <v-img
            :src="logoUrl"
            :lazy-src="logoUrl"
            alt="Oro Bótico"
            referrerpolicy="no-referrer"
            contain
            aspect-ratio="1"
            height="90px"
          ></v-img>
        </div>
        <div class="text-center mt-6">
          <span v-if="name" class="text-lg-h4 text-sm-h5" v-text="name" />
        </div>
      </v-card-title>

      <!-- Text -->
      <v-card-text
        :class="{ 'py-0': isResponding }"
        class="assistant-card-text bg-gold"
      >
        <p v-if="!isResponding" class="mb-6 mt-6 text-center text-light">
          <b style="font-size: 21px; line-height: 30px" v-text="text"></b>
        </p>

        <slot v-if="!isResponding" />

        <p
          v-if="!isResponding && details"
          class="my-6 text-center text-light"
          v-text="details"
        />

        <div v-if="isResponding">
          <div v-if="loading" class="pa-3 text-center text-orange">
            Enviando mensaje...
          </div>
          <form @submit="respond" v-else class="ma-0 pa-0">
            <v-textarea
              v-model="respondText"
              @keypress.enter="respond"
              rows="3"
              class="ma-0"
              ref="respond"
              name="respond"
              placeholder="Escribe tu mensaje y te responderemos a la brevedad"
              required
            />
          </form>
        </div>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions
        v-if="false && !isResponding"
        class="assistant-dialog-actions"
      >
        <div
          class="text-center d-block pa-1"
          style="min-width: 100% !important"
        >
          <v-btn
            @click="$emit('on-assistant-close')"
            rounded
            class="bg-gold"
            elevation="3"
            icon
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
      <v-card-actions v-else-if="false" class="assistant-dialog-actions">
        <v-btn rounded color="primary darken-1" @click="this.toggleResponding"
          >Cancelar</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          round
          color="primary darken-1"
          flat
          :loading="loading"
          @click="respond"
          >Enviar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    model: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      
      default: () => false,
    },
    name: {
      type: String,
      
      default: "",
    },
    pictureUrl: {
      type: String,
      
      default: () => {
        return require("@/assets/media/trading.png");
      },
    },
    text: {
      type: String,
      
      default: "",
    },
    details: {
      type: String,
      
      default: "",
    },
    persistent: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dialog: false,
      isResponding: false,
      respondText: "",
    };
  },

  computed: {
    logoUrl() {
      return require("~/assets/media/trading.png") + "?" + new Date();
    },
  },

  methods: {
    close() {
      this.dialog = false;
    },
    toggleResponding() {
      this.isResponding = !this.isResponding;
      setTimeout(() => {
        if (this.isResponding) {
          this.$refs.respond.focus();
        }
      }, 111);
    },
    respond() {
      this.$emit("onRespond", this.respondText);
    },
  },

  watch: {
    model(value) {
      this.dialog = value;
      if (value) {
        this.respondText = "";
        this.isResponding = false;
      }
    },

    dialog(value) {
      if (!value) {
        this.$emit("on-assistant-close");
      }
    },
  },
};
</script>

<style>
.v-card__actions.assistant-dialog-actions {
  background-color: #fff !important;
  border-top: solid 1px #fff !important;
}

.assistant-card-text {
}
</style>
