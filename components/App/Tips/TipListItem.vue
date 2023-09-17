<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    color="white"
    class="App-tip-list-item text-dark text-center"
  >
    <!-- Tip image -->
    <!-- <v-img v-if="tip.tipKey" height="240" :src="getTipImage(tip.tipKey)" /> -->

    <!-- Tip title -->
    <div class="d-block pa-6">
      <div class="d-block text-center white--text">
        <b>{{ maxText(tip.title, 36) }}</b>
      </div>
    </div>

    <v-card-actions
      class="bg-dark text-center pa-2"
      style="border-top: solid 1px #c9c9c999"
    >
      <v-btn
        @click.stop.prevent="expandTip(tip)"
        :to="`/tips/${tip.id}`"
        :disabled="loading"
        class="text-light text-flat bg-gold"
        rounded
        text
      >
        <v-icon class="mr-2 text-flat">mdi-plus</v-icon>
        <span>Más</span>
      </v-btn>

      <v-spacer />

      <v-btn
        @click="toggleSharing(`https://oro.ciudadbotica.com/tips/${tip.id}`)"
        icon
        :disabled="loading"
        class="text-light"
        text
        large
      >
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>

      <!-- Manager User -->
      <v-btn
        v-if="isManager"
        class="red mb-0 elevation-3 ml-2"
        color="white"
        icon
        elevation="3"
        @click="startRemoving"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn
        v-if="isManager"
        class="blue mb-0 elevation-3 ml-2"
        color="white"
        icon
        elevation="3"
        @click="startEditing"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    tip: {
      type: Object,
      required: true,
    },
    isManager: {
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,

      default: () => false,
    },
  },

  methods: {
    // getTipImage(key) {
    //   return require(`~/assets/media/tips/${key}.png`);
    // },

    expandTip(item) {
      this.$emit("onExpand", item);
    },

    toggleSharing(url) {
      this.$bus.$emit("toggle-sharing", url);
    },

    maxText(text, maxLength) {
      const max = maxLength ? maxLength : 30;
      if (text.length <= max) {
        return text;
      }

      return `${text.substring(0, max)}...`;
    },

    startRemoving() {
      this.$emit("onStartRemoving", this.tip);
    },

    startEditing() {
      this.$emit("onStartEditing", this.tip);
    },
  },
};
</script>
