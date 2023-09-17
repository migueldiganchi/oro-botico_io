<template>
  <div class="validation-errors text-center mx-6">
    <div v-for="error in errors" :key="error.key">
      <small class="red--text text--lighten-1" v-text="error.text" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: () => false,
    },
  },
};
</script>
