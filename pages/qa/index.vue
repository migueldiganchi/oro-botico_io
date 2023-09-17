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
          question: "¿Qué es Oro Bótico?",
          answer:
            "Oro Bótico es una plataforma en línea que te permite crear asistentes virtuales personalizados para la enseñanza de trading de forma sencilla y efectiva.",
        },
        {
          key: 2,
          question: "¿Cómo funciona Oro Bótico?",
          answer:
            "Oro Bótico te brinda herramientas para diseñar, entrenar y desplegar asistentes virtuales que pueden responder preguntas frecuentes de tus alumnos sobre trading.",
        },
        {
          key: 3,
          question: "¿Qué puedo lograr con Oro Bótico?",
          answer:
            "Con Oro Bótico, puedes mejorar la experiencia de aprendizaje de tus estudiantes en trading al proporcionar respuestas rápidas y precisas a sus preguntas.",
        },
        {
          key: 4,
          question:
            "¿Necesito experiencia en programación para usar Oro Bótico?",
          answer:
            "No, Oro Bótico está diseñado para ser utilizado por personas sin experiencia en programación. Nuestra plataforma es fácil de usar y no requiere conocimientos técnicos.",
        },
        {
          key: 5,
          question: "¿Es seguro usar Oro Bótico?",
          answer:
            "Sí, nos tomamos muy en serio la seguridad de tus datos. Utilizamos medidas de seguridad avanzadas para proteger la información de nuestros usuarios.",
        },
        {
          key: 6,
          question:
            "¿Puedo personalizar la apariencia de mi asistente virtual?",
          answer:
            "Sí, puedes personalizar la apariencia y el comportamiento de tu asistente virtual para que se adapte a tu marca y estilo.",
        },
        {
          key: 7,
          question: "¿Cuáles son los costos asociados con Oro Bótico?",
          answer:
            "Ofrecemos planes de precios flexibles para adaptarnos a tus necesidades. Puedes consultar nuestros precios en nuestro sitio web.",
        },
        {
          key: 8,
          question: "¿Ofrecen soporte técnico?",
          answer:
            "Sí, tenemos un equipo de soporte técnico disponible para ayudarte en caso de problemas o preguntas. Puedes comunicarte con nosotros a través de correo electrónico o chat en vivo.",
        },
        {
          key: 9,
          question: "¿Puedo probar Oro Bótico antes de comprometerme?",
          answer:
            "Sí, ofrecemos una versión de prueba gratuita para que puedas explorar nuestras funciones antes de tomar una decisión.",
        },
        {
          key: 10,
          question: "¿Cómo puedo comenzar a usar Oro Bótico?",
          answer:
            "Es fácil comenzar con Oro Bótico. Solo regístrate en nuestra plataforma, crea tu asistente virtual y comienza a mejorar la experiencia de aprendizaje de tus estudiantes en trading.",
        },
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
