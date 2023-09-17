<template>
  <v-container class="px-0 bot-conversation">
    <!-- EMPTY CONVERSATION -->
    <div
      v-if="!conversation.length"
      class="App-container xs-box text-center mb-16"
    >
      <div class="mb-9 mt-6">
        <v-icon size="72px" color="#d1a837"> mdi-message-bulleted-off </v-icon>
      </div>

      <span class="text-muted">No se han registrado mensajes</span>
    </div>

    <!-- CONVERSATION -->
    <div v-else align="center" class="bot-conversation_timeline text-center">
      <div
        v-for="(interaction, interactionIndex) in conversation"
        :key="interactionIndex"
        class="bot-conversation_timeline_box"
      >
        <!-- BOT -->
        <div
          v-if="interaction.from && interaction.from == 'bot'"
          class="bot-conversation_timeline_box-item bot-conversation_timeline_box-bot d-flex justify-end"
        >
          <div
            class="bot-conversation_timeline_box-item-text bot-conversation_timeline_box-bot-text"
          >
            <span v-html="interaction.message" />
          </div>
          <div
            class="bot-conversation_timeline_box-item-avatar bot-conversation_timeline_box-bot-avatar"
          >
            <!-- <v-avatar> -->
            <img :src="botPictureUrl" style="max-width: 63px" alt="Qref-Bot" />
            <!-- </v-avatar> -->
          </div>
        </div>

        <!-- USER -->
        <div
          v-else-if="interaction.from && interaction.from == 'user'"
          class="bot-conversation_timeline_box-item bot-conversation_timeline_box-user"
        >
          <div
            class="bot-conversation_timeline_box-item-avatar bot-conversation_timeline_box-user-avatar"
          >
            <v-avatar>
              <img :src="userPictureUrl" alt="User Name" />
            </v-avatar>
          </div>
          <div
            class="bot-conversation_timeline_box-item-text bot-conversation_timeline_box-user-text"
          >
            <span v-text="interaction.message" />
          </div>
        </div>
      </div>
    </div>

    <!-- WRITING EFFECT -->
    <div
      v-if="isWriting"
      align="center"
      class="bot-conversation_timeline text-center animate__animated animate__flash mt-7"
    >
      <div
        class="bot-conversation_timeline_box-item bot-conversation_timeline_box-bot d-flex justify-end"
      >
        <div
          class="bot-conversation_timeline_box-item-text bot-conversation_timeline_box-bot-text"
        >
          <i v-text="'...'" class="primary--text" />
        </div>
        <div
          class="bot-conversation_timeline_box-item-avatar bot-conversation_timeline_box-bot-avatar"
        >
          <!-- <v-avatar> -->
          <img :src="botPictureUrl" alt="Qref-Bot" style="max-width: 63px" />
          <!-- </v-avatar> -->
        </div>
      </div>
    </div>

    <!-- INTERACTION FORM -->
    <v-row
      align="center"
      justify="center"
      class="mt-16 bot-conversation_interaction-form"
    >
      <v-col cols="10" md="9">
        <h3
          v-if="isWriting"
          class="mb-3 mt-0 mr-3 text-md-right text-center text-thin"
        >
          <small class="text-gold">
            El asistente virtual está escribiendo...
          </small>
        </h3>

        <v-form @submit.prevent="sendMessage">
          <!-- @todo: SWITCH BETWEEN CONTROL TYPES -->
          <div class="v-form-field pa-0">
            <v-text-field
              v-model="form.textToSend"
              :disabled="isWriting"
              :placeholder="randomPlaceholder || placeholder"
              ref="messageTextBox"
              autocomplete="off"
              autofocus
              solo
              light
              rows="1"
              name="input-7-4"
              class="mb-0 text-dark"
              rounded
              @focus="loadRandomPlaceholder"
              @blur="clearRandomPlaceholder"
            />
          </div>

          <div class="text-right text-center mt-9">
            <!-- <v-btn
              :disabled="isWriting"
              type="button"
              rounded
              color="white"
              elevation="3"
              class="pl-2 pr-3"
              @click="close"
              large
            >
              <v-icon class="primary--text">mdi-home</v-icon>
              <v-icon class="primary--text ml-2">mdi-arrow-left</v-icon>
            </v-btn>

            <v-spacer /> -->

            <!-- MICROPHONE -->
            <v-btn
              v-if="false"
              type="button"
              icon
              color="white"
              class="white mr-3"
              elevation="3"
              large
              @click="
                $notify({
                  color: 'primary darken-1',
                  message: 'Start voice module',
                  timeout: '10000',
                })
              "
            >
              <v-icon class="primary--text">mdi-microphone</v-icon>
            </v-btn>

            <v-btn
              :disabled="isWriting"
              type="submit"
              rounded
              color="white"
              outlined
              elevation="3"
              large
              class="pr-2 white"
            >
              <span class="text-dark ml-2"> Enviar</span>
              <v-icon class="text-dark ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$bus.$on("on-sent", this.clearForm);
  },
  beforeDestroy() {
    this.$bus.$off("on-sent");
  },
  props: {
    conversation: {
      type: Array,
      default: () => [],
    },
    isWriting: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      samples: ["Escribe aquí tu consulta..."],
      form: {
        textToSend: "",
      },
      randomPlaceholder: "",
    };
  },
  computed: {
    placeholderIndex() {
      return Math.floor(Math.random() * this.samples.length);
    },
    placeholder() {
      const placeholder = this.samples[this.placeholderIndex];
      return placeholder;
    },
    userPictureUrl() {
      return require("~/assets/media/user.png");
    },
    botPictureUrl() {
      return require("~/assets/media/nano-bot.png") + "?" + new Date();
    },
  },
  methods: {
    loadRandomPlaceholder() {
      this.randomPlaceholder = this.placeholder;
    },
    clearRandomPlaceholder() {
      this.randomPlaceholder = "";
    },
    sendMessage() {
      // @todo: Validate
      this.$emit("onSend", this.form.textToSend);
      this.$nextTick(() => {
        this.form.textToSend = "";
      });
    },
    close() {
      this.$emit("onClose");
    },
    clearForm() {
      this.$nextTick(() => this.$refs.messageTextBox.focus());
    },
  },
};
</script>

<style lang="scss"></style>
