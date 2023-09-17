<template>
  <div
    class="App-breadcrumbs pa-2 d-inline-block animate__animated animate__fadeIn"
  >
    <div v-for="(item, index) in items" :key="index" class="d-inline-block">
      <v-tooltip top color="#d1a837">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="item.disabled"
            :to="item.to"
            v-on="on"
            v-bind="attrs"
            dark
            large
            icon
            class="bg-gold pa-2"
            :class="{ 'elevation-3': index < items.length - 1 }"
          >
            <v-icon class="text-flat">{{ item.icon }}</v-icon>
          </v-btn>
        </template>
        <span v-text="item.text" />
      </v-tooltip>
      <v-icon v-if="index < items.length - 1" class="mr-3 text-dark black--text"
        >mdi-arrow-right</v-icon
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,

      default: () => [],
    },
  },
};
</script>
