<template>
  <div class="App-tip-list">
    <v-row>
      <v-col v-for="tip in tips" :key="tip.id" cols="12" sm="6" lg="6">
        <tip-list-item
          :tip="tip"
          :loading="loading"
          :is-manager="isManager"
          @onStartRemoving="startRemoving"
          @onStartEditing="startEditing"
          @onExpand="expandTip"
        />
      </v-col>
    </v-row>

    <div v-if="showMoreButton" class="mt-12 pt-6">
      <v-btn rounded outlined class="px-3 text-dark" @click="loadMore()">
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
    tips: {
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

    showMoreButton: {
      type: Boolean,

      default: () => false,
    },
  },

  methods: {
    expandTip(tip) {
      this.$emit("onExpandTip", tip);
    },

    startRemoving(tipToRemove) {
      this.$emit("onStartRemoving", tipToRemove);
    },

    startEditing(tipToEdit) {
      this.$emit("onStartEditing", tipToEdit);
    },

    loadMore() {
      this.$emit("onLoadMore");
    },
  },
};
</script>
