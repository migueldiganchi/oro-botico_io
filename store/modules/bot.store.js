import Cookies from "js-cookie";

const state = () => {
  return {
    conversation: [],
  };
};

const mutations = {};

const actions = {
  talk({}, interactionData) {
    const ioUrl = "io";

    return this.$axios.post(ioUrl, interactionData).then((ioResponse) => {
      const { data: interactionData } = ioResponse;
      return interactionData;
    });
  },
};

const getters = {
  conversation: (state) => {
    return state.conversation;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
