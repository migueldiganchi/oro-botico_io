<template>
  <page
    name="tips"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <div class="box">
      <!-- Tips Generator -->
      <div
        class="mb-6 text-center bg-dark-gradient pa-6 pb-12 radius-6 v-card elevation-3"
      >
        <div v-if="isRandoming || isRandom" class="mb-3 mt-6">
          <v-icon
            class="text-gold text-h2 text-flat heart-beating-icon"
            :class="{
              'animate__animated animate__heartBeat': isBeating,
            }"
            >mdi-book-plus-multiple</v-icon
          >
        </div>
        <div v-else class="mb-3 mt-6">
          <v-icon class="white--text text-h2 text-flat heart-beating-icon"
            >mdi-book-plus</v-icon
          >
        </div>
        <span class="my-6 text-h6 x-small-box mx-auto d-block">
          <b class="white--text text-thin">{{
            isRandoming || isRandom
              ? "Cargando consejo al azar. Aguarda un momento por favor.."
              : "Leer un consejo al azar"
          }}</b>
        </span>

        <p v-if="!isRandoming && !isRandom" class="mb-9 white--text xs-box">
          ¡<b class="text-gold">ATENCIÓN</b>! Dale click al botón y se cargará
          una página con uno de los consejos al azar que te regala
          <b class="text-gold">Oro Bótico</b>
        </p>

        <v-btn
          :loading="isRandoming"
          :icon="isRandoming"
          :disabled="isRandoming"
          @click="newTip()"
          rounded
          class="white--text bg-gold"
        >
          <v-icon class="mr-2 mt-2">mdi-comment-arrow-right</v-icon>
          <span>Consejo al azar</span>
        </v-btn>
      </div>

      <div v-if="true" class="tip-list-holder mt-9">
        <h3 class="my-9">Todos nuestros consejos de trading</h3>
        <tip-list :tips="tips" :loading="isRandoming" />
      </div>
    </div>
  </page>
</template>

<script>
export default {
  asyncData({ route }) {
    const random = route.query.random;
    return {
      isRandom: random !== undefined,
    };
  },
  created() {
    setTimeout(() => {
      if (this.$route.query.random) {
        return this.$store.dispatch("getTips").then((tips) => {
          this.doRaffle(6000);
        });
      } else {
        return this.$store.dispatch("getTips");
      }
    }, 1000);

    this.interval = setInterval(() => {
      this.isBeating = !this.isBeating;
    }, 750);
  },
  watch: {
    $route() {
      clearInterval(this.interval);
    },
  },
  data() {
    return {
      interval: null,
      currentTip: null,
      isRandoming: false,
      isBeating: true,
      breadcrumbItems: [
        {
          text: "Inicio",
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          icon: "mdi-book-multiple",
          text: "Consejos de Trading",
          disabled: true,
          to: "/tips",
        },
      ],
    };
  },
  computed: {
    tips() {
      return this.$store.getters.tips;
    },
    pageTitle() {
      return "Consejos de Trading";
    },
    pageDescription() {
      return this.isRandoming || this.isRandom
        ? "Cargando nuevo consejo..."
        : "Encuentra aquí los mejores consejos para mejorar tu rendimiento";
    },
  },
  methods: {
    doRaffle(timeout) {
      this.isRandoming = true;
      setTimeout(
        () => {
          this.isRandoming = false;
          this.currentTip = this.getRandomTip();
          this.$router.push(`/tips/${this.currentTip.id}`);
        },
        timeout ? timeout : 3333
      );
    },
    toggleSharing() {
      this.$bus.$emit("toggle-sharing");
    },
    newTip() {
      console.log("newTip button");
      this.doRaffle();
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
