<template>
  <page
    name="tips"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <!-- TIPS CREATOR BUTTON -->
    <div class="text-center mb-12">
      <v-btn
        rounded
        class="pl-2 green"
        color="white"
        @click="openTipFormDialog"
      >
        <span>
          <v-icon>mdi-plus</v-icon>
          <span class="ml-2" style="position: relative; top: 1.8px"
            >Nuevo Consejo</span
          >
        </span>
      </v-btn>
    </div>

    <!-- TIPS LIST -->
    <tip-list
      :tips="tips"
      :is-manager="isAuthenticated && isSuperAuthenticated"
      @onStartRemoving="confirmRemoving"
      @onStartEditing="startEditing"
      @onLoadMore="getTips"
    />

    <!-- TIP FORM DIALOG -->
    <tip-form-dialog
      :active="isTipFormDialogOpened"
      :tip="editingTip"
      :loading="isWaiting"
      @onClose="endTipFormDialog"
      @onSave="saveTip"
    />
  </page>
</template>

<script>
export default {
  middleware: ["auth"],

  mounted() {
    this.getTips();
  },

  data: () => ({
    tips: [],

    isTipFormDialogOpened: false,

    removingTip: null,
    editingTip: null,

    waitingMessage: "",
    breadcrumbItems: [
      {
        text: "Inicio",
        icon: "mdi-home-heart",
        to: "/",
      },
      {
        text: "Panel de Control",
        icon: "mdi-gamepad",
        to: "/dashboard",
      },
      {
        text: "Consejos",
        icon: "mdi-lightbulb",
        to: "/dashboard/tips",
        disabled: true,
      },
    ],
  }),

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },

    pageTitle() {
      return "Administrador de Consejos";
    },

    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : "Agrega, modifica o elimina consejos para los visitantes de la página";
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    isSuperAuthenticated() {
      return this.$store.getters.isSuperAuthenticated;
    },
  },

  methods: {
    getTips() {
      return this.$store.dispatch("getTips").then((tips) => {
        this.tips = tips;
      });
    },

    openTipFormDialog() {
      this.isTipFormDialogOpened = true;
    },

    removeTip(tipToRemove) {
      alert("[@todo: Go server to remove the tip]");
    },

    confirmRemoving(tipToRemove) {
      this.removingTip = tipToRemove;

      this.$confirm({
        title: "¿Estas seguro que deseas eliminar este consejo?",
        message: "El registro se eliminará de manera irreversible",
        color: "red",
        onConfirm: () => {
          this.removeTip();
        },
        onClose: () => {
          this.removingTip = null;
          this.$stopConfirm();
        },
      });
    },

    startEditing(tipToEdit) {
      this.isTipFormDialogOpened = true;

      setTimeout(() => {
        this.editingTip = { ...tipToEdit };
      }, 111);
    },

    endTipFormDialog() {
      this.isTipFormDialogOpened = false;
      setTimeout(() => {
        this.editingTip = null;
      }, 111);
    },

    saveTip(tipToSave) {
      console.log("[@todo: Save this tip]", tipToSave);
      alert("@todo");
    },
  },
};
</script>
