<template>
  <!-- Bot Questions & Answers  -->
  <div class="bot-qa">
    <div v-if="questions" class="qa-list">
      <!-- QA list item -->
      <div
        v-for="question in questions"
        :key="question.key"
        :class="{ active: isOpened(question) }"
        class="qa-list-item bg-light"
        @click="toggle(question)"
      >
        <!-- QUESTION -->
        <div class="qa-list-item-question text-dark d-flex">
          <h4 class="ma-0 pa-0 ml-2">
            {{ question.question }}
          </h4>

          <span v-if="showControls" class="qa-list-item-question_actions mr-3">
            <v-btn
              icon
              color="white"
              elevation="3"
              class="mx-0 mr-1 red"
              outlined
              @click.stop="startRemoving(question)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
            <v-btn
              icon
              color="white"
              elevation="3"
              class="mx-0 blue"
              outlined
              @click.stop="startEditing(question)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </span>
        </div>

        <!-- ANSWER -->
        <div v-if="isOpened(question)">
          <div
            class="qa-list-item-answer text-left pt-4 px-4 pb-4"
            v-html="question.answer"
          />

          <div
            v-if="question.references"
            class="qa-list-item-references mb-4 text-dark"
          >
            <div
              v-for="(reference, referenceIndex) in question.references"
              :key="referenceIndex"
            >
              <nuxt-link :to="reference.to" target="_blank">
                <h6>
                  <b>{{ reference.title }}</b>
                </h6>
                <p>
                  <b>
                    {{ reference.description }}
                  </b>
                </p>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],

  props: {
    questions: {
      type: Array,
      default: () => [],
    },

    showControls: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      openedQuestion: null,
    };
  },
  methods: {
    isOpened(question) {
      return this.openedQuestion && this.openedQuestion.key === question.key;
    },

    toggle(question) {
      this.openedQuestion =
        this.openedQuestion && this.openedQuestion.key === question.key
          ? null
          : question;
    },

    startRemoving(question) {
      this.$emit("onStartRemoving", question);
    },

    startEditing(question) {
      this.$emit("onStartEditing", question);
    },
  },
};
</script>
