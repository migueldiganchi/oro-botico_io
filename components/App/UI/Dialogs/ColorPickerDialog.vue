<template>
  <v-dialog v-model="dialog" max-width="300px" @input="dialogChange">
    <v-card color="#d1a837">
      <v-card-title>Selecciona un color</v-card-title>

      <v-card-text>
        <v-color-picker v-model="currentColor" light class="ma-2 white--text" />
      </v-card-text>

      <v-card-actions>
        <v-btn color="white" text @click="dialog = false"> Cancelar </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" @click="selectColor">
          Seleccionar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      
      default: () => false,
    },
    color: {
      type: String,
      
      default: "",
    },
  },
  data() {
    return {
      currentColor: "",
      dialog: false,
    };
  },
  watch: {
    active(isActive) {
      this.dialog = isActive;
      if (!isActive) {
        this.currentColor = "";
        this.dialog = false;
      }
    },
    dialog(value) {
      if (!value) {
        this.$emit("onClose");
      }
    },
    color(c) {
      this.currentColor = c;
    },
  },
  methods: {
    selectColor() {
      this.$emit("onPickColor", this.currentColor);
    },
    dialogChange(e) {
      this.dialog = e;
      if (!e) {
        this.$emit("onClose");
      }
    },
  },
};
</script>
