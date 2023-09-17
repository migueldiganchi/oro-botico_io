import tipsData from "~/data/tips-data.js";

const state = () => {
  return {
    tips: []
  };
};

const mutations = {
  LOAD_TIPS(state, tips) {
    state.tips = tips;
  }
};

const actions = {
  getTips({ commit }, data) {
    return new Promise(resolve => {
      commit("LOAD_TIPS", tipsData);
      resolve(tipsData);
    });
  },
  getTip({}, tipId) {
    return new Promise(resolve => {
      const tip = tipsData.find(t => {
        return parseInt(t.id) === parseInt(tipId);
      });

      resolve(tip);
    });
  }
};

const getters = {
  tips(state) {
    return state.tips;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
