<template>
  <v-container class="py-0">
    <v-row justify="end">
      <v-col class="pt-3 pb-6 text-left">
        <v-btn v-if="leftCaption" text @click="leftClick" rounded>
          <v-icon>{{ leftIcon }}</v-icon>
          <span v-if="false">{{ leftCaption }}</span>
        </v-btn>
        <v-btn v-else text @click="leftClick" fab small>
          <v-icon class="mt-1">{{ leftIcon }}</v-icon>
        </v-btn>
      </v-col>
      <v-col class="pt-3 pb-6 text-right">
        <v-btn
          class="bg-gold right-icon"
          @click="rightClick"
          :rounded="rightCaption && rightCaption.length > 0"
          :icon="!rightCaption || !rightCaption.length"
        >
          <span v-if="rightCaption && rightCaption.length">{{
            rightCaption
          }}</span>
          <v-icon :class="rightCaption && rightCaption.length ? 'ml-3' : 'mr-1'">{{
            rightIcon
          }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    leftIcon: {
      type: String,
      
      default: "mdi-arrow-left",
    },
    rightIcon: {
      type: String,
      
      default: "mdi-arrow-right",
    },
    leftCaption: {
      type: String,
      
      default: null,
    },
    rightCaption: {
      type: String,
      
      default: () => "",
    },
  },
  methods: {
    leftClick(e) {
      this.$emit("onLeftClick", e);
    },
    rightClick(e) {
      this.$emit("onRightClick", e);
    },
  },
};
</script>

<style></style>
