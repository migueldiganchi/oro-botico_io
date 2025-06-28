<template>
  <page
    name="member"
    :title="member.name"
    :description="member.description"
    :breadcrumbs="breadcrumbItems"
    :mediaUrl="pictureUrl"
    :is-media-circular="true"
  >
    <div class="mx-auto xs-box mb-15">
      <!-- Assistant Chat Button -->
      <v-btn
        @click="showAssistantDialog = true"
        class="mb-6 pl-2 bg-gold"
        rounded
        elevation="2"
        style="color: white"
      >
        <v-icon class="mr-2">mdi-robot-excited</v-icon>
        <span>Chatear</span>
      </v-btn>

      <!-- Trader Header Info -->
      <div class="text-center mb-8">
        <!-- Trading Style Badge -->
        <h4 class="mb-9">
          {{ member.tradingStyle }}
        </h4>

        <!-- Performance Metrics -->
        <div
          v-if="member.performance"
          class="d-flex justify-center flex-wrap mb-4"
        >
          <v-chip
            v-if="member.performance.winRate"
            class="mx-2 mb-3"
            color="orange"
            outlined
          >
            <v-icon left size="16">mdi-target</v-icon>
            {{ member.performance.winRate }}% Win Rate
          </v-chip>
          <v-chip
            v-if="member.performance.totalReturn"
            class="mx-2 mb-3"
            color="orange"
            outlined
          >
            <v-icon left size="16">mdi-trending-up</v-icon>
            +{{ member.performance.totalReturn }}% Retorno
          </v-chip>
          <v-chip
            v-if="member.performance.experience"
            class="mx-2 mb-3"
            color="orange"
            outlined
          >
            <v-icon left size="16">mdi-calendar</v-icon>
            {{ member.performance.experience }} años
          </v-chip>
        </div>

        <p>
          Inicia una conversación con el representante de
          {{ member.name || "este trader" }}
        </p>
      </div>

      <!-- Bio -->
      <div v-if="member.bio" class="mb-6">
        <h3 class="text-h6 mb-3">
          <v-icon class="mr-2">mdi-account</v-icon>
          Sobre el Trader
        </h3>
        <p class="text-body-1">{{ member.bio }}</p>
      </div>

      <!-- Risk Management - VERSIÓN COMPACTA -->
      <div v-if="member.riskManagement" class="mb-6">
        <v-icon class="d-block mb-3 black--text">mdi-shield-check</v-icon>
        <h4 class="mb-3">Gestión de Riesgo</h4>
        <div
          class="d-flex justify-space-around text-center py-4 px-2"
          style="
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
          "
        >
          <div class="flex-fill">
            <v-icon color="red darken-1" size="24" class="mb-1"
              >mdi-percent</v-icon
            >
            <div class="text-caption grey--text text--darken-2">
              Risk por Op.
            </div>
            <div class="text-h5 font-weight-bold red--text text--darken-1">
              {{ member.riskManagement.riskPerTrade }}%
            </div>
          </div>
          <v-divider vertical class="mx-3"></v-divider>
          <div class="flex-fill">
            <v-icon color="orange darken-1" size="24" class="mb-1"
              >mdi-target</v-icon
            >
            <div class="text-caption grey--text text--darken-2">R:R Ratio</div>
            <div class="text-h5 font-weight-bold orange--text text--darken-1">
              {{ member.riskManagement.riskRewardRatio }}
            </div>
          </div>
          <v-divider vertical class="mx-3"></v-divider>
          <div class="flex-fill">
            <v-icon color="blue darken-1" size="24" class="mb-1"
              >mdi-trending-down</v-icon
            >
            <div class="text-caption grey--text text--darken-2">Max DD</div>
            <div class="text-h5 font-weight-bold blue--text text--darken-1">
              {{ member.riskManagement.maxDrawdown }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Signature Phrases -->
      <div v-if="member.phrases && member.phrases.length" class="mb-6">
        <v-icon class="d-block black--text mb-3">mdi-brain</v-icon>
        <h4 class="mb-3">Su Filosofía</h4>
        <v-card outlined class="pa-4 bg-dark border border-gold" color="white">
          <blockquote class="text-body-1 font-italic text-center text-gold">
            <b>"{{ member.phrases[0] }}"</b>
          </blockquote>
        </v-card>
      </div>

      <!-- Trading Statistics - VERSIÓN COMPACTA -->
      <div v-if="member.stats" class="mb-6">
        <v-icon class="d-block black--text mb-3">mdi-chart-box</v-icon>
        <h4 class="mb-3">Estadísticas</h4>
        <v-row no-gutters>
          <v-col cols="6" class="pa-1">
            <div
              class="text-center py-3 px-2"
              style="
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e9ecef;
              "
            >
              <v-icon color="green darken-1" size="20" class="mb-1"
                >mdi-trending-up</v-icon
              >
              <div class="text-caption grey--text text--darken-2">Exitosas</div>
              <div class="text-h6 font-weight-bold green--text text--darken-1">
                {{ member.stats.winningTrades }}
              </div>
            </div>
          </v-col>
          <v-col cols="6" class="pa-1">
            <div
              class="text-center py-3 px-2"
              style="
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e9ecef;
              "
            >
              <v-icon color="red darken-1" size="20" class="mb-1"
                >mdi-trending-down</v-icon
              >
              <div class="text-caption grey--text text--darken-2">
                Perdedoras
              </div>
              <div class="text-h6 font-weight-bold red--text text--darken-1">
                {{ member.stats.losingTrades }}
              </div>
            </div>
          </v-col>
          <v-col cols="6" class="pa-1">
            <div
              class="text-center py-3 px-2"
              style="
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e9ecef;
              "
            >
              <v-icon color="blue darken-1" size="20" class="mb-1"
                >mdi-calendar-month</v-icon
              >
              <div class="text-caption grey--text text--darken-2">Ops/Mes</div>
              <div class="text-h6 font-weight-bold blue--text text--darken-1">
                {{ member.stats.tradesPerMonth }}
              </div>
            </div>
          </v-col>
          <v-col cols="6" class="pa-1">
            <div
              class="text-center py-3 px-2"
              style="
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e9ecef;
              "
            >
              <v-icon color="purple darken-1" size="20" class="mb-1"
                >mdi-star</v-icon
              >
              <div class="text-caption grey--text text--darken-2">
                Seguidores
              </div>
              <div class="text-h6 font-weight-bold purple--text text--darken-1">
                {{ member.stats.followers || 0 }}
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Bot Integration Status -->
      <div v-if="member.botIntegration" class="mb-6">
        <v-icon class="d-block black--text mb-3">mdi-robot</v-icon>
        <h4 class="mb-3">Bot de Trading</h4>
        <v-card outlined class="pa-4">
          <v-icon
            :color="member.botIntegration.isActive ? 'success' : 'warning'"
            class="d-block mb-2"
            size="20"
          >
            {{
              member.botIntegration.isActive
                ? "mdi-check-circle"
                : "mdi-pause-circle"
            }}
          </v-icon>
          <div class="d-flex align-center mb-2">
            <span class="text-subtitle-1 mx-auto">
              Estado:
              {{ member.botIntegration.isActive ? "Activo" : "Pausado" }}
            </span>
          </div>
          <p class="text-body-2 mb-1">
            <strong>Modo:</strong> {{ member.botIntegration.mode }}
          </p>
          <p class="text-body-2 mb-0">
            <strong>Última Actualización:</strong>
            {{ member.botIntegration.lastUpdate }}
          </p>
        </v-card>
      </div>

      <!-- Address Information -->
      <div v-if="member.locationAddress" class="mb-6">
        <v-icon class="d-block black--text mb-3">mdi-map-marker</v-icon>
        <h4 class="mb-3">Ubicación</h4>
        <p class="text-body-1">{{ member.locationAddress }}</p>
      </div>

      <!-- Social Actions -->
      <div class="text-center mt-8">
        <h3 class="text-h6 mb-4">Conecta con {{ member.name }}</h3>
        <div class="d-flex justify-center flex-wrap">
          <v-btn
            icon
            fab
            small
            elevation="2"
            style="background-color: #25d366"
            href="https://api.whatsapp.com/send?phone=+5491135077622&text=Me%20interesa%20comenzar%20un%20proyecto%20con%20Oro%20B%C3%B3tico."
            target="_blank"
            class="mx-2 mb-2"
          >
            <v-icon color="white" size="20">mdi-whatsapp</v-icon>
          </v-btn>

          <v-btn
            icon
            fab
            small
            elevation="2"
            style="background-color: #c13584"
            href="https://instagram.com/neutron.bot"
            target="_blank"
            class="mx-2 mb-2"
          >
            <v-icon color="white" size="20">mdi-instagram</v-icon>
          </v-btn>

          <v-btn
            icon
            fab
            small
            elevation="2"
            style="background-color: #1877f2"
            href="https://facebook.com/oro.botico.io"
            target="_blank"
            class="mx-2 mb-2"
          >
            <v-icon color="white" size="20">mdi-facebook</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <!-- LANDING BUTTON -->
    <div v-if="member?.nickname" class="App-actions">
      <v-btn
        :href="'/m/' + member.nickname"
        target="_blank"
        class="bg-gold ma-1 pl-3"
        rounded
      >
        <v-icon style="margin-top: 1.8px" class="mr-2">mdi-star</v-icon>
        <span style="margin-top: 1px"> Visitar Landing </span>
      </v-btn>
    </div>

    <!-- DIALOG FOR ASSISTANT MESSAGE -->
    <v-dialog v-model="showAssistantDialog" max-width="500px">
      <v-card class="bg-dark">
        <v-card-title class="bg-gold pa-4 white--text">
          <v-icon class="mr-2" color="white">mdi-robot-excited</v-icon>
          Asistente en Desarrollo
        </v-card-title>
        <v-card-text class="pa-6">
          <div class="text-center">
            <v-icon color="amber" size="64" class="mb-4">mdi-wrench</v-icon>
            <p class="text-h6 mb-3">¡Próximamente!</p>
            <p class="text-body-1">
              Estamos trabajando en el asistente personalizado para cada trader.
              Pronto podrás chatear directamente con
              {{ member.name || "este trader" }}
              y aprender sus estrategias.
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn class="bg-gold" rounded @click="showAssistantDialog = false">
            <v-icon class="mr-2">mdi-check</v-icon>
            Entendido
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </page>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const memberId = params.id;
    const member = await store.dispatch("getUser", memberId);

    const exampleMember = {
      ...member,
      tradingStyle: member.tradingStyle || "Swing Trader Profesional",
      performance: member.performance || {
        winRate: 73,
        totalReturn: 245,
        experience: 8,
      },
      strategy: member.strategy || {
        markets: ["Forex", "Criptomonedas", "Índices"],
        timeframes: ["H4", "D1", "W1"],
        indicators: ["RSI", "MACD", "Bollinger Bands", "Support/Resistance"],
        description:
          "Mi enfoque se basa en análisis técnico combinado con gestión estricta del riesgo. Busco configuraciones de alta probabilidad en mercados con alta liquidez, priorizando la paciencia sobre la frecuencia de operaciones.",
      },
      riskManagement: member.riskManagement || {
        riskPerTrade: 2,
        riskRewardRatio: "1:3",
        maxDrawdown: 12,
      },
      phrases: member.phrases || [
        "El mercado siempre tiene razón, pero no siempre es racional",
        "La paciencia es la virtud más subestimada en el trading",
        "Prefiero perder una oportunidad que perder capital",
      ],
      stats: member.stats || {
        winningTrades: 186,
        losingTrades: 68,
        tradesPerMonth: 12,
        followers: 1247,
      },
      botIntegration: member.botIntegration || {
        isActive: true,
        mode: "Demo Account",
        lastUpdate: "Hace 2 horas",
      },
    };

    return {
      member: exampleMember,
    };
  },

  data: () => ({
    waitingMessage: "",
    showAssistantDialog: false,
    breadcrumbItems: [
      {
        text: "Inicio",
        icon: "mdi-home-heart",
        to: "/",
      },
      {
        text: "Mi Panel",
        icon: "mdi-account",
        to: "/members/mike-io",
        disabled: true,
      },
    ],
  }),

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },

    pictureUrl() {
      return this.member?.pictureUrl;
    },
  },

  methods: {},
};
</script>
