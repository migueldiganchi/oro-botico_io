<template>
  <div
    class="member text-dark"
    :class="{
      active: !isMemberBoxVisible,
    }"
    @click="toggleMember"
  >
    <!-- Activator -->
    <div
      class="member-activator levitation"
      :class="{
        visible: !isMemberBoxVisible,
      }"
      @click="toggleMember()"
    >
      <div class="is-circular member-image text-center">
        <v-avatar size="63px" class="pa-3">
          <v-img
            :src="require('~/assets/media/trading.png') + '?' + new Date()"
            style="width: 126px; position: relative; top: -4.5px"
            aspect-ration="1"
          ></v-img>
        </v-avatar>
      </div>
    </div>

    <!-- Floating Member Card -->
    <div
      class="member-box"
      :class="{
        visible: isMemberBoxVisible,
      }"
    >
      <v-card class="bg-gold pa-3 pa-sm-6" width="270px">
        <div class="d-block">
          <v-img
            v-if="oroData.pictureUrl"
            :src="oroData.pictureUrl"
            aspect-ratio="1.45"
            width="190px"
            class="mb-6 d-inline-block"
          />
        </div>

        <small
          >Visita ahora nuestro <b>Directorio Digital de Traders</b> en donde se
          está preparando <b>{{ member.name }}</b></small
        >

        <div class="mt-6">
          <v-btn href="/" target="_blank" class="mt-3 bg-gold pl-3" rounded>
            <span style="margin-top: 1.8px">
              <v-icon class="mr-2"> mdi-arrow-right </v-icon>
              Ir
            </span>
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$bus.$on("on-close-glass", this.toggleMember);
  },

  beforeDestroy() {
    this.$bus.$off("on-close-glass");
  },

  props: {
    member: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    isMemberBoxVisible: false,
  }),

  computed: {
    oroData() {
      return {
        name: "Oro Bótico",
        as: "Digitalización y Automatización para Líderes de Trading",
        pictureUrl: require("~/assets/media/trading.png") + "?" + Date.now(),
      };
    },
  },

  methods: {
    toggleMember() {
      this.isMemberBoxVisible = !this.isMemberBoxVisible;
      if (!this.isMemberBoxVisible) {
        this.$bus.$emit("toggle-glass");
      }
    },
  },
};
</script>
