<template>
  <social-sharing :url="url" inline-template class="social-sharer">
    <div>
      <network
        network="facebook"
        class="social-link facebook"
        @click="share('facebook')"
      >
        <f-icon
          style="font-size: 19px !important"
          :icon="{ prefix: 'fab', iconName: 'facebook' }"
        />&nbsp;&nbsp;
        <span style="font-size: 15px">Facebook</span>
      </network>
      <network
        network="instagram"
        class="social-link instagram"
        @click="share('instagram')"
      >
        <f-icon
          style="font-size: 21px !important"
          :icon="{ prefix: 'fab', iconName: 'instagram' }"
        />&nbsp;&nbsp;
        <span style="font-size: 15px">Instagram</span>
      </network>
      <network
        network="whatsapp"
        class="social-link whatsapp"
        @click="share('whatsapp')"
      >
        <f-icon
          style="font-size: 19px !important"
          :icon="{ prefix: 'fab', iconName: 'whatsapp' }"
        />&nbsp;&nbsp;
        <span style="font-size: 15px">Whatsapp</span>
      </network>
    </div>
  </social-sharing>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      
      default: "https://www.ciudadbotica.com",
    },
  },
  methods: {
    share(network) {
      this.$emit("onShare", network);
    },
  },
};
</script>
