<template>
  <page
    name="assistants"
    title="Mis Asistentes"
    description="Presenta tu Sistema en Forma completamente Automática"
  >
    <!-- Assistant Creator -->
    <v-btn rounded class="pl-2 bg-gold" @click="startNewAssistant()">
      <v-icon>mdi-plus</v-icon>
      <span class="ml-2">Nuevo Asistente</span>
    </v-btn>

    <!-- Assistant List -->
    <!-- Empty -->
    <div class="pa-3 mt-9 py-9 text-gold">
      <empty-results
        icon="mdi-robot"
        title="No se han encontrado Asistentes Registrados"
      />
    </div>

    <!-- List -->
    <assistant-list :assistants="assistants" />
  </page>
</template>

<script>
export default {
  data: () => ({
    waitingMessage: "",
    assistants: [],
  }),

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },
  },

  methods: {
    startNewAssistant() {
      this.$notify({
        message:
          "Estamos Trabajando en el Administrador de Asistentes Virtuales",
      });
    },
  },
};
</script>
