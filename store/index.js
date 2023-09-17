import Vue from "vue";
import Vuex from "vuex";

import authStore from "./modules/auth.store";
import articleStore from "./modules/article.store";
import tipStore from "./modules/tip.store";
import notificationStore from "./modules/notification.store";
import userStore from "./modules/user.store";
import botStore from "./modules/bot.store";

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    modules: {
      authStore,
      articleStore,
      tipStore,
      notificationStore,
      userStore,
      botStore,
    },
  });
};

export default store;
