<template>
  <div class="mx-auto text-center App-xxs-box py-16 mb-16 mt-3 px-3 px-sm-9">
    <v-icon style="font-size: 108px; opacity: 0.63" class="mb-6 text-gold">{{
      icon
    }}</v-icon>
    <h5 style="opacity: 0.63" class="px-3 text-gold">
      {{ text }}
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: () => "mdi-robot",
    },

    text: {
      type: String,
      default: () => "Hasta el momento no se han encontrado resultados",
    },
  },
};
</script>
