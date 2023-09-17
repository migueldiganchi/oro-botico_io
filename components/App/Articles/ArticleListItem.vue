<template>
  <v-card
    :loading="loading"
    color="white"
    class="article-list-item text-dark text-center"
  >
    <!-- Article image -->
    <v-img height="240" :src="article.urlToImage" />

    <!-- Article title -->
    <v-card-title class="d-block">
      <div class="d-block text-center">
        {{ maxText(article.title, 33) }}
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn color="indigo darken-4" rounded text large>
        <v-icon class="mr-2">mdi-plus</v-icon>
        <span>Ver más</span>
      </v-btn>

      <v-spacer />

      <v-btn color="indigo darken-4" rounded text large>
        <span>Compartir</span>
        <v-icon class="ml-2">mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      
      default: () => false,
    },
  },
  methods: {
    maxText(text, maxLength) {
      const max = maxLength ? maxLength : 30
      if (text.length <= max) {
        return text
      }

      return `${text.substring(0, max)}...`
    },
  },
}
</script>
