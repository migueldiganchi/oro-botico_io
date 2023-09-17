<template>
  <div class="logo d-inline-block" :class="{ xs: size === 'xs' }">
    <nuxt-link v-if="href == ''" to="/">
      <v-img
        :src="url"
        :height="size === 'xs' ? 'auto' : '190px'"
        alt="Oro Bótico"
        referrerpolicy="no-referrer"
        contain
        aspect-ratio="1"
      />
    </nuxt-link>

    <a v-if="href" :href="href">
      <v-img
        :src="url"
        :height="size === 'xs' ? 'auto' : '190px'"
        alt="Oro Bótico"
        referrerpolicy="no-referrer"
        contain
        aspect-ratio="1"
      />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: () => {
        return require("@/assets/media/trading.png") + "?" + new Date();
      },
    },
    href: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
  },
};
</script>
