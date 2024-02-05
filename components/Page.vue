<template>
  <div
    class="page text-dark text-center pb-9 mx-auto px-6"
    :class="`page-${name}`"
  >
    <div class="title mb-6">
      <!-- LOGO -->
      <div v-if="isLogoVisible">
        <logo
          v-if="!isMediaCircular"
          :url="logoUrl"
          size="xs"
          class="ma-0 mt-6 mb-9 animate__animated animate__pulse"
        />
        <div v-else class="picture mb-6 is-circular member-image mx-auto">
          <v-img :src="logoUrl" class="is-circular" />
        </div>
      </div>

      <!-- TITLE -->
      <div
        class="mx-auto xs-box text-h5 mb-6 animate__animated animate__fadeIn"
      >
        <b v-text="title" />
      </div>

      <!-- BREADCRUMBS -->
      <breadcrumbs
        v-if="breadcrumbs && breadcrumbs.length"
        class="mb-9 animate__animated animate__fadeIn"
        :items="breadcrumbs"
      />

      <!-- DESCRIPTION -->
      <p
        class="ma-0 mb-9 pa-0 xxs-box mx-auto animate__animated animate__fadeIn"
      >
        <span v-html="description" />
      </p>
    </div>

    <!-- DYNAMIC CONTENT -->
    <div align="center" class="animate__animated animate__fadeIn">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: () => "",
    },
    title: {
      type: String,
      default: () => "",
    },
    description: {
      type: String,
      default: () => "",
    },
    mediaKey: {
      type: String,
      default: () => "",
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    isPadding: {
      type: Boolean,
      default: () => true,
    },
    isLogoVisible: {
      type: Boolean,
      default: () => true,
    },
    mediaUrl: {
      type: String,
      default: () => "",
    },
    isMediaCircular: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    logoUrl() {
      return this.mediaUrl
        ? this.mediaUrl
        : require("@/assets/media/trading.png") + "?" + new Date();
    },
  },
};
</script>
