<template>
  <div class="App-file-manager">
    <v-row class="App-list">
      <v-col
        v-for="(file, fileIndex) in files"
        cols="6"
        md="4"
        lg="6"
        :key="fileIndex"
        class="App-list-item"
      >
        <v-card>
          <div v-if="file.url" class="App-file-manager-list-item_img-box">
            <v-img
              :src="getFileUrl(file.url)"
              class="top-radius_27"
              border="solid 1px blue"
              :alt="
                file.title || 'Oro Bótico - Trading inteligente e intuitivo'
              "
            />
          </div>
          <v-card-actions class="pa-3 text-center d-block">
            <v-btn
              icon
              elevation="2"
              class="white"
              color="red"
              dark
              @click="removeFile(file)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getFileUrl(fileUrl) {
      return `${fileUrl}?${new Date()}`;
    },
    removeFile(fileToRemove) {
      this.$emit("onRemoveFile", fileToRemove);
    },
  },
};
</script>
