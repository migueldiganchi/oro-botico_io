<template>
  <page
    name="assistants"
    title="Mis Asistentes"
    description="Administra a los Agentes Inteligentes para que hagan ventas en automático"
  >
    <!-- Assistant Creator -->
    <v-btn rounded>
      <v-icon>mdi-plus</v-icon>
      Nuevo Asistente
    </v-btn>

    <!-- Assistant List -->
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
};
</script>
