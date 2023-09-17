<template>
  <div class="d-inline-block">
    <v-btn
      :disabled="isUploading || disabled"
      :loading="isUploading || disabled"
      :elevation="isUploading ? 0 : 3"
      :color="color"
      outlined
      :rounded="caption != '-'"
      :icon="caption == '-'"
      :large="caption == '-'"
      :class="{
        'pl-2': caption != '-',
      }"
      class="bg-gradient "
      @click="pickFile"
    >
      <v-icon class="">mdi-upload</v-icon>
      <span
        v-if="caption != '-'"
        class="ml-2 "
        v-text="caption"
      />
    </v-btn>
    <input
      :name="name"
      type="file"
      ref="fileInput"
      accept="image/*"
      style="display: none"
      @change="selectFile"
    />
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => false,
    },
    name: {
      type: String,
      default: () => "file",
    },
    caption: {
      type: String,
      default: () => "Subir imagen",
    },
    color: {
      type: String,
      default: () => "black",
    },
    isUploading: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      localFile: null,
      localUrl: "",
    };
  },
  watch: {
    file(fileValue) {
      if (!fileValue) {
        this.clearFile();
        return;
      }

      const { url } = fileValue;
      this.localUrl = url;
    },
  },
  methods: {
    clearFile() {
      this.localFile = null;
      this.localUrl = "";
    },

    pickFile() {
      this.$refs.fileInput.click();
    },

    selectFile(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const fileName = file.name;
      const fileReader = new FileReader();

      if (fileName.lastIndexOf(".") <= 0) {
        this.$bus.$emit("notify", {
          message: "El archivo es incorrecto",
          color: "red",
          timeout: 4500,
        });
        return;
      }

      fileReader.addEventListener("load", () => {
        this.localUrl = fileReader.result;
        this.localFile = file;

        this.$emit("onSelectedFile", {
          file: this.localFile,
          url: this.localUrl,
        });
      });
      fileReader.readAsDataURL(file);
    },
  },
};
</script>
