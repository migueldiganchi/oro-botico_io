<template>
  <page
    name="questions"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <!-- QUESTION / ANSWER CREATOR BUTTON -->
    <div class="text-center mb-9">
      <v-btn rounded class="pl-2 green" @click="openQuestionAnswerFormDialog">
        <span>
          <v-icon>mdi-plus</v-icon>
          <span class="ml-2" style="position: relative; top: 1.8px"
            >Nueva Pregunta</span
          >
        </span>
      </v-btn>
    </div>

    <!-- QUESTION LIST -->
    <botQA
      :questions="questions"
      :show-controls="isAuthenticated"
      @onStartRemoving="confirmRemoving"
      @onStartEditing="startEditing"
    />

    <!-- QUESTION/ANSWER DIALOG -->
    <question-form-dialog
      :active="isQuestionFormDialogOpened"
      :question="editingQuestion"
      :loading="isWaiting"
      @onClose="endQuestionFormDialog"
      @onSave="saveQuestion"
    />

    <!-- EMPTY QUESTION LIST -->
    <div v-if="!questions.length" class="py-12 App-xxs-box mx-auto">
      <v-icon style="font-size: 99px" class="text-muted"
        >mdi-head-question</v-icon
      >
      <div class="mt-9 text-muted">
        Todavía no se han encontrado elementos registrados
      </div>
    </div>
  </page>
</template>

<script>
export default {
  middleware: ["auth"],

  data: () => ({
    waitingMessage: "",
    removingQuestion: null,
    editingQuestion: null,
    questions: [
      {
        key: 1,
        question: "¿Cuál es el precio del servicio?",
        answer: "El servicio es completamente gratuito",
      },
      {
        key: 2,
        question: "¿Como empiezo?",
        answer: `Registrate en <a href='https://bit.ly/3zYTJ04'>este link</a> y comienza a asistir a nuestras
            clases gratuitas para ver como se opera en vivo. Una vez que sientas confianza para comenzar
            a invertir, debes cargar en tu cuenta un mínimo de u$d 100`,
      },
      {
        key: 3,
        question: "¿Como puedo ser Partner?",
        answer:
          "Habla con el dueño de este sitio para registrarte como partner e indicarte cuáles son los siguientes pasos",
      },
      {
        key: 5,
        question: "¿Cuándo y cómo son las clases?",
        answer:
          "Nuestras clases son dinámicas. Por lo tanto debes estar en contacto contante con la persona dueña de este sitio.",
      },
      {
        key: 4,
        question: "¿Cómo contacto al dueño de este sitio?",
        answer:
          "Abajo a la derecha encontrarás un botón de Whatsapp que te dirijirá con la persona dueña de este sitio.",
      },
      {
        key: 9,
        question: "¿Cuál es la mejor plataforma para operar?",
        answer:
          "Por su sencillez, nosotros sugerimos que manejes <b>Libertex</b>. Aunque si tienes tu preferida, será bienvenida la experiencia",
      },
      {
        key: 6,
        question: "¿Como se retira el dinero de Libertex?",
        answer:
          "Se puede hacer a través de cuentas bancarias (Lo cuál no es recomendable porque debes declarar ganancias). O puedes operar directamente con criptomonedas (El dueño de este sitio sabrá guiarte en el proceso)",
      },
      {
        key: 18,
        question: "¿En cuanto tiempo se consigue la rentabilidad?",
        answer:
          "Hay muchos factores de los que depende la rentabilidad. Depende mucho del enfoque con el que operes con tu cuenta y de cómo respetes tu PLAN DE TRADING",
      },
    ],
    isQuestionFormDialogOpened: false,
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
        text: "Preguntas Frecuentes",
        icon: "mdi-head-question",
        to: "/dashboard/qa",
        disabled: true,
      },
    ],
  }),

  computed: {
    isWaiting() {
      return this.waitingMessage != "";
    },
    pageTitle() {
      return "Preguntas Frecuentes";
    },
    pageDescription() {
      return this.isWaiting
        ? this.waitingMessage
        : "Administración de Preguntas y Respuestas Frecuentes";
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    openQuestionAnswerFormDialog() {
      this.isQuestionFormDialogOpened = true;
    },

    removeQuestion() {
      if (!this.removingQuestion) {
        this.$notify({
          message: "Necesita una pregunta para eliminar",
        });

        return;
      }

      alert("@Todo: go server to remove this question");
    },

    confirmRemoving(questionToRemove) {
      this.removingQuestion = questionToRemove;

      this.$confirm({
        title: "¿Estas seguro que deseas eliminar esta pregunta?",
        message: "El registro se eliminará de manera irreversible",
        color: "red",
        onConfirm: () => {
          this.removeQuestion();
        },
        onClose: () => {
          this.removingQuestion = null;
          this.$stopConfirm();
        },
      });
    },

    startEditing(questionToEdit) {
      this.isQuestionFormDialogOpened = true;

      setTimeout(() => {
        this.editingQuestion = questionToEdit;
      }, 111);
    },

    endQuestionFormDialog() {
      this.isQuestionFormDialogOpened = false;

      setTimeout(() => {
        this.editingQuestion = null;
      }, 111);
    },

    saveQuestion(questionToSave) {
      console.log("[questionToSave]", questionToSave);
      alert("@todo");
    },
  },
};
</script>
