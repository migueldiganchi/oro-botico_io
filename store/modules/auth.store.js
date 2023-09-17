import JsCookie from "js-cookie";

const Cookie = JsCookie.withConverter({
  read: function (value, name) {
    if (name === "escaped") {
      return unescape(value);
    }
    // Fall back to default for all other cookies
    return Cookies.converter.read(value, name);
  },
});

const state = () => {
  return {
    token: null,
    profile: null,
    userId: null,
    userEmail: null,
    userPictureUrl: null,
    user: null,
  };
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER_ID(state, id) {
    state.userId = id;
  },
  SET_USER_EMAIL(state, email) {
    state.userEmail = email;
  },
  SET_USER_PICTURE_URL(state, pictureUrl) {
    state.userPictureUrl = pictureUrl;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_TOKEN(state) {
    state.token = null;
  },
  CLEAR_USER_ID(state) {
    state.userId = null;
  },
  CLEAR_USER_EMAIL(state) {
    state.userEmail = null;
  },
  CLEAR_USER_PICTURE_URL(state) {
    state.userPictureUrl = null;
  },
  CLEAR_USER(state) {
    state.user = null;
  },
};

const actions = {
  createUser({ commit }, userData) {
    return this.$axios
      .post("signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((jwtResponse) => {
        const { data } = jwtResponse;
        const { user: userData } = data;

        return userData;
      });
  },

  activateUserAccount({}, signupToken) {
    const requestUrl = `signup/${signupToken}/activation`;
    const requestHeaders = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.$axios.post(requestUrl, requestHeaders).then((data) => {
      return data.data;
    });
  },

  authenticateUser({ commit, dispatch }, credentials) {
    return this.$axios
      .post("signin", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        const { token, user, userId, userEmail, userPictureUrl } = data;

        const oneHourMilliseconds = 3600000; // @todo: improve this behavior
        const expiresAt = new Date().getTime() + oneHourMilliseconds;

        // App state
        commit("SET_TOKEN", token);
        commit("SET_USER_ID", userId);
        commit("SET_USER_EMAIL", userEmail);
        commit("SET_USER_PICTURE_URL", userPictureUrl);
        // commit("SET_USER", user);

        // App localstorage layer
        localStorage.setItem("tokenExpiration", expiresAt);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userPictureUrl", userPictureUrl);
        localStorage.setItem("user", user);

        // Cookie layer
        Cookie.set("tokenExpiration", expiresAt);
        Cookie.set("token", token);
        Cookie.set("userId", userId);
        Cookie.set("userEmail", userEmail);
        Cookie.set("userPictureUrl", userPictureUrl);

        // EXPIRATE AFTER ONE HOUR
        dispatch("setLogoutTimer", oneHourMilliseconds);

        return user;
      });
  },

  setLogoutTimer({ dispatch }, millisecondsAfter) {
    setTimeout(() => {
      dispatch("signout");
    }, millisecondsAfter);
  },

  signout({ commit }, token) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit("CLEAR_TOKEN");
        commit("CLEAR_USER_ID");
        commit("CLEAR_USER_EMAIL");
        commit("CLEAR_USER_PICTURE_URL");
        commit("CLEAR_USER");

        if (process.client) {
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userPictureUrl");
          localStorage.removeItem("user");
        }

        Cookie.remove("tokenExpiration");
        Cookie.remove("token");
        Cookie.remove("userId");
        Cookie.remove("userEmail");
        Cookie.remove("userPictureUrl");

        resolve(200);
      }, 999);
    });
  },

  loadAuthentication({ commit, dispatch }, request) {
    let tokenExpirationDate = null;
    let token = null;
    let userId = null;
    let userEmail = null;
    let userPictureUrl = null;
    let tokenRemainingTime = null;

    if (request) {
      // server side
      if (!request.headers.cookie) {
        return;
      }

      const tokenCookie = request.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));
      const tokenExpirationCookie = request.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("tokenExpiration="));
      const userIdCookie = request.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("userId="));
      const userEmailCookie = request.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("userEmail="));
      const userPictureUrlCookie = request.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("userPictureUrl="));

      // check for cookie values
      if (
        !tokenCookie ||
        !userIdCookie ||
        !userEmailCookie
        // userPictureUrl is not required to pass the validation
      ) {
        return false;
      }

      // read cookie values
      tokenExpirationDate = tokenExpirationCookie.split("=")[1];
      token = tokenCookie.split("=")[1];
      userId = userIdCookie.split("=")[1];
      userEmail = userEmailCookie.split("=")[1];
      userPictureUrl =
        userPictureUrlCookie && userPictureUrlCookie.length
          ? userPictureUrlCookie.split("=")[1]
          : null;
    } else {
      // Client side reading
      tokenExpirationDate = localStorage.getItem("tokenExpiration");
      token = localStorage.getItem("token");
      userId = localStorage.getItem("userId");
      userEmail = localStorage.getItem("userEmail");
      userPictureUrl = localStorage.getItem("userPictureUrl");
    }

    if (new Date().getTime() > +tokenExpirationDate || !token) {
      return;
    }

    // set data to the status
    commit("SET_TOKEN", token);
    commit("SET_USER_ID", userId);
    commit("SET_USER_EMAIL", userEmail);
    commit("SET_USER_PICTURE_URL", userPictureUrl);

    // Logout if
    tokenRemainingTime = +tokenExpirationDate - new Date().getTime();
    dispatch("setLogoutTimer", tokenRemainingTime);
  },

  sendPasswordReset({}, requestData) {
    const requestUrl = "reset";
    const requestHeaders = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.$axios
      .post(requestUrl, requestData, requestHeaders)
      .then((data) => {
        return data.data;
      });
  },

  validatePasswordReset({}, resetToken) {
    const requestUrl = `reset/${resetToken}`;
    const requestHeaders = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.$axios.get(requestUrl, requestHeaders).then((data) => {
      const passwordResetData = data.data;
      return passwordResetData;
    });
  },

  savePassword({}, newPasswordData) {
    const { resetToken } = newPasswordData;
    const requestUrl = `reset/${resetToken}/password`;
    const requestHeaders = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.$axios
      .put(requestUrl, newPasswordData, requestHeaders)
      .then((data) => {
        return data.data;
      });
  },

  saveAuthenticatedUser({}, userToSaveData) {
    const { userToSave, token } = userToSaveData;
    const requestUrl = `/me`;
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return this.$axios
      .put(requestUrl, userToSave, requestHeaders)
      .then(({ data }) => {
        const { userId } = data;
        return userId;
      });
  },

  getAuthenticatedUser({ commit }, token) {
    const requestUrl = `/me`;
    const requestHeaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return this.$axios.get(requestUrl, requestHeaders).then((data) => {
      const { user: authUser } = data.data;
      commit("SET_USER", authUser);
      return authUser;
    });
  },
};

const getters = {
  token(state) {
    return state.token;
  },
  authenticatedUser(state) {
    return state.user;
  },
  authenticatedUserId(state) {
    return state.userId;
  },
  userEmail(state) {
    return state.userEmail;
  },
  userPictureUrl(state) {
    return state.userPictureUrl;
  },
  isAuthenticated(state) {
    return state.token !== null;
  },
  isSuperAuthenticated(state) {
    return state.user !== null && state.user.isSuperUser;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
