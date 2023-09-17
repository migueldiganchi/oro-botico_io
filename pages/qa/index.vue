<template>
  <page
    name="qa"
    title="Preguntas Frecuentes"
    description="Estas son las preguntas que mayormente nos hacen nuestros usuarios"
    :breadcrumbs="breadcrumbItems"
  >
    <botQA :questions="questions" />
  </page>
</template>

<script>
export default {
  data() {
    return {
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
        // {
        //   key: 18,
        //   question: "¿Qué es el trading institucional?",
        //   answer:
        //     "Se puede hacer a través de cuentas bancarias (Lo cuál no es recomendable porque debes declarar ganancias). O puedes.",
        // },
      ],
      breadcrumbItems: [
        {
          text: "Inicio",
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          text: "Preguntas Frecuentes",
          disabled: true,
          icon: "mdi-head-question",
          to: "/qa",
        },
      ],
    };
  },
};
</script>
