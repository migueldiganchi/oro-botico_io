<template>
  <div class="App-assistant-list">
    <v-row justify="center" align="center">
      <v-col
        class="pa-6"
        v-for="(assistant, assistantIndex) in assistants"
        :key="assistantIndex"
        :md="assistant.flex || 3"
        :lg="assistant.flex || 4"
      >
        <assistant-card
          :assistant="assistant"
          :is-manager="isManager"
          :is-assistant-status-opened="isActiveAssistant(assistant)"
          @onOpenAssistantStatusForm="openAssistantStatusForm(assistant)"
          @onOpenInfo="openInfo"
        />
      </v-col>
    </v-row>

    <!-- LOAD MORE -->
    <div v-if="showMoreButton" class="mt-12 pt-6">
      <v-btn rounded outlined class="px-3 text-dark" large @click="loadMore()">
        <span style="margin-top: 1.8px">
          <v-icon>mdi-arrow-down</v-icon>
          <span>{{ loading ? "Cargando..." : "Cargar más" }}</span>
        </span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    assistants: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: () => false,
    },

    isManager: {
      type: Boolean,
      default: () => false,
    },

    activeAssistantId: {
      type: String,
      default: () => "",
    },

    showMoreButton: {
      type: Boolean,
      default: () => false,
    },
  },

  methods: {
    openInfo(assistant) {
      this.$emit("onAssistantClick", assistant);
    },

    openAssistantStatusForm(assistant) {
      this.$emit("onOpenAssistantStatusForm", assistant);
    },

    isActiveAssistant(assistantId) {
      return this.activeAssistantId == assistantId;
    },

    getAssistantCardColor(assistant) {
      return this.isActiveAssistant(assistant?._id) ? "red" : "white";
    },

    loadMore() {
      this.$emit("onLoadMore");
    },
  },
};
</script>
