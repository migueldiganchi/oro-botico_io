<template>
  <div class="page">
    <castle :member="member" />
  </div>
</template>

<script>
export default {
  async asyncData({ store, params }) {
    const memberNickname = params.nickname;
    const member = await store.dispatch("getUserByNickname", memberNickname);

    return {
      member,
    };
  },

  data: () => ({
    waitingMessage: "",
  }),

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },
  },
};
</script>
