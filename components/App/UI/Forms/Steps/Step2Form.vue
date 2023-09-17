<template>
  <div class="step-2-content pa-9">
    <h1 class="mt-3 mb-6">
      <v-icon class="display-3 text-gold">
        {{ icon }}
      </v-icon>
    </h1>
    <div class="mb-9">
      <h1 class="mb-6" v-html="title" />
      <span style="font-size: 17.1px" v-html="description" />
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

      default: "mdi-school",
    },
    secondIcon: {
      type: String,

      default: "mdi-cash-check",
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
          title: "¿Qué debo aprender?",
          content:
            "Aprenderás a armar tu propia infraestructura de trabajo. En el mundo del Trading debes ser organizado para tener éxito con tu negocio.",
        },
        {
          key: 2,
          title: "¿Tiene costo lo que debo aprender?",
          content:
            "En lo absoluto. <b>Compartimos nuestras técnicas de manera completamente gratuita<b>.",
        },
        {
          key: 3,
          title: "¿Para qué me sirve lo que aprendo?",
          content:
            "Modificarás tu vida por completo. Tienes el timón de tu destino, y es momento de darle el mejor rumbo posible.",
        },
      ],
      integrationSystems: [
        { value: "manually", text: "Vía manual" },
        { value: "api", text: "Vía API" },
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
