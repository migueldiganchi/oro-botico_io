<template>
  <page
    name="bot"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
    :media-url="botPictureUrl"
  >
    <div class="App-sm-box mx-auto">
      <!-- BOT CONVERSATION -->
      <bot-conversation
        :conversation="conversation"
        :is-writing="isBotWriting || isWaiting"
        :is-sticky="isSticky"
        @onSend="sendInteraction"
        @onClose="goHome"
      />
    </div>

    <!-- FLOATING BUTTON -->
    <v-menu
      v-if="false && isUserEnabledToRate"
      v-model="isRankingBotOpened"
      :close-on-content-click="false"
      class="bg-dark-gradient"
      content-class="rating-box"
      max-width="270px"
      bottom
      right
      offset-x
      style="z-index: 9999"
    >
      <!-- Menu Content -->
      <v-card max-width="300px" class="bg-dark-gradient">
        <v-list class="bg-dark-gradient">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Oro Bot
                <small style="font-size: 10px"
                  >from <b>Oro Bótico</b></small
                ></v-list-item-title
              >
              <v-list-item-subtitle
                ><small
                  ><span class="white--text"
                    >Por favor ayúdame a mejorar</span
                  ></small
                ></v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn class="orange" icon>
                <v-icon style="color: #fff !important"
                  >mdi-share-variant</v-icon
                >
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <div class="py-3 text-center">
          <small
            ><vue-typed-js
              :strings="['¿Cómo califiarías mis respuestas?']"
              :loop="false"
              :backDelay="1000"
              :typeSpeed="45"
              :smartBackspace="true"
              :fadeOut="true"
              :cursorChar="''"
              style="height: 33px; padding-left: 9px"
            >
              <b
                class="text-h7 orange--text text--darken-1 typing"
              /> </vue-typed-js
          ></small>

          <v-rating
            v-model="botRating"
            class="my-2 d-inline-block mx-auto"
            empty-icon="mdi-star-outline"
            full-icon="mdi-star"
            half-icon="mdi-star-half"
            color="orange"
            background-color="orange lighten-1"
            length="5"
            size="27"
            value="3"
          ></v-rating>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text icon @click="closeRating">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn
            :disabled="botRating < 1"
            class="pl-3"
            rounded
            color="orange"
            outlined
            @click="rate()"
          >
            <span class="ml-1 mr-2">Enviar</span>
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <!-- Menu Activator -->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :rounded="!isWaiting"
          :loading="isWaiting"
          :icon="isWaiting"
          :text="isWaiting"
          :elevation="!isWaiting ? '3' : '1'"
          fixed
          right
          bottom
          class="orange white--text pl-3 pr-4"
          v-bind="attrs"
          v-on="on"
          style="z-index: 9999"
        >
          <v-icon class="mr-3">mdi-star</v-icon>
          <span class="mb-0">¿Como respondí?</span>
        </v-btn>
      </template>
    </v-menu>
  </page>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  data() {
    return {
      isRankingBotOpened: false,
      isUserEnabledToRate: false,
      isSticky: false,
      botRating: 0,
      breadcrumbItems: [
        {
          text: "Inicio",
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          text: "¿Qué es Oro Bótico?",
          disabled: true,
          icon: "mdi-robot",
          to: "/bot",
        },
      ],
      userName: "",
      conversation: [],
      waitingMessage: "",
      isBotWriting: false,
      isConversationHere: false,
    };
  },

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },
    botPictureUrl() {
      return require("@/assets/media/nano-bot.png") + "?" + new Date();
    },
    pageTitle() {
      return "Oro Bot";
    },
    pageDescription() {
      return "¡Hola! Mi nombre es <b>Oro Bot</b>, soy el asistente virtual de <b>Oro Bótico</b>, y estoy aquí para ayudarte en lo que pueda con tu <b>Trading</b>";
    },
  },

  methods: {
    startBot() {
      this.isConversationHere = true;
    },

    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      console.log("[scrollPosition]", scrollPosition);
      console.log("[pageHeight]", pageHeight);

      // Si el usuario está a más de 150px del fondo, activamos el sticky
      this.isSticky = pageHeight - scrollPosition > 150;

      console.log("[this.isSticky]", this.isSticky);
    },

    rate() {
      this.waitingMessage = "Guardando...";
      setTimeout(() => {
        this.waitingMessage = "";
        this.closeRating();
        this.isUserEnabledToRate = false;
        this.$notify({
          message: "Rating guardado correctamente",
          color: "info",
          timeout: 1999,
        });
      }, 3303);
    },

    closeRating() {
      this.isRankingBotOpened = false;
      this.botRating = 0;
    },

    addInteraction(interactionToAdd) {
      this.conversation.push(interactionToAdd);
    },

    sendInteraction(interactionMessage) {
      this.waitingMessage = "Enviando mensaje...";
      return this.$store
        .dispatch("talk", {
          interaction: {
            message: interactionMessage,
            answerType: "text",
          },
        })
        .then(({ message, intent }) => {
          // USER IS ADDING THE INTERACTION
          this.addInteraction({
            from: "user",
            message: interactionMessage,
          });

          setTimeout(() => {
            this.isBotWriting = true;
            setTimeout(() => {
              // BOT IS ADDING THE INTERACTION
              this.isBotWriting = false;
              this.isUserEnabledToRate = true;

              this.addInteraction({
                from: "bot",
                message: message ? message : intent,
              });

              this.$bus.$emit("on-sent");

              // SEND INFORMATION TO BOT CONVERSATION
            }, 1239);
          }, 1239);
        })
        .catch((error) => {
          console.error("[error]", error);
          this.$notify({
            message: "Necesitas estar registrado para utilizar el servicio",
            color: "info",
            timeout: 9999,
          });

          this.conversation = [];

          this.isBotWriting = true;
          setTimeout(() => {
            this.addInteraction({
              from: "bot",
              message:
                "¡Hola! Debes pedir una cuenta para poder conversar con nuestro chatbot. Es solamente para proteger el poder de cómputo que requiere su entrenamiento.",
            });
            this.isBotWriting = false;
            setTimeout(() => {
              this.isBotWriting = true;
              setTimeout(() => {
                this.addInteraction({
                  from: "bot",
                  message:
                    'Por favor escríbenos a hello@ciudadbotica.com o escríbe a migueldiganchi@gmail.com solicitando una pidiendo una "Cuenta Chatbot", con la que podrás consultar nuestro servicio',
                });
                setTimeout(() => {
                  this.isBotWriting = true;
                  setTimeout(() => {
                    this.isBotWriting = false;
                    this.addInteraction({
                      from: "bot",
                      message:
                        "Desde ya muchas gracias por tu interés en probar el serivicio",
                    });

                    this.$bus.$emit("on-sent");
                  }, 1999); // Writing time
                }, 999); // Pause
              }, 3339); // Writing time
            }, 999); // Pause
          }, 3699); // Writing
        })
        .finally(() => {
          this.waitingMessage = false;
        });
    },

    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
