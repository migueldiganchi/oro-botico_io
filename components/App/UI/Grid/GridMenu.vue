<template>
  <v-row align="center" justify="center" class="App-menu">
    <v-col
      v-for="item in items"
      :key="item.key"
      :md="item.layout ? item.layout : 4"
      :lg="item.layout ? item.layout : 4"
      cols="12"
      class="App-menu-item pa-5 justify-center"
    >
      <nuxt-link
        v-if="item.to"
        :to="item.to"
        :style="`border: solid 18px ${item.color}`"
        class="App-menu-item-card radius-45 d-flex clickeable elevation-3"
      >
        <grid-menu-item :item="item" />
      </nuxt-link>

      <a
        v-else
        :style="`border: solid 18px ${item.color}`"
        class="App-menu-item-card radius-45 d-flex clickeable elevation-3"
        @click="open(item)"
      >
        <grid-menu-item :item="item" />
      </a>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      
      default: () => [],
    },
  },
  methods: {
    open(item) {
      this.$emit("onItemClick", item);
    },
  },
};
</script>
