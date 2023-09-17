<template>
  <v-card
    class="member-card pt-9 px-6 pb-6 bg-dark text-center"
    :color="getMemberCardColor()"
  >
    <div class="picture mb-6 is-circular member-image mx-auto">
      <v-img :src="memberPictureUrl" class="is-circular" />
    </div>

    <v-card-title>
      <div class="text-center white--text" style="min-width: 100%">
        <h4
          v-text="member.name"
          class="d-block"
          style="word-break: normal !important"
        />
        <small class="ma-0 pa-0 mt-3 text-h7" v-text="member.description" />
      </div>
    </v-card-title>

    <v-card-actions v-if="isShowingActions">
      <!-- General User -->
      <div class="text-center" style="min-width: 100%">
        <v-btn
          class="bg-gold mb-0 elevation-3"
          rounded
          large
          icon
          @click.prevent="openInfo()"
        >
          <v-icon>mdi-fingerprint</v-icon>
        </v-btn>

        <!-- Manager User -->
        <v-btn
          v-if="isManager && member.status == 0"
          class="mb-0 elevation-3 white ml-2"
          rounded
          color="red"
          large
          icon
          @click="openMemberStatusForm()"
        >
          <v-icon>mdi-wifi-off</v-icon>
        </v-btn>

        <v-btn
          v-if="isManager && member.status == 1"
          class="mb-0 elevation-3 white ml-2"
          rounded
          color="green"
          large
          icon
          @click="openMemberStatusForm()"
        >
          <v-icon>mdi-wifi-star</v-icon>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      required: true,
    },
    isManager: {
      type: Boolean,
      default: () => false,
    },
    isShowingActions: {
      type: Boolean,
      default: () => true,
    },
    isMemberStatusOpened: {
      type: Boolean,
      default: () => false,
    },
  },

  computed: {
    defaultPictureUrl() {
      return require("~/assets/media/user.png");
    },

    memberPictureUrl() {
      return this.member?.pictureUrl
        ? this.member.pictureUrl
        : this.defaultPictureUrl;
    },
  },

  watch: {
    member(v) {
      console.log("[v]", v);
    },
  },

  methods: {
    openMemberStatusForm() {
      this.$emit("onOpenMemberStatusForm", this.member);
    },
    openInfo() {
      this.$emit("onOpenInfo", this.member);
    },
    getMemberCardColor() {
      return this.isMemberStatusOpened ? "red" : "white";
    },
  },
};
</script>
