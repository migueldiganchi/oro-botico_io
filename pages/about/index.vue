<template>
  <page
    name="about"
    :title="pageTitle"
    :description="pageDescription"
    :breadcrumbs="breadcrumbItems"
  >
    <div v-if="true" class="my-12">
      <v-btn
        to="/about/team"
        large
        rounded
        outlined
        elevation="3"
        class="bg-gold pr-2"
      >
        <span class="mr-2">Historias</span>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>

    <div class="box mx-auto">
      <v-row style="font-size: 19.9px">
        <v-col>
          <div class="box">
            <h1 class="mb-9">
              <v-icon class="red--text text-h1">mdi-heart</v-icon>
            </h1>

            <p class="mb-9">
              <b>Oro Bótico</b> nace con la necesidad de
              <b>agilizar la inducción al negocio del Trading</b> y se enfoca en
              quienes estén interesados en convertirse rápidamente en dueños de
              <b>su propio negocio de Trading</b>.
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row style="font-size: 19.9px">
        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-9"><b>Misión</b></h2>
          <p class="mb-9">
            Proveer las <b>herramientas tecnológicas</b> necesarias que permitan
            <b>acelerar sus negocios en el Trading</b> y
            <b>generar ingresos en forma automática</b>.
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-9"><b>Visión</b></h2>
          <p class="text-thin mb-0 pb-0">
            Ayudar a <b>mejorar el rendimiento económico</b> de las personas en
            latino-américa contando con la capacidad de crear productos
            digitales propios basados en <b>Inteligencia Artificial</b> que
            ayuden a nuestros estudiantes a adquirir esta increíble habilidad
            <b>en tiempo record</b>.
          </p>
        </v-col>
      </v-row>
    </div>
  </page>
  <!-- </div>
  </v-container> -->
</template>

<script>
export default {
  data() {
    return {
      profiles: [],

      breadcrumbItems: [
        {
          text: "Inicio",
          icon: "mdi-home-heart",
          to: "/",
        },
        {
          text: "¿Qué es Oro.Bótico?",
          disabled: true,
          icon: "mdi-account-multiple-outline",
          to: "/about",
        },
      ],
    };
  },

  computed: {
    pageTitle() {
      return "¿Qué es Oro Bótico?";
    },

    pageDescription() {
      return "<b>Comunidad Virtual dedicada al aprendizaje y perfeccionamiento de Trading</b>";
    },
  },
};
</script>
