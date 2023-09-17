const state = () => {
  return {
    users: [],
    host: null,
    userToShow: null,
  };
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },

  SET_HOST(state, user) {
    state.host = user;
  },

  SET_USER_TO_SHOW(state, user) {
    state.userToShow = user;
  },

  // cleaners
  CLEAR_USERS(state) {
    state.users = [];
  },

  CLEAR_HOST(state) {
    state.host = null;
  },

  CLEAR_USER_TO_SHOW(state) {
    state.userToShow = null;
  },
};

const actions = {
  getUser({}, userId) {
    const userUrl = `user/${userId}`;
    return this.$axios
      .get(userUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        const { user } = data;

        return user;
      });
  },

  getUsers({ commit }, data) {
    const { page, pageSize, filters } = data;
    const { term, country, labels, city } = filters;

    const pageNumber = page ? page : 1;
    const pageSizeNumber = pageSize ? pageSize : 6;
    const pageString = `page=${pageNumber}`;
    const pageSizeString = `&pageSize=${pageSizeNumber}`;

    const termString = term ? `&term=${term}` : "";
    const labelsString = labels && labels.length ? labels.join(", ") : "";
    const countryString = country ? `&country=${country}` : "";
    const cityString = city ? `&city=${city}` : "";

    // PREPARE REQUEST URL
    const requestUrl =
      "/users?" +
      pageString +
      pageSizeString +
      termString +
      labelsString +
      countryString +
      cityString;

    // GO SERVER
    return this.$axios.get(requestUrl).then((data) => {
      const { users, total, totalPages, nextPage } = data.data;
      const userList = [];

      for (let user of users) {
        userList.push(user);
      }

      commit("SET_USERS", userList);

      return {
        users: userList,
        total: total,
        totalPages: totalPages,
        nextPage: nextPage,
      };
    });
  },

  getUserByNickname({ commit }, nickname) {
    const userUrl = `user/${nickname}/hero`;
    return this.$axios
      .get(userUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        const { user } = data;

        commit("SET_HOST", user);

        return user;
      });
  },

  saveUser({}, userToSaveData) {
    const { userToSave, token } = userToSaveData;
    const { id: userId } = userToSave;
    const usersUrl = `users/${userId}`;

    return this.$axios.put(usersUrl, userToSave).then(({ data }) => {
      const { userId } = data;
      return userId;
    });
  },

  getMyQualification({}, qualificationData) {
    const { toUserId, token } = qualificationData;
    const requestUrl = `/user/${toUserId}/my-qualification`;
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return this.$axios.get(requestUrl, requestHeaders).then((data) => {
      const { qualification } = data.data;
      return qualification;
    });
  },

  saveUserQualification({}, qualificationData) {
    const { qualification, token } = qualificationData;
    const toUserId =
      qualification && qualification.toUserId ? qualification.toUserId : null;
    const qualificationId =
      qualification && qualification._id ? qualification._id : null;
    const saveMethod = qualificationId ? this.$axios.put : this.$axios.post;
    const requestUrl = qualificationId
      ? `/user/${toUserId}/qualification`
      : `/user/${toUserId}/qualifications`;
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return saveMethod(requestUrl, qualification, requestHeaders).then(
      ({ data }) => {
        const { qualification: savedQualification } = data;
        return savedQualification;
      }
    );
  },

  clearHostMember({ commit }) {
    commit("CLEAR_HOST");
  },
};

const getters = {
  users(state) {
    return state.users;
  },

  host(state) {
    return state.host;
  },

  userToShow(state) {
    return state.userToShow;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
