<template>
  <v-row>
    <v-col
      v-for="(sponsor, sponsorIndex) in sponsors"
      :key="sponsorIndex"
      cols="12"
      xl="3"
      lg="3"
      md="4"
      sm="6"
    >
      <!-- SPONSOR -->
      <div class="sponsor-item">
        <v-img :src="sponsor.logoUrl" :alt="sponsor.name" aspect-ratio="1" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    sponsors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
