<template>
  <div
    class="page text-dark text-center pb-9 mx-auto px-6"
    :class="`page-${name}`"
  >
    <div class="title mb-6">
      <!-- LOGO -->
      <logo
        v-if="isLogoVisible"
        :url="logoUrl"
        size="xs"
        class="ma-0 mt-6 mb-9"
      />

      <!-- TITLE -->
      <div class="mx-auto xs-box text-h5 mb-6"><b v-text="title" /></div>

      <!-- BREADCRUMBS -->
      <breadcrumbs
        v-if="breadcrumbs && breadcrumbs.length"
        class="mb-9"
        :items="breadcrumbs"
      />

      <!-- DESCRIPTION -->
      <p class="ma-0 mb-9 pa-0 xxs-box mx-auto">
        <span v-html="description" />
      </p>
    </div>

    <!-- DYNAMIC CONTENT -->
    <div align="center">
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
