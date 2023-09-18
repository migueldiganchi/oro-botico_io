<template>
  <div class="App-member-list">
    <v-row justify="center" align="center">
      <v-col
        class="pa-6"
        v-for="(member, memberIndex) in members"
        :key="memberIndex"
        :md="member.flex || 3"
        :lg="member.flex || 4"
      >
        <member-card
          :member="member"
          :is-manager="isManager"
          :is-member-status-opened="isActiveMember(member)"
          @onOpenMemberStatusForm="openMemberStatusForm(member)"
          @onOpenInfo="openInfo"
        />
      </v-col>
    </v-row>

    <!-- LOAD MORE -->
    <div v-if="showMoreButton" class="mt-12 pt-6">
      <v-btn rounded outlined class="px-3 text-dark" large @click="loadMore()">
        <span style="margin-top: 1.8px">
          <v-icon>mdi-arrow-down</v-icon>
          <span>{{ loading ? "Cargando..." : "Cargar más" }}</span>
        </span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: () => false,
    },

    isManager: {
      type: Boolean,
      default: () => false,
    },

    activeMemberId: {
      type: String,
      default: () => "",
    },

    showMoreButton: {
      type: Boolean,
      default: () => false,
    },
  },

  methods: {
    openInfo(member) {
      this.$emit("onMemberClick", member);
    },

    openMemberStatusForm(member) {
      this.$emit("onOpenMemberStatusForm", member);
    },

    isActiveMember(memberId) {
      return this.activeMemberId == memberId;
    },

    getMemberCardColor(member) {
      return this.isActiveMember(member?._id) ? "red" : "white";
    },

    loadMore() {
      this.$emit("onLoadMore");
    },
  },
};
</script>
