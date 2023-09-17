<template>
  <div class="step-3-content pa-9">
    <h1 class="mt-3 mb-6">
      <v-icon class="display-3">{{ icon }}</v-icon>
      <!-- <v-icon v-if="secondIcon" class="display-3 ml-1">{{ secondIcon }}</v-icon> -->
    </h1>
    <div class="mb-9">
      <h1 class="mb-3" v-html="title" />
      <span style="font-size: 18.1px" v-html="description" />
    </div>
    <v-expansion-panels>
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
      
      default: "mdi-share-variant",
    },
    // secondIcon: {
    //   type: String,
    //   
    //   default: 'mdi-cash-check',
    // },
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
          title: "¿Qué debo compartir?",
          content:
            "Cada compañía inscripta ofrece distintos productos y servicios digitalizado y listo para publicar.",
        },
        {
          key: 2,
          title: "¿A quien debo compartir?",
          content:
            "¡A todo el mundo! Mientras mas personas puedas conectar, mayor son tus posibilidades de éxito.",
        },
        {
          key: 3,
          title: "¿Cuáles son los resultados?",
          content:
            "Tenemos todo listo para poner tu negocio a ganar dinero en piloto automático.",
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
