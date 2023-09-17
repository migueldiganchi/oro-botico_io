<template>
  <v-form @submit.prevent="send">
    <v-card
      v-if="member"
      :disabled="isWaiting"
      :elevation="disabled ? '' : '3'"
      class="member-card text-center bg-dark-gradient"
    >
      <div
        class="pa-9"
        :class="{
          'mb-9': !disabled,
        }"
      >
        <!-- MEMBER PICTURE -->
        <div class="picture mb-6 is-circular member-image mx-auto">
          <v-img :src="memberPictureUrl" class="is-circular" />
        </div>
        <!-- MEMBER NAME -->
        <h4
          v-text="member.name"
          class="d-block"
          style="word-break: normal !important"
        />

        <!-- MEMBER NICKNAME -->
        <small class="ma-0 pa-0 mt-3 text-h7" v-text="member.nickname" />

        <!-- MEMBER STATUS SWITCHER -->
        <div class="mb-0 mt-9">
          <v-list rounded :color="statusColor">
            <v-list-item-group
              v-model="form.status"
              @change="setStatus"
              class="bg-dark-gradient pa-3"
            >
              <v-list-item
                color="red"
                v-for="(status, i) in statusList"
                :key="i"
                class="pb-0"
                active-class="text-dark"
              >
                <v-list-item-icon>
                  <v-icon :color="status.color">{{ status.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="text-align: left !important">
                    {{ status.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <div
            v-if="selectedStatus"
            :class="`${selectedStatus.color}--text mt-6`"
          >
            <small>
              <b v-text="selectedStatus.description" />
            </small>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <v-card-actions v-if="!disabled" class="pa-3 bg-gradient">
        <v-btn
          :disabled="isWaiting"
          text
          icon
          class="text-dark"
          @click="close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-spacer />

        <v-btn
          :disabled="isWaiting"
          type="submit"
          rounded
          outlined
          class="pl-2 bg-gold"
          elevation="3"
        >
          <span>
            <v-icon class="mr-0 google-icon">mdi-check</v-icon>
            <span style="position: relative; top: 2px">Guardar</span>
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
const STATUS_LIST = [
  {
    key: 0,
    name: "No Publicado",
    icon: "mdi-wifi-off",
    color: "red",
    description:
      "El usuario no está visible al público. Tanto su perfil, como su landing page no están disponibles para los buscadores.",
  },
  {
    key: 1,
    name: "Publicado",
    icon: "mdi-wifi-star",
    color: "green",
    description:
      "El usuario está visible al público. Tanto su perfil, como su landing page están disponibles para los motores de búsqueda.",
  },
];

export default {
  props: {
    member: {
      type: Object,
      default: () => null,
    },

    isWaiting: {
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
      selectedItem: 1,
      statusList: [...STATUS_LIST],

      waitingMessage: "",

      formCheckIn: false,
      form: {
        status: "",
      },
    };
  },

  computed: {
    defaultPictureUrl() {
      return require("~/assets/media/user.png");
    },

    memberPictureUrl() {
      return this.member?.pictureUrl
        ? this.member.pictureUrl
        : this.defaultPictureUrl;
    },

    selectedStatus() {
      const statusValue = this.form.status;
      const statusIndex = STATUS_LIST.findIndex((s) => s.key == statusValue);
      const status = statusIndex > -1 ? STATUS_LIST[statusIndex] : null;

      return status;
    },

    statusColor() {
      return this.selectedStatus.color ? this.selectedStatus.color : "blue";
    },
  },

  watch: {
    member(v) {
      if (v != null) {
        this.form.status = v.status;
      }
    },
  },

  methods: {
    setStatus(status) {
      this.form.status = status;
      this.$nextTick(() => {});
    },

    // Save User Information
    send() {
      this.$emit("onSave", this.form);
    },

    close() {
      this.$emit("onClose");
    },
  },
};
</script>
