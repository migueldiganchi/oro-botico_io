<template>
  <v-row class="pa-0 ma-0 text-flat" align="center" justify="center">
    <v-col cols="12" class="pa-0 mx-0 mb-3">
      <span class="text-center app-menu-item-card-icon">
        <v-icon class="text-h1" :color="item.color">{{ item.icon }}</v-icon>
      </span>
    </v-col>
    <v-col cols="12" class="pa-0 ma-0">
      <b
        class="text-center app-menu-item-card-title d-block mb-3"
        :style="`color: ${item.color} !important`"
        v-text="item.title"
      />
    </v-col>
    <v-col v-if="item.description" cols="12" class="pa-0 ma-0">
      <span
        class="App-xxs-box mx-auto d-block"
        :style="`color: ${item.color} !important`"
        v-text="item.description"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
