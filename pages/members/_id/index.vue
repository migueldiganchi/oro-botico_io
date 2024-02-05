<template>
  <page
    name="member"
    :title="member.name"
    :description="member.description"
    :breadcrumbs="breadcrumbItems"
    :mediaUrl="pictureUrl"
    :is-media-circular="true"
  >
    <div class="mx-auto xs-box mb-15">
      <!-- Bio -->
      <p v-if="member.bio" class="mb-6">
        {{ member.bio }}
      </p>

      <!-- @todo: Map Information -->
      <div v-if="false" class="map-container mb-6 pa-3">
        <!-- @todo -->
      </div>

      <!-- Address Information -->
      <p v-if="member.locationAddress" class="mb-6">
        {{ member.locationAddress }}
      </p>

      <!-- @TODO: COUNTRY CITY INFORMATION -->

      <!-- Social Actions -->
      <div class="mt-15">
        <!-- WHATSAPP INFORMATION -->
        <v-btn
          icon
          fab
          elevation="3"
          style="background-color: #25d366"
          href="https://api.whatsapp.com/send?phone=+5491135077622&text=Me%20interesa%20comenzar%20un%20proyecto%20con%20Oro%20B%C3%B3tico."
          target="_blank"
          class="mx-3"
        >
          <v-icon>mdi-whatsapp</v-icon>
        </v-btn>

        <!-- INSTAGRAM ACCOUNT -->
        <v-btn
          icon
          fab
          elevation="3"
          style="background-color: #c13584"
          href="https://instagram.com/neutron.bot"
          target="_blank"
          class="mx-3"
        >
          <v-icon color="white">mdi-instagram</v-icon>
        </v-btn>

        <!-- FACEBOOK ACCOUNT -->
        <v-btn
          icon
          fab
          elevation="3"
          style="background-color: #1877f2"
          href="https://facebook.com/oro.botico.io"
          target="_blank"
          class="mx-3"
        >
          <v-icon color="white">mdi-facebook</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- LANDING BUTTON -->
    <div v-if="member?.nickname" class="App-actions">
      <v-btn
        :href="'/m/' + member.nickname"
        target="_blank"
        class="bg-gold ma-1 pl-3"
        rounded
      >
        <v-icon style="margin-top: 1.8px" class="mr-2">mdi-star</v-icon>
        <span style="margin-top: 1px"> Visitar Landing </span>
      </v-btn>
    </div>
  </page>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const memberId = params.id;
    const member = await store.dispatch("getUser", memberId);

    return {
      member,
    };
  },

  data: () => ({
    waitingMessage: "",
    breadcrumbItems: [
      {
        text: "Inicio",
        icon: "mdi-home-heart",
        to: "/",
      },
      {
        text: "Mi Panel",
        icon: "mdi-account",
        to: "/members/mike-io",
        disabled: true,
      },
    ],
  }),

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },

    pictureUrl() {
      return this.member?.pictureUrl;
    },
  },
};
</script>
