const state = () => {
  return {
    notifications: [],
  };
};

const mutations = {
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = [...notifications];
  },

  UPDATE_NOTIFICATION(state, notification) {
    const notificationIndex = state.notifications.findIndex((n) => {
      return n._id == notification._id;
    });

    if (notificationIndex > -1) {
      state.notifications[notificationIndex] = notification;
    }
  },

  REMOVE_NOTIFICATION(state, notificationId) {
    if (!state.notifications || state.notifications === undefined) {
      return;
    }
    let index = state.notifications.findIndex((n) => {
      return n.id === notificationId;
    });
    if (index > -1) {
      state.notifications.splice(index, 1);
    }
  },
};

const actions = {
  getNotifications({ commit }, authData) {
    const { page, pageSize, token } = authData;
    const pageNumber = page ? page : 1;
    const pageSizeNumber = pageSize ? pageSize : 6;
    const requestUrl = `/notifications?page=${pageNumber}&pageSize=${pageSizeNumber}`;
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return this.$axios.get(requestUrl, requestHeaders).then((data) => {
      const { notifications, total, totalPages, nextPage } = data.data;
      const notificationList = [];

      for (let notification of notifications) {
        notificationList.push(notification);
      }

      commit("SET_NOTIFICATIONS", notificationList);

      return {
        notifications: notificationList,
        total: total,
        totalPages: totalPages,
        nextPage: nextPage,
      };
    });
  },

  toggleReading({ commit }, authData) {
    const { token, notificationId } = authData;
    const requestUrl = `/notification/${notificationId}`;
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return this.$axios.put(requestUrl, {}, requestHeaders).then(({ data }) => {
      const { notification: updatedNotification } = data;

      commit("UPDATE_NOTIFICATION", updatedNotification);

      return updatedNotification;
    });
  },

  removeNotification({ commit }, authData) {
    const { token, notificationId } = authData;
    const requestUrl = `/notification/${notificationId}`;
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    this.$axios.delete(requestUrl, requestHeaders).then(({ data }) => {
      console.log("[data]");
      commit("REMOVE_NOTIFICATION", notificationId);
      return notificationId;
    });
  },
};

const getters = {
  notifications: (state) => {
    return state.notifications;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
