<template>
  <v-carousel
    class="App-carousel bg-gradient"
    prev-icon="mdi-arrow-left"
    next-icon="mdi-arrow-right"
    show-arrows-on-hover
    cycle
    hide-delimiters
    :show-arrows="false"
    :height="isOpen ? 'auto' : '630px'"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => false,
      required: () => {
        return []
      },
    },
    isOpen: {
      type: Boolean,
      
      default: () => false,
    },
  },
}
</script>

<style>
.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--dark.v-size--default {
  height: 55px;
  width: 55px;
}
</style>
