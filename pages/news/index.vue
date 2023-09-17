<template>
  <div class="page page-news text-dark text-center">
    <div class="title mb-3">
      <logo size="sm" class="ma-0 my-9" />
      <span class="d-block text-lg-h4 text-md-h5 mb-3"
        >Novedades en cripto monedas</span
      >
      <p class="ma-0 pa-0">
        Entérate de las últimas noticias en los mercados bursátiles
      </p>
    </div>

    <!-- Breadcrumb path -->
    <breadcrumbs class="mb-9" :items="breadcrumbItems" />

    <!-- Article list -->
    <article-list
      :articles="articles"
      :loading="waiting"
      :show-more-button="showLoadMoreButton"
      @onLoadMoreArticles="loadMoreArticles()"
    />
  </div>
</template>

<script>
const newsApiKey = 'fa4916f5ff5d49428a83baa4d0a96757'
const pageSize = 12

export default {
  asyncData(context) {
    return context.store
      .dispatch('getArticles', {
        page: 1,
        pageSize: 12,
        apiKey: newsApiKey,
      })
      .then((articlesData) => {
        const { articles, totalResults } = articlesData
        return {
          totalResults: totalResults,
          showLoadMoreButton: articles.length < totalResults,
        }
      })
      .catch((error) => {
        console.error('[error]', error)
      })
  },
  data() {
    return {
      waiting: false,
      currentPage: 1,
      breadcrumbItems: [
        {
          text: 'Inicio',
          icon: 'mdi-home-heart',
          to: '/',
        },
        {
          text: 'Novedades',
          disabled: true,
          icon: 'mdi-newspaper-variant-multiple',
          to: '/news',
        },
      ],
    }
  },
  computed: {
    articles() {
      return this.$store.getters.articles
    },
    pageCount() {
      const counter = Math.ceil(this.totalResults / pageSize)
      return counter
    },
  },
  methods: {
    loadMoreArticles() {
      this.currentPage = this.currentPage + 1
      this.loadArticles()
    },
    loadArticles() {
      this.waiting = true
      return this.$store
        .dispatch('getArticles', {
          page: this.currentPage,
          pageSize: pageSize,
          apiKey: newsApiKey,
        })
        .then((articlesData) => {
          this.waiting = false
          const { articles, totalResults } = articlesData
          this.totalResults = totalResults
          this.showLoadMoreButton = this.currentPage < this.pageCount
        })
        .catch((error) => {
          this.waiting = false
          console.error('[error]', error)
        })
    },
  },
}
</script>
