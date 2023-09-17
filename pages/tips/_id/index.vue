<template>
  <page
    name="tips_id"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="box">
      <div
        class="mb-6 text-center bg-dark-gradient pa-6 pb-12 radius-6 v-card elevation-3 white--text"
      >
        <div class="xs-box">
          <h1 class="mt-6 white--text" v-html="currentTip.title" />
          <div v-if="currentTip.description" class="mt-9">
            <b
              class="App-xxs-box white--text text-h6"
              v-html="currentTip.description"
            ></b>
          </div>
        </div>
      </div>

      <div class="text-lg-h6 text-md-h7 my-12">
        <div class="mb-6 text-center">
          <v-btn
            to="/tips?random=1"
            rounded
            large
            class="bg-gold white--text"
          >
            <v-icon class="mr-2 mt-2">mdi-comment-arrow-right</v-icon>
            <span>Consejo al azar</span>
          </v-btn>
        </div>

        <div class="mt-9 mb-6">
          <p class="mb-3 text-h5">
            En <b>Oro Bótico</b> los consejos son <b>al azar</b>
          </p>
          <p class="mb-6">
            <!-- Mobile -->
            <span class="text-h7 hidden-on-desktop">
              Para quedarte con un tip, solo debes <b>compartirlo</b>
            </span>

            <!-- Desktop -->
            <small class="hidden-on-mobile"
              >Para quedarte con un tip, solo debes <b>compartirlo</b>
            </small>
          </p>
        </div>
      </div>

      <div class="text-center mb-3">
        <!-- Mobile -->
        <div class="hidden-on-desktop">
          <v-btn
            @click="toggleSharing()"
            rounded
            large
            outlined
            class="text-dark"
          >
            <v-icon class="mr-2">mdi-share-variant</v-icon>
            <span class="hidden-on-mobile">Compartir</span>
            <span><b class="ml-1">Tip</b></span>
          </v-btn>

          <v-btn
            v-if="false"
            @click="donate()"
            rounded
            class="bg-dark-gradient"
            large
          >
            <v-icon class="mr-2">mdi-heart</v-icon>
            <span>Donar</span>
          </v-btn>
        </div>

        <!-- Desktop -->
        <div class="hidden-on-mobile">
          <v-btn
            @click="toggleSharing()"
            rounded
            class="pl-3 text-dark"
            large
            outlined
          >
            <v-icon class="mr-2">mdi-share-variant</v-icon>
            <span>Compartir <b class="ml-1">tip</b></span>
          </v-btn>

          <v-btn
            v-if="false"
            @click="donate()"
            rounded
            class="bg-dark-gradient mr-2 pl-3"
            large
          >
            <v-icon class="mr-2 mt-2">mdi-heart</v-icon>
            <span>Donar</span>
          </v-btn>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  asyncData(context) {
    if (!context) {
      console.info("nothing on Tip._id.asyncData[context]", context);
      return;
    }

    const tipId = context.params.id;

    return context.store.dispatch("getTip", tipId).then((tip) => {
      return {
        currentTip: tip,
      };
    });
  },
  data() {
    const tipId = this.$route.params.id;
    return {
      breadcrumbItems: [
        {
          text: "Inicio",
          disabled: false,
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          icon: "mdi-book-multiple",
          text: "Todos los consejos",
          disabled: false,
          to: "/tips",
        },
        {
          icon: "mdi-book-plus-multiple",
          text: "Consejo",
          disabled: true,
          to: `/tips/${tipId}`,
        },
      ],
    };
  },
  computed: {
    tips() {
      return this.$store.getters.tips;
    },
    pageTitle() {
      return "Consejo de Trading";
    },
    pageDescription() {
      return "Consejo para mejorar tu calidad y rendimiento como Trader Profesional";
    },
  },
  methods: {
    toggleSharing() {
      this.$bus.$emit(
        "toggle-sharing",
        "https://oro.ciudadbotica.com/tips/" + this.$route.params.id
      );
    },
    donate() {
      this.$bus.$emit("start-donation");
    },
    getRandomTip() {
      const tipIndex = this.randomInt(0, this.tips.length - 1);

      return this.tips[tipIndex];
    },
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
