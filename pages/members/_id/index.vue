<template>
  <page
    name="member"
    :title="member.name"
    description="Bio of the member for describe his/her profession profile"
    :breadcrumbs="breadcrumbItems"
    :mediaUrl="pictureUrl"
  >
    <div class="mx-auto xs-box mb-15">
      <!-- Description -->
      <p class="mb-6">
        {{ member.description }}
      </p>

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

      <v-row class="mt-15">
        <!-- WHATSAPP INFORMATION -->
        <v-col cols="4">
          <div class="mb-6">
            <v-btn
              icon
              fab
              x-large
              elevation="3"
              style="background-color: #25d366"
              href="https://api.whatsapp.com"
              target="_blank"
            >
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- INSTAGRAM ACCOUNT -->
        <v-col cols="4">
          <div class="mb-6">
            <v-btn
              icon
              fab
              x-large
              elevation="3"
              style="background-color: #c13584"
              href="https://instagram.com"
              target="_blank"
            >
              <v-icon color="white">mdi-instagram</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- FACEBOOK ACCOUNT -->
        <v-col cols="4">
          <div class="mb-6">
            <v-btn
              icon
              fab
              x-large
              elevation="3"
              style="background-color: #1877f2"
              href="https://facebook.com/oro.botico"
              target="_blank"
            >
              <v-icon color="white">mdi-facebook</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- LANDING BUTTON -->
    <div v-if="member?.nickname" class="App-actions">
      <v-btn
        :href="'/m/' + member.nickname"
        target="_blank"
        large
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
