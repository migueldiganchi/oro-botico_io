<template>
  <v-container class="px-0 bot-conversation">
    <!-- Empty Conversation -->
    <div
      v-if="!conversation.length"
      class="App-container xs-box text-center mb-16"
    >
      <div class="mb-9 mt-6">
        <v-icon size="72px" color="#d1a837"> mdi-message </v-icon>
      </div>
    </div>

    <!-- Conversation -->
    <div v-else class="bot-conversation_timeline text-center">
      <div
        v-for="(interaction, interactionIndex) in conversation"
        :key="interactionIndex"
        class="bot-conversation_timeline_box"
      >
        <!-- Bot Side (Left) -->
        <div
          v-if="interaction.from && interaction.from == 'bot'"
          class="bot-conversation_timeline_box-item bot-conversation_timeline_box-bot d-flex justify-start align-bottom"
        >
          <!-- Bot Avatar -->
          <div
            class="bot-conversation_timeline_box-item-avatar bot-conversation_timeline_box-bot-avatar mt-auto"
          >
            <img :src="botPictureUrl" style="max-width: 63px" alt="León" />
          </div>

          <!-- Bot Message -->
          <div
            class="bot-conversation_timeline_box-item-text bot-conversation_timeline_box-bot-text"
          >
            <span v-html="formatMessage(interaction.message)" />
          </div>
        </div>

        <!-- User Side (Right) -->
        <div
          v-if="interaction.from && interaction.from == 'user'"
          class="bot-conversation_timeline_box-item bot-conversation_timeline_box-user d-flex justify-end align-bottom"
        >
          <!-- User Message -->
          <div
            class="bot-conversation_timeline_box-item-text bot-conversation_timeline_box-user-text"
          >
            <span v-text="interaction.message" />
          </div>

          <!-- User Avatar -->
          <div
            class="bot-conversation_timeline_box-item-avatar bot-conversation_timeline_box-user-avatar mt-auto"
          >
            <v-avatar>
              <img :src="userPictureUrl" alt="User Name" />
            </v-avatar>
          </div>
        </div>
      </div>
    </div>

    <!-- Writing Effect -->
    <div
      v-if="isWriting"
      align="center"
      class="bot-conversation_timeline text-center animate__animated animate__flash mt-7"
    >
      <div
        class="bot-conversation_timeline_box-item bot-conversation_timeline_box-bot d-flex justify-start align-center"
      >
        <!-- Writing Bot Avatar -->
        <div
          class="bot-conversation_timeline_box-item-avatar bot-conversation_timeline_box-bot-avatar"
        >
          <img :src="botPictureUrl" alt="León" style="max-width: 63px" />
        </div>

        <!-- Writing Bot Message -->
        <div
          class="bot-conversation_timeline_box-item-text bot-conversation_timeline_box-bot-text"
        >
          <i v-text="'✍️...'" class="amber--text" />
        </div>
      </div>
    </div>

    <!-- Interaction Form -->
    <v-row
      align="center"
      justify="center"
      class="mt-16 bot-conversation_interaction-form"
    >
      <v-col cols="10" md="9">
        <h3 v-if="isWriting" class="mb-3 mt-0 ml-3 text-left text-thin">
          <small class="text-gold">
            El asistente virtual está escribiendo...
          </small>
        </h3>

        <v-form
          @submit.prevent="sendMessage"
          class="d-flex align-center pa-1 radius-45 bg-gold border-white elevation-3"
          sty
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
      placeholders: [
        "Escribe aquí tu consulta...",
        "¿En qué puedo ayudarte hoy?",
        "Escribe tu pregunta aquí...",
        "Dime qué necesitas saber...",
        "Estoy listo para responderte...",
        "Formula tu consulta aquí...",
        "Pregúntame lo que quieras...",
        "Haz tu consulta ahora...",
      ],
      form: {
        textToSend: "",
      },
      randomPlaceholder: "",
    };
  },
  computed: {
    placeholderIndex() {
      return Math.floor(Math.random() * this.placeholders.length);
    },
    placeholder() {
      const placeholder = this.placeholders[this.placeholderIndex];

      return this.isWriting
        ? "✍️..."
        : this.isWaiting && this.form.textToSend !== ""
        ? this.form.textToSend
        : this.isWaiting
        ? "⏳..."
        : placeholder;
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

    formatMessage(text) {
      if (!text) return "";

      text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      const lines = text.split("\n");
      let formattedText = "";
      let inList = false;

      lines.forEach((line) => {
        if (line.trim().startsWith("* ")) {
          if (!inList) {
            formattedText += "<ul>";
            inList = true;
          }
          formattedText += `<li>${line.replace(/^\* /, "").trim()}</li>`;
        } else {
          if (inList) {
            formattedText += "</ul>";
            inList = false;
          }
          formattedText += `<p>${line.trim()}</p>`;
        }
      });

      if (inList) {
        formattedText += "</ul>";
      }

      return formattedText;
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
  z-index: 999;

  @media screen and (max-width: 450px) {
    min-width: initial;
  }
}
</style>
