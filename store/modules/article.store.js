const state = {
  articles: [],
}

const mutations = {
  LOAD_ARTICLES(state, articles) {
    state.articles = state.articles.concat(articles)
  },
}

const actions = {
  getArticles({ commit }, data) {
    const { page, pageSize, apiKey } = data
    const apiBaseURL = 'https://newsapi.org/v2'
    const country = 'ar'
    const apiEndpoint = 'top-headlines'
    const apiUrl =
      `${apiBaseURL}/${apiEndpoint}` +
      `?country=${country}` +
      `&category=business` +
      `&pageSize=${pageSize}` +
      `&page=${page}` +
      `&apiKey=${apiKey}`

    return this.$axios
      .get(apiUrl)
      .then((response) => {
        const { data } = response
        const { articles, totalResults } = data
        commit('LOAD_ARTICLES', articles)
        return {
          articles: articles,
          totalResults: totalResults,
        }
      })
      .catch((error) => {
        console.info('[error]', error)
      })
  },
}

const getters = {
  articles(state) {
    return state.articles
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
