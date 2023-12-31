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
          question: "¿Qué servicios ofrece Oro Bótico?",
          answer:
            "Oro Bótico es un directorio virtual que presenta perfiles detallados de Traders Profesionales. Ofrece información sobre su experiencia, estrategias y logros en los mercados financieros.",
        },
        {
          key: 2,
          question: "¿Cómo funciona Oro Bótico?",
          answer:
            "Oro Bótico funciona como un espacio en línea donde puedes explorar perfiles de Traders Profesionales. Proporciona herramientas para encontrar el trader que se adapte a tus necesidades y aprender de sus estrategias.",
        },
        {
          key: 3,
          question: "¿Es necesario registrarse para utilizar Oro Bótico?",
          answer:
            "Sí, se requiere un registro para acceder a todas las funciones de Oro Bótico. El registro es gratuito y te permite explorar perfiles completos de Traders Profesionales.",
        },
        {
          key: 4,
          question:
            "¿Puedo contactar directamente a los Traders en Oro Bótico?",
          answer:
            "Sí, Oro Bótico facilita el contacto directo entre usuarios y Traders Profesionales. Puedes enviar mensajes, hacer preguntas y obtener asesoramiento personalizado.",
        },
        {
          key: 5,
          question:
            "¿Qué información incluye el perfil de un Trader en Oro Bótico?",
          answer:
            "Los perfiles de Traders en Oro Bótico incluyen detalles sobre su experiencia, estrategias de trading, historial de éxitos y una biografía personal. Además, se destacan las especialidades y habilidades únicas que ofrecen.",
        },
        {
          key: 6,
          question: "¿Oro Bótico garantiza el éxito en el trading?",
          answer:
            "Oro Bótico proporciona información valiosa, pero no garantiza el éxito en el trading. Los resultados pueden variar según las estrategias implementadas y las condiciones del mercado.",
        },
        {
          key: 7,
          question: "¿Cómo evalúo la calidad de un Trader en Oro Bótico?",
          answer:
            "Puedes evaluar la calidad de un Trader revisando su historial de éxitos, las opiniones de otros usuarios y su nivel de experiencia. La plataforma proporciona herramientas para tomar decisiones informadas.",
        },
        {
          key: 8,
          question:
            "¿Cuáles son las tarifas asociadas con el uso de Oro Bótico?",
          answer:
            "Ofrecemos un plan gratuito llamado 'Perfil Básico' que permite crear y gestionar tu perfil de Trader Profesional sin costo. También ofrecemos un plan premium llamado 'Perfil Premium + Asistente Virtual' por $15 al mes, que incluye un Asistente Virtual personalizado entrenado e integrado con chat GPT.",
        },
        {
          key: 9,
          question: "¿Ofrecen soporte técnico en Oro Bótico?",
          answer:
            "Sí, contamos con un equipo de soporte técnico disponible para ayudarte con cualquier pregunta o problema que puedas tener al utilizar Oro Bótico. Puedes comunicarte con nosotros a través de correo electrónico o chat en vivo.",
        },
        {
          key: 10,
          question:
            "¿Puedo probar las funciones premium de Oro Bótico antes de suscribirme?",
          answer:
            "Sí, ofrecemos una prueba gratuita del plan 'Perfil Premium + Asistente Virtual' para que puedas explorar todas las características antes de tomar una decisión de suscripción.",
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
