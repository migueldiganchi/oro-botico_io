<template>
  <v-row align="center" justify="center">
    <v-col order="1" order-md="2">
      <!-- Bot -->
      <v-img
        max-width="216px"
        :src="getMediaPictureUrl('nano-bot')"
        class="mx-auto my-9 levitation"
      />
    </v-col>
    <v-col order="2" order-md="1">
      <!-- Virtual Assistants -->
      <v-card class="bg-dark pa-9">
        <v-img
          :src="getMediaPictureUrl('ai')"
          max-width="120px"
          class="mx-auto"
        />
        <h2 class="my-6">Asistentes Virtuales</h2>
        <div>
          <v-btn
            fab
            class="bg-gold"
            elevation="3"
            @click="getInfo('virtual-assistants')"
          >
            <v-icon>mdi-unfold-more-horizontal</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
    <v-col order="3">
      <!-- Digital Products -->
      <v-card class="bg-dark pa-9">
        <v-img
          :src="getMediaPictureUrl('web-dev')"
          max-width="120px"
          class="mx-auto"
        />
        <h2 class="my-6">Productos Digitales</h2>
        <div>
          <v-btn
            fab
            class="bg-gold"
            elevation="3"
            @click="getInfo('digital-products')"
          >
            <v-icon>mdi-unfold-more-horizontal</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    getMediaPictureUrl(key) {
      return require(`~/assets/media/${key}.png`);
    },
    getInfo(key) {
      this.$emit("onGetInfo", key);
    },
  },
};
</script>
