<template>
  <div class="App-article-list">
    <v-row>
      <v-col
        v-for="article in articles"
        :key="article.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <article-list-item :article="article" :loading="loading" />
      </v-col>
    </v-row>

    <div v-if="showMoreButton" class="mt-6">
      <v-btn @click="loadMore()" rounded class="pl-3 text-dark">
        <v-icon class="mr-2">mdi-plus</v-icon>
        <span>{{ loading ? "Cargando..." : "Cargar más" }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: () => false,
    },

    showMoreButton: {
      type: Boolean,
      default: () => false,
    },
  },

  methods: {
    loadMore() {
      this.$emit("onLoadMoreArticles");
    },
  },
};
</script>
