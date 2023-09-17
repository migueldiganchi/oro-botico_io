<template>
  <div class="step-1-content pa-9">
    <h1 class="mt-3 mb-6">
      <v-icon class="display-3 text-gold">{{ icon }}</v-icon>
    </h1>
    <div class="mb-9">
      <h1 class="mb-6" v-html="title" />
      <span style="font-size: 18.1px" v-html="description" />
    </div>

    <v-expansion-panels v-if="false">
      <v-expansion-panel v-for="step in steps" :key="step.key">
        <v-expansion-panel-header>
          <span v-html="step.title" class="text-left" />
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-html="step.content" class="text-left" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "mdi-connection",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      steps: [
        {
          key: 1,
          title:
            "¿Cómo puedo conectar mi asistente virtual a mi plataforma educativa?",
          content: `Registra tu cuenta y nosotros te guiaremos en el proceso`,
        },
        {
          key: 2,
          title: "¿Tengo que pagar algo?",
          content: `En lo absoluto, el servicio es 
            <b>completamente gratuito</b>. Puedes optar por invertir
            tu propio capital, siguiendo señales y ganando en <b>Trading</b>, o bien
            en infraestructura tecnológica que te permita <b>potenciar tus resultados</b>.
            `,
        },
        {
          key: 3,
          title: "¿Tengo posibilidad de crecimiento?",
          content: `Definitivamente. En <b>Oro Bótico</b> nos centramos no solo en mejorar tu economía, 
            sino que también necestiamos que mejores tu vida en general. Tenemos sesiones de Mindset, consejos y 
            administración de emociones`,
        },
      ],
    };
  },
  methods: {
    setIntegrationMode(mode) {
      console.log("[changing mode]", mode);
      this.isManualPanelActive = false;
      this.isApiPanelActive = false;
      switch (mode) {
        case "manually":
          this.isManualPanelActive = true;
          break;
        case "api":
          this.isApiPanelActive = true;
          break;
        default:
          console.info("[No mode matched]", mode);
          break;
      }
    },
  },
};
</script>
