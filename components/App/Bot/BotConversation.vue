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
    <div v-else class="bot-conversation_timeline text-center">
      <div
        v-for="(interaction, interactionIndex) in conversation"
        :key="interactionIndex"
        class="bot-conversation_timeline_box"
      >
        <!-- USER -->
        <div
          v-if="interaction.from && interaction.from == 'user'"
          class="bot-conversation_timeline_box-item bot-conversation_timeline_box-user d-flex justify-start align-center"
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

        <!-- BOT -->
        <div
          v-if="interaction.from && interaction.from == 'bot'"
          class="bot-conversation_timeline_box-item bot-conversation_timeline_box-bot d-flex justify-end align-center"
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
            <img :src="botPictureUrl" style="max-width: 63px" alt="León" />
            <!-- </v-avatar> -->
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
        class="bot-conversation_timeline_box-item bot-conversation_timeline_box-bot d-flex justify-end align-center"
      >
        <div
          class="bot-conversation_timeline_box-item-text bot-conversation_timeline_box-bot-text"
        >
          <i v-text="'...'" class="amber--text" />
        </div>
        <div
          class="bot-conversation_timeline_box-item-avatar bot-conversation_timeline_box-bot-avatar"
        >
          <img :src="botPictureUrl" alt="León" style="max-width: 63px" />
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
        <h3 v-if="isWriting" class="mb-3 mt-0 mr-3 text-md-right text-thin">
          <small class="text-gold">
            El asistente virtual está escribiendo...
          </small>
        </h3>

        <v-form
          @submit.prevent="sendMessage"
          class="d-flex align-center pa-1 radius-45 bg-golden"
          :class="{
            'sticky-footer elevation-3': isSticky,
          }"
        >
          <v-text-field
            v-model="form.textToSend"
            :disabled="isWriting || isWaiting"
            :placeholder="randomPlaceholder || placeholder"
            ref="messageTextBox"
            autocomplete="off"
            autofocus
            solo
            light
            hide-details
            class="flex-grow-1 text-dark elevation-0"
            rounded
            @focus="loadRandomPlaceholder"
            @blur="clearRandomPlaceholder"
          />

          <v-btn
            :disabled="isWriting || isWaiting"
            type="submit"
            icon
            :color="isWriting || isWaiting ? 'grey' : 'white'"
            class="ml-2"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
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
    isSticky: {
      type: Boolean,
      default: () => false,
    },
    conversation: {
      type: Array,
      default: () => [],
    },
    isWriting: {
      type: Boolean,
      default: () => false,
    },
    isWaiting: {
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
      this.$nextTick(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        this.$refs.messageTextBox.focus();
      });
    },
  },
};
</script>

<style lang="scss">
.sticky-footer {
  animation: all 0.9s ease !important;
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 450px;
  padding: 10px 0;

  @media screen and (max-width: 450px) {
    min-width: initial;
  }
}
</style>
